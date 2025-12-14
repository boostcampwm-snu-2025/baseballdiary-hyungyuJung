/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-primary': 'var(--bg-primary)',
                'bg-secondary': 'var(--bg-secondary)',
                'bg-tertiary': 'var(--bg-tertiary)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-accent': 'var(--text-accent)',
                'brand-primary': 'var(--brand-primary)',
                'accent-win': 'var(--accent-win)',
                'accent-loss': 'var(--accent-loss)',
                'accent-draw': 'var(--accent-draw)',
                'accent-cancel': 'var(--accent-cancel)',
            }
        },
    },
    plugins: [],
}
