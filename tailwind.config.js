/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enables the light/dark mode toggling
    theme: {
        extend: {},
    },
    plugins: [],
}