import "./globals.css";

export const metadata = {
  title: "harry potter",
  description: "harry potter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased bg-hogwarts-stone text-hogwarts-parchment">
        {children}
      </body>
    </html>
  );
}