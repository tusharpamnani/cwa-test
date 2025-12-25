module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        wormhole: {
          black: "#000000",
          white: "#FFFFFF",
          plum: "#C1BBF6",
          yellow: "#DDE95A",
          coral: "#FD8058"
        }
      }
    }
  },
  plugins: []
}
