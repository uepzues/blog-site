/** @type {import('tailwindcss').Config} */
export const content = [
  "./views/*.{ejs,html,js}",
  "./views/**/*.{ejs,html,js}",
];
export const theme = {
  theme: {
    extend: {},
  },
};

// module.exports = {
//   darkMode: "class",
// };
export const plugins = [require("daisyui")];

export const daisyui = {
  themes: ["retro"],
  colors: {
    primary: "#ca8a04",
    "primary-focus": "#ca8a04",
  },
};
