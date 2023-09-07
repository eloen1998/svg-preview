import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'src/index.ts'
    ],
    format: ['esm'],
    clean: true,
    shims: false,
    dts: false
})
