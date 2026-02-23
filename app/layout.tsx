import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Saira } from "next/font/google";

import { navigationItems } from "@/data/navbarItems";

import ContactPopover from "@/components/contactPopover";
import Footer from "@/components/footer";
import NavbarDesktop from "@/components/navbar";

import "./globals.css";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

// const specialGothicExtendedBold = localFont({
//   src: "../public/fonts/SpecialGothicExtendedBold.woff2",
//   display: "swap",
//   variable: "--font-special",
// });

export const metadata: Metadata = {
  title: "Medihelix s.r.o. | Laboratorní přístroje, technologie a servis",

  description:
    "Medihelix s.r.o. dodává laboratorní přístroje a technologie s důrazem na partnerský přístup, odborné poradenství a dlouhodobou technickou podporu. Komplexní řešení pro laboratoře v České republice.",

  keywords: [
    "laboratorní přístroje",
    "laboratorní technika",
    "laboratorní vybavení",
    "distribuce laboratorní techniky",
    "laboratorní diagnostika",
    "servis laboratorních přístrojů",
    "technická podpora laboratoří",
    "dodávky laboratorní techniky",
    "Medihelix",
    "laboratorní technologie ČR",
  ],

  authors: [{ name: "Medihelix s.r.o." }],
  creator: "Medihelix s.r.o.",
  publisher: "Medihelix s.r.o.",

  openGraph: {
    title: "Medihelix s.r.o. | Komplexní řešení laboratorní techniky",
    description:
      "Dodáváme laboratorní přístroje a technologie s odbornou podporou a partnerským přístupem. Spolehlivé řešení pro moderní laboratoře.",
    url: "https://www.medihelix.cz",
    siteName: "Medihelix s.r.o.",
    locale: "cs_CZ",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body className={`${saira.variable}  antialiased overflow-x-hidden`}>
        <NavbarDesktop items={navigationItems} />
        {children}
        <Footer />
        <ContactPopover />
      </body>
    </html>
  );
}
