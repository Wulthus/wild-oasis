import React from "react";
import Header from "@/app/_components/Header";

import {Josefin_Sans} from "next/font/google";

const customFont = Josefin_Sans({
  subsets: ['latin'],
  display: "swap",

});

import "@/app/_styles/globals.css";

export const metadata = {
  title: {
    template: "%s The Wild Oasis",
    default: "The Wild Oasis",
  },
  description: "A luxurious Cabin hotel, located in fictionalcountry, fictionalplace, surrounded by beautifull mountaind and colorfull forests.",

}

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body className={`${customFont.className} bg-primary-950 text-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
