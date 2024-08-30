/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				main: '#ffffff',
				sub: '#f2f5f7',
				primary: 'rgb(255 40 60 / var(--tw-bg-opacity))',
				neutral: 'rgb(8 13 13 / var(--tw-bg-opacity))',
				head: 'rgba(8, 13, 13, 1)',
				title: 'rgba(8, 13, 13, 0.9)',
				para: 'rgba(8, 13, 13, 0.8)',
				clear: 'transparent',
			},
			fontFamily: {
				sans: ['Open Sans', 'Roboto', 'sans-serif'],
			},
			fontWeight: {
				medium: '550',
			},
		},
	},
	plugins: [],
};
