import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        include: ['**/*.test.{ts,tsx}'],
        server: {
            deps: {
                inline: ['d3', 'd3-geo', 'd3-array', 'd3-shape', 'd3-path', 'd3-selection', 'topojson-client'],
            },
        },
        testTimeout: 15000,
    },
});
