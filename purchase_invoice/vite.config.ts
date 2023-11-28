import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import proxyOptions from './proxyOptions';
import fs from 'fs'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 8080,
		proxy: proxyOptions,

		https: {
			key: fs.readFileSync('./cert/CA/localhost/localhost.decrypted.key'),
			cert: fs.readFileSync('./cert/CA/localhost/localhost.crt'),
		  },
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	build: {
		outDir: '../purchase_invoice_ui/public/purchase_invoice',
		emptyOutDir: true,
		target: 'es2015',
	},
});
