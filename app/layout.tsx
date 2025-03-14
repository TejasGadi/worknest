
import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider, useUser } from "@clerk/nextjs";



export const metadata: Metadata = {
  title: "Worknest",
  description: "WorkNest is your all-in-one workspace for creating beautiful, functional docs with our powerful editor. Add images, code blocks, and more.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="text-[90%]">
       {children}
      </body>
    </html>
    </ClerkProvider>
  );
}