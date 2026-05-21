import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: false,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.test.ts",
        "src/**/*.types.ts",
        "src/**/index.ts",
        "src/main.ts",
        "src/main.helpers.ts",
        "src/models/waas-types.ts",
      ],
    },
  },
})
