/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      "text-nwf1": [
        "12px",
        {
          fontWeight: "400",
          lineHeight: "15px",
        },
      ],
      "text-nwf2": [
        "14px",
        {
          fontWeight: "400",
          lineHeight: "18px",
        },
      ],
      "text-nwf3": [
        "16px",
        {
          fontWeight: "400",
          lineHeight: "20px",
        },
      ],
      "text-nwf4": [
        "18px",
        {
          fontWeight: "400",
          lineHeight: "24px",
        },
      ],
      "text-swf1": [
        "14px",
        {
          fontWeight: "500",
          lineHeight: "22px",
        },
      ],
      "text-swf2": [
        "16px",
        {
          fontWeight: "500",
          lineHeight: "25px",
        },
      ],
      "text-swf3": [
        "26px",
        {
          fontWeight: "500",
          lineHeight: "40px",
        },
      ],
      "text-swf4": [
        "12px",
        {
          fontWeight: "500",
          lineHeight: "22px",
        },
      ],
      "text-bwf1": [
        "20px",
        {
          fontWeight: "600",
          lineHeight: "30px",
        },
      ],
      "text-bwf2": [
        "24px",
        {
          fontWeight: "600",
          lineHeight: "36px",
        },
      ],
      "text-bwf3": [
        "16px",
        {
          fontWeight: "600",
          lineHeight: "24px",
        },
      ],
    },
    colors: {
      primary_la: "#1A1C22",
      secondary_la: "#282C35",
      white_la: "#ffffff",
      green_la: "#1FCB4F",
      yellow_la: "#FFC01E",
      grey_la: "#9E9E9E",
      lightgrey_la: "#A9A9A9",
      darkgrey_la: "#383838",
      purple_la: "#8C89B4",
      green_shadow_la: "#1FCB4F4D",
      yellow_shadow_la: "#FFC01E4D",
      
    },
  },
  plugins: [require('daisyui')],
};
