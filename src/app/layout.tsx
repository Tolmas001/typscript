import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Выбери подходящий тариф",
  description: "Выберите оптимальный тарифный план",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.className} min-h-full antialiased bg-[#232829]`}>
        {children}
      </body>
    </html>
  );
}