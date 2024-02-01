/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				blob: 'blob 7s infinite',
			},
			keyframes: {
				blob: {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.1)',
					},
					// '49%': {
					// 	transform: 'translate(50px, -90px) scale(1.9)',
					// },
					'66%': {
						transform: 'translate(-10px, 20px) scale(1.3)',
					},
					'80%': {
						transform: 'translate(10px, 50px) scale(1.1)',
					},
					'100%': {
						transform: 'tranlate(0px, 0px) scale(1)',
					},
				},
			},
		},
	},
	plugins: [],
};
