import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./auth/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="mx-4 md:mx-48 xl:mx-96 bg-gray-200">
        <Nav />
        {children}
      </body>
    </html>
  );
}
