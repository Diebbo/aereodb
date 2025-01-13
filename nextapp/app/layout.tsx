import { Providers } from "./providers";
import Image from "next/image"
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <Providers>
          <header className="py-10">
            <h1 className="text-center text-5xl font-bold">
              AereoDB
            </h1>
          </header>
          <main>
            <Image
              className="rounded-lg mx-auto"
              src="/wtc.jpg"
              alt="Immagine di aereo ed edifici"
              width={525}
              height={295} />
            
            {children}

          </main>
        </Providers>
      </body>
    </html>
  );
}
