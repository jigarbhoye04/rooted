import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
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
    title: 'Rooted — Daily Etymology',
    description:
        'Discover the fascinating origins of one word every day. Interactive visualizations bring language history to life.',
    keywords: ['etymology', 'words', 'language', 'daily', 'vocabulary', 'word origins'],
    authors: [{ name: 'Rooted' }],
    openGraph: {
        title: 'Rooted — Daily Etymology',
        description:
            'Discover the fascinating origins of one word every day. Interactive visualizations bring language history to life.',
        url: 'https://rooted.app',
        siteName: 'Rooted',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Rooted — Daily Etymology',
        description:
            'Discover the fascinating origins of one word every day.',
    },
    metadataBase: new URL('https://rooted.app'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    return (
        <html lang="en" className={satoshi.variable}>
            <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col">
                <header className="w-full px-6 py-4 flex items-center justify-between border-b border-neutral-200/60 transition-all duration-300">
                    <div className="flex items-center shrink-0 w-[200px]">
                        <Link href="/" className="text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
                            rooted<span className="text-accent-warm">.</span>
                        </Link>
                    </div>

                    {/* Portal Target for Page-Specific Header Content */}
                    <div id="header-center-portal" className="flex-1 flex justify-center items-center pointer-events-none" />

                    <nav aria-label="Main navigation" className="shrink-0 w-[200px] flex justify-end">
                        <span className="text-xs font-medium uppercase tracking-widest text-muted">
                            Daily Etymology
                        </span>
                    </nav>
                </header>

                <main className="flex-1">{children}</main>

                <footer className="w-full px-6 py-6 border-t border-neutral-200/60 text-center">
                    <p className="text-xs text-muted">
                        © {new Date().getFullYear()} Rooted · One word, every day.
                    </p>
                </footer>
            </body>
        </html>
    );
}
