import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const satoshi = localFont({
    src: [
        {
            path: '../public/fonts/satoshi-variable.woff2',
            weight: '300 900',
            style: 'normal',
        },
        {
            path: '../public/fonts/satoshi-variable-italic.woff2',
            weight: '300 900',
            style: 'italic',
        },
    ],
    variable: '--font-satoshi',
    display: 'swap',
});


export const metadata: Metadata = {
    title: 'Rooted - Daily Etymology',
    description: 'Discover the fascinating origins of one word every day. Interactive visualizations bring language history to life.',
    keywords: ['etymology', 'words', 'language', 'daily', 'vocabulary'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${satoshi.variable}`}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
