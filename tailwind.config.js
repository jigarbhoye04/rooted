/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-satoshi)', 'Georgia', 'serif'],
                sans: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                muted: 'var(--muted)',
                surface: 'var(--surface)',
                'surface-elevated': 'var(--surface-elevated)',
                border: 'var(--border)',
                'border-subtle': 'var(--border-subtle)',
                'accent-warm': 'var(--accent-warm)',
                'accent-warm-light': 'var(--accent-warm-light)',
                'accent-gold': 'var(--accent-gold)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-tertiary': 'var(--text-tertiary)',
                error: 'var(--error)',
                'error-light': 'var(--error-light)',
            },
            animation: {
                'skeleton': 'skeleton-pulse 1.8s ease-in-out infinite',
                'fade-in': 'fade-in 0.6s var(--ease-smooth) forwards',
                'slide-up': 'slide-up 0.8s var(--ease-smooth) forwards',
                'slide-up-subtle': 'slide-up-subtle 0.5s var(--ease-smooth) forwards',
            },
            keyframes: {
                'skeleton-pulse': {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.15' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'slide-up': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-up-subtle': {
                    from: { opacity: '0', transform: 'translateY(8px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
        },
    },
    plugins: [],
};
