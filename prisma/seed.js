const path = require('path');
const fs = require('fs');
// Agrega 'Plan' a la importación
const { PrismaClient, Plan } = require('@prisma/client');

// 1. Buscamos el archivo de entorno inteligentemente (ya sea .env o .env.local)
const envPath = fs.existsSync(path.resolve(__dirname, '../.env.local')) 
  ? path.resolve(__dirname, '../.env.local') 
  : path.resolve(__dirname, '../.env');

require('dotenv').config({ path: envPath });

// Verificación de seguridad
if (!process.env.DATABASE_URL) {
  console.error("❌ ERROR FATAL: No se encontró la variable DATABASE_URL.");
  console.error(`Buscando en: ${envPath}`);
  process.exit(1);
}
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Iniciando la inyección de datos para CivilRo... 🚀`);
  console.log(`Conectando a la base de datos de manera segura...`);

  // --- 0. CREAR USUARIO ADMINISTRADOR (SEMILLA) ---
  const adminUser = await prisma.user.upsert({
    where: { email: 'cristhianromero19@outlook.com' },
    update: {
      rol: 'ADMIN',
      plan: Plan.FREE, // Te damos acceso total
      uid: "aAB480B0PBU6mhUZVs3FpK48ZKv1"
    },
    create: {
      uid: "aAB480B0PBU6mhUZVs3FpK48ZKv1",
      email: 'cristhianromero19@outlook.com',
      nombre: 'Cristhian',
      imagenUrl: 'https://androga001.b-cdn.net/cropped-DSC010642.jpg',
      plan: Plan.FREE,
      rol: 'ADMIN',
    },
  });
  console.log(`✅ Usuario Admin configurado: ${adminUser.nombre}`);

  // 1. CREAR CATEGORÍAS
  const catEstructuras = await prisma.categoria.upsert({
    where: { nombre: 'Estructuras' },
    update: {},
    create: { nombre: 'Estructuras' },
  });

  const catGestion = await prisma.categoria.upsert({
    where: { nombre: 'Gestión de Obras' },
    update: {},
    create: { nombre: 'Gestión de Obras' },
  });

  const catSoftware = await prisma.categoria.upsert({
    where: { nombre: 'Software de Ingeniería' },
    update: {},
    create: { nombre: 'Software de Ingeniería' },
  });

  console.log(`✅ Categorías creadas.`);

  // 2. CREAR CURSOS CON SUS LECCIONES (Mínimo 3 cursos, 3 lecciones cada uno)

  // Curso 1: Nivel COMUNIDAD (Acceso básico)
  const cursoAutoCAD = await prisma.curso.upsert({
    where: { slug: 'autocad-civil-desde-cero' },
    update: {},
    create: {
      titulo: 'AutoCAD para Ingeniería Civil desde Cero',
      slug: 'autocad-civil-desde-cero',
      descripcion: 'Aprende a dominar la herramienta fundamental para cualquier ingeniero. Desde líneas básicas hasta ploteo de planos estructurales y arquitectónicos.',
      accesoMinimo: Plan.COMUNIDAD,
      nivel: 'Básico',
      publicado: true,
      categoriaId: catSoftware.id,
      imagenUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
      lecciones: {
        create: [
          { orden: 1, titulo: 'Interfaz y configuración inicial (Gratis)', duracion: '15:20', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { orden: 2, titulo: 'Comandos de dibujo y edición rápidos', duracion: '22:10', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { orden: 3, titulo: 'Capas, cotas y ploteo a escala', duracion: '28:45', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      }
    },
  });

  // Curso 2: Nivel UNIVERSIDAD (Suscripción intermedia)
  const cursoMetrados = await prisma.curso.upsert({
    where: { slug: 'metrados-edificaciones-reales' },
    update: {},
    create: {
      titulo: 'Metrados de Edificaciones con Planos Reales',
      slug: 'metrados-edificaciones-reales',
      descripcion: 'Deja la teoría. Aprende a cuantificar concreto, acero y encofrado usando la normativa vigente y expedientes técnicos de obras reales.',
      accesoMinimo: Plan.UNIVERSIDAD,
      nivel: 'Intermedio',
      publicado: true,
      categoriaId: catGestion.id,
      imagenUrl: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
      lecciones: {
        create: [
          { orden: 1, titulo: 'Lectura rápida de planos arquitectónicos (Gratis)', duracion: '18:05', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { orden: 2, titulo: 'Metrado de Movimiento de Tierras y Zapatas', duracion: '35:40', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { orden: 3, titulo: 'Cálculo de acero en vigas y columnas', duracion: '42:15', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      }
    },
  });

  // Curso 3: Nivel PRO (Suscripción Avanzada)
  const cursoEtabs = await prisma.curso.upsert({
    where: { slug: 'diseno-sismico-etabs' },
    update: {},
    create: {
      titulo: 'Diseño Sísmico de Edificios con ETABS',
      slug: 'diseno-sismico-etabs',
      descripcion: 'El curso definitivo para calculistas. Modela, analiza y diseña edificios de concreto armado aplicando la norma sismorresistente paso a paso.',
      accesoMinimo: Plan.PRO,
      nivel: 'Avanzado',
      publicado: true,
      categoriaId: catEstructuras.id,
      imagenUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop',
      lecciones: {
        create: [
          { orden: 1, titulo: 'Definición de materiales y grillas (Gratis)', duracion: '20:10', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { orden: 2, titulo: 'Modelado de elementos estructurales (Vigas/Columnas)', duracion: '45:30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
          { orden: 3, titulo: 'Análisis dinámico espectral y control de derivas', duracion: '55:00', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        ]
      }
    },
  });

  console.log(`✅ Cursos y Lecciones creadas.`);

  // 3. CREAR POSTS PARA EL BLOG
  await prisma.post.upsert({
    where: { slug: '5-errores-comunes-etabs' },
    update: {},
    create: {
      titulo: 'Los 5 errores más comunes al modelar en ETABS',
      slug: '5-errores-comunes-etabs',
      resumen: 'Muchos ingenieros jóvenes cometen estos errores fatales al asignar cargas y definir diafragmas rígidos. Descubre cómo evitarlos.',
      contenido: 'Aquí iría el contenido en Markdown sobre los errores en ETABS...',
      publicado: true,
      imagenUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    },
  });

  await prisma.post.upsert({
    where: { slug: 'como-leer-planos-estructurales' },
    update: {},
    create: {
      titulo: 'Cómo leer planos estructurales sin confundirse en obra',
      slug: 'como-leer-planos-estructurales',
      resumen: 'Guía rápida para interpretar detalles de aceros, empalmes y especificaciones técnicas cuando tienes al maestro de obra al lado.',
      contenido: 'Aquí iría el contenido en Markdown sobre lectura de planos...',
      publicado: true,
      imagenUrl: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop',
    },
  });

  await prisma.post.upsert({
    where: { slug: 'importancia-metrados-presupuestos' },
    update: {},
    create: {
      titulo: 'Por qué un mal metrado arruina tu presupuesto (y tu utilidad)',
      slug: 'importancia-metrados-presupuestos',
      resumen: 'Si calculas mal el acero o el concreto, tu obra perderá dinero antes de empezar. Aprende las tolerancias permitidas.',
      contenido: 'Aquí iría el contenido en Markdown sobre presupuestos...',
      publicado: true,
      imagenUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop',
    },
  });

  console.log(`✅ Posts del blog creados.`);
  console.log(`🎉 ¡Base de datos de CivilRo inyectada con éxito!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });