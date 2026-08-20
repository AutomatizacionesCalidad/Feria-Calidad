import type {
  Metadata,
} from "next";
import "./globals.css";
import {
  FairSessionProvider,
} from "@/context/FairSessionContext";
import BadgeModalHost from "@/components/BadgeModalHost";

export const metadata: Metadata =
  {
    title:
      "Feria Integral Prebel",

    description:
      "Feria Integral de Calidad Prebel",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html lang="es">

      <body>

        <FairSessionProvider>

          {children}

          <BadgeModalHost />

        </FairSessionProvider>

      </body>

    </html>
  );
}