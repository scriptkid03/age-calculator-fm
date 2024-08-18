import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        offWhite: "hsl(0, 0%, 94%)",
        lightGray: "hsl(0, 0%, 86%)",
        smokeyGray: "hsl(0, 1%, 44%)",
        offBlack: "hsl(0, 0%, 8%)",
        purple: "hsl(259, 100%, 65%)",
        lightRed: "hsl(0, 100%, 67%)",
      }
    },
  },
  plugins: [],
};
export default config;
