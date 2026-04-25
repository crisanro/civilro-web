import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Importamos el nuevo Footer

export const metadata = {
  title: "CivilRo | De la Universidad a la Obra",
  description: "Academia técnica especializada para ingenieros civiles y asistentes de obra. Aprende diseño estructural, metrados y lectura de planos con proyectos 100% reales.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* Añadimos scroll-smooth por si acaso, aunque ya está en el globals.css */}
      <body className="antialiased flex flex-col min-h-screen">
        
        {/* El Navbar fijo en la parte superior */}
        <Navbar />
        
        {/* El contenido de cada página crecerá para empujar el footer hacia abajo */}
        <div className="flex-grow">
          {children}
        </div>

        {/* El nuevo Footer profesional */}
        <Footer />
        
      </body>
    </html>
  );
}