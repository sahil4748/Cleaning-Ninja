import { defineConfig } from '@playwright/test'
process.env.H03_DEVELOPMENT = '1'
export default defineConfig({ testDir: './tests', testMatch: 'h03-masked.spec.ts', timeout: 60000, workers: 1, reporter: 'list', use: { baseURL: 'http://127.0.0.1:8136', browserName: 'chromium' } })
