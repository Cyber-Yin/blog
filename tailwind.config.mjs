export default {
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        theme: "var(--theme)",
      },
      borderColor: {
        primary: "var(--border-primary)",
        secondary: "var(--border-secondary)",
      },
      backgroundColor: {
        primary: "var(--background-primary)",
        secondary: "var(--background-secondary)",
        comment: "var(--background-comment)",
      },
      textColor: {
        primary: "var(--font-primary)",
        secondary: "var(--font-secondary)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
