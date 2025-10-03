/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,ts}", "./components/**/*.{tsx,ts}", "./theme/**/*.{tsx,ts}", "./theme/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      colors: {
        background: {
          DEFAULT: "#000000",
          deep: "#0a0f1e"
        },
        neon: {
          blue: "#00f7ff",
          purple: "#a020f0",
          teal: "#00ffd1"
        },
        glass: "rgba(255,255,255,0.08)"
      },
      borderRadius: {
        glass: "24px"
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 247, 255, 0.45)"
      },
      transitionTimingFunction: {
        neon: "cubic-bezier(0.4, 0, 0.2, 1)"
      }
    }
  },
  plugins: []
};
