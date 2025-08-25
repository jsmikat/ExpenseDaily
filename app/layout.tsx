import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Expense tracker",
  description: "A simple expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider
          appearance={{
            baseTheme: neobrutalism,
            variables: {
              colorPrimary: "#FDA10D",
            },
          }}
        >
          {children}
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ""} />
        </ClerkProvider>
      </body>
    </html>
  );
}
