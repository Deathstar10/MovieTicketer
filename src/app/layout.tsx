import "../styles/global.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BookMyTicket",
  description: "Book your tickets from anywhere instantly",
  author: "Aravind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          minHeight: "100vh",
        }}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
