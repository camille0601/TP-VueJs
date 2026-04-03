import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'lcov'],
        all: true,
        include: ['src/**/*.{js,ts,vue}'],
        exclude: ['src/**/__tests__/**', 'src/main.js'],
        statements: 80,
        branches: 70,
        functions: 80,
        lines: 80,
      },
    },
  }),
);
