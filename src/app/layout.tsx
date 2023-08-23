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
        <nav className="flex justify-between bg-secondary_background text-white py-2">
          <div className="px-2">
            <ul className="flex gap-4">
              <li>Movies</li>
              <li>Stream</li>
              <li>Events</li>
              <li>Plays</li>
              <li>Sports</li>
              <li>Activities</li>
              <li>Buzz</li>
            </ul>
          </div>
          <div className="pr-2">
            <ul className="flex gap-4">
              <li>Corporates</li>
              <li>Offers</li>
              <li>Gift cards</li>
            </ul>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
