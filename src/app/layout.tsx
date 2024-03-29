import { ChakraProvider } from "@chakra-ui/react";
import "./globals.css";
import { AuthLayout } from "@/auth/layout";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthLayout>
          <ChakraProvider>{children}</ChakraProvider>
        </AuthLayout>
      </body>
    </html>
  );
}
