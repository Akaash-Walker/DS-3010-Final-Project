import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
    title: 'Fake News Detector',
    description: 'A fake news detector built with Next.js and React.',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
        >
        <body>{children}</body>
        </html>
    );
}
