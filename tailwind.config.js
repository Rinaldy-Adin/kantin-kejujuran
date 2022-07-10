/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                default: ['Poppins', 'sans-serif'],
                alt: ['Montserrat', 'sans-serif'],
            },
            colors: {
                KJJBlue: {
                    DEFAULT: '#6DAEDB',
                    hover: '#67A4CF',
                    active: '#639EC7',
                },
                KJJGray: {
                    DEFAULT: '#F0F0F0',
                    dark: '#ADADAD',
                },
            },
            boxShadow: {
                lghover: [
                    '0 0 2px rgba(0, 0, 0, 0.03)',
                    '0 10px 15px rgba(0, 0, 0, 0.1)',
                    '0 4px 3px rgba(0, 0, 0, 0.1)',
                ],
            },
            fontSize: {
                xs: ['12px', '15px'],
            },
        },
    },
    plugins: [],
};
