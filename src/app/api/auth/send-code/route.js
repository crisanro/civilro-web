import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req) {
  try {
    const { email, captchaToken } = await req.json();

    // 1. VALIDAR CAPTCHA CON CLOUDFLARE
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.CLOUDFLARE_SECRET_KEY}&response=${captchaToken}`,
    });

    const verifyData = await verifyRes.json();
    // console.log("Resultado de Cloudflare:", verifyData);
    if (!verifyData.success) {
      return NextResponse.json({ error: "Fallo en la validación de seguridad (Captcha)." }, { status: 403 });
    }

    // 2. BUSCAR SI EL USUARIO EXISTE (Tu lógica de Invitados)
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Correo no registrado." }, { status: 403 });
    }


    if (!user) {
      // Importante: No damos pistas de por qué falló por seguridad, 
      // o puedes enviar un mensaje genérico.
      return NextResponse.json(
        { error: "Acceso restringido. Este correo no está registrado en la academia." }, 
        { status: 403 }
      );
    }

    // 2. LÍMITE DE TIEMPO (1 minuto entre envíos)
    const lastToken = await prisma.verificationToken.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' }
    });

    if (lastToken && (Date.now() - new Date(lastToken.createdAt).getTime() < 60000)) {
      return NextResponse.json(
        { error: "Ya enviamos un código. Espera un minuto para solicitar otro." }, 
        { status: 429 }
      );
    }

    // 3. GENERAR CÓDIGO
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { email, token: code, expires }
    });

    // 4. ENVÍO VÍA ORACLE SMTP
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `${code} es tu código de acceso - CivilRo`,
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: auto; padding: 20px;">
          <h2>CivilRo Academia</h2>
          <p>Hola, usa el siguiente código para ingresar:</p>
          <div style="background: #f1f5f9; padding: 20px; text-align: center; border-radius: 10px;">
            <span style="font-size: 32px; font-weight: 900; color: #ea580c;">${code}</span>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error SMTP:", error);
    return NextResponse.json({ error: "Error al enviar el código" }, { status: 500 });
  }
}