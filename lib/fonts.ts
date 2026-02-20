import localFont from "next/font/local"

export const nexa = localFont({
  src: [
    { path: "../../public/fonts/nexa/NexaLight.otf", weight: "300" },
    { path: "../../public/fonts/nexa/NexaBold.otf", weight: "700" },
  ],
  variable: "--font-nexa",
  display: "swap",
})