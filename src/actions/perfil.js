"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function actualizarPerfil(formData) {
  try {
    const email = formData.get("email");
    const nombre = formData.get("nombre");
    const archivoFoto = formData.get("foto");

    // 1. Obtener usuario actual
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success: false, error: "Usuario no encontrado." };

    let nuevaUrlFinal = undefined;
    let actualizoFoto = false;

    if (archivoFoto && archivoFoto.size > 0) {
      
      // 2. Límite de 24 horas
      if (user.ultimaFotoUpdate) {
        const ahora = new Date();
        const limite24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);
        if (user.ultimaFotoUpdate > limite24h) {
          return { success: false, error: "Solo puedes cambiar tu foto una vez cada 24 horas." };
        }
      }

      // 3. Preparar nueva foto
      const buffer = Buffer.from(await archivoFoto.arrayBuffer());
      const fileName = `avatars/${email.split('@')[0]}-${Date.now()}.webp`;

      // 4. Subir nueva foto a R2
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: "image/webp",
      }));

      nuevaUrlFinal = `${process.env.R2_PUBLIC_URL}/${fileName}`;
      actualizoFoto = true;

      // 5. LIMPIEZA: Borrar foto anterior (USANDO imagenUrl)
      // Usamos 'user.imagenUrl' porque así se llama en tu DB
      if (user.imagenUrl && user.imagenUrl.includes(process.env.R2_PUBLIC_URL)) {
        try {
          // Extraemos la Key (ej: avatars/archivo.webp) eliminando la URL base
          const oldKey = user.imagenUrl.replace(`${process.env.R2_PUBLIC_URL}/`, '');
          
          await s3Client.send(new DeleteObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: oldKey,
          }));
          console.log("✅ Foto antigua eliminada de R2:", oldKey);
        } catch (e) {
          console.error("⚠️ Error al borrar foto vieja de R2:", e);
        }
      }
    }

    // 6. Actualizar Base de Datos
    await prisma.user.update({
      where: { email },
      data: {
        ...(nombre && { nombre }),
        ...(actualizoFoto && { 
          imagenUrl: nuevaUrlFinal, // Nombre correcto según tu Prisma
          ultimaFotoUpdate: new Date() 
        }) 
      }
    });

    revalidatePath("/dashboard");
    return { success: true };
    
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    return { success: false, error: "Error en el servidor al procesar los datos." };
  }
}

export async function guardarTokenFCM(email, token) {
  try {
    await prisma.user.update({
      where: { email },
      data: { fcmToken: token }
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}