import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Aside from "@/views/layouts/aside";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModelProvider";
import ToasterProvider from "@/providers/ToastProvider";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Aside>
              {children}
            </Aside >
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
