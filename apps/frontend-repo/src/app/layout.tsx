import type {Metadata} from "next"
import {Poppins} from "next/font/google"
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter"
import StoreProvider from "@/app/StoreProvider"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {baselightTheme} from "@/theme"
import Toast from "@/components/shared/Toast"

const poppins = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <ThemeProvider theme={baselightTheme}>
              <Toast />
              <CssBaseline />
              <main>{children}</main>
            </ThemeProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
