import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // Adicionei este caso seus arquivos estejam na pasta src
  ],
  theme: {
    extend: {
      keyframes: {
        "tech-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // 40s para o normal, 10s para quando estiver perto da borda
        "tech-scroll": "tech-scroll 40s linear infinite",
        "tech-scroll-fast": "tech-scroll 10s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;