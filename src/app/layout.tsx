import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Aside from "@/views/layouts/aside";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModelProvider";
import ToasterProvider from "@/providers/ToastProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";

const figtree = Figtree({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export const revalidate = 0

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userSongs = await getSongsByUserId()
  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Aside songs={userSongs}>
              {children}
            </Aside >
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
