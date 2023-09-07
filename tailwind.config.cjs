/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'outline': '0px 0px 4px 0px rgb(136, 136, 136)',
            },
            keyframes: {
                'mdrotator': {
                    '0%': {
                        transform: 'rotate(0deg)'
                    },
                    '100%': {
                        transform: 'rotate(270deg)'
                    }
                }
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
        require('@tailwindcss/typography'),
    ],
    variants: {
        scrollbar: ['rounded']
    }
}

