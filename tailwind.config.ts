import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071421",
        ink: "#0d1f32",
        cyan: "#23a6f0",
        blueglow: "#0f6fff",
        mint: "#34d399",
        cloud: "#f5f7fb"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(35,166,240,.2), 0 20px 70px rgba(15,111,255,.16)"
      }
    }
  },
  plugins: []
};

export default config;
