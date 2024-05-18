import { defineConfig } from 'vite'
import reactSwc from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
import million from 'million/compiler'
// import glslify from 'vite-plugin-glslify'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// react(),
        // million.vite({ auto: true }), 
		reactSwc({
            plugins: [
                // ["@swc-jotai/react-refresh", {}],
                // ["@swc-jotai/debug-label", {}],
            ]
        }),
        // glslify(),
		commonjs(),
	],
	// base: './',
	base: './',
	server: {
		host: '0.0.0.0',
		port: 5177,
		fs: {
			// strict: false,
		},
		// hmr: false,
	}
})


