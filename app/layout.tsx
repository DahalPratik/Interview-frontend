import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "USA Visa Interview Practice",
  description: "AI-powered platform to practice for USA visa interviews",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
