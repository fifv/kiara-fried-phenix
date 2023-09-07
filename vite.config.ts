import { defineConfig } from 'vite'
import reactSwc from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// react(),
		reactSwc(),
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


