import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.js", // File to be executed before each test file for configuration
    css: true,
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{js,jsx}"],
      exclude: [
        "src/main.jsx",
        "src/test/**",
        "src/**/*.test.{js,jsx}",
        "src/**/__tests__/**",
        "src/languages/fr/**",
        "src/languages/en/**",
      ],
    }
  }
})
