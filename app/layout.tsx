import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { WalletProvider } from "@/lib/wallet-context"
import { SynapseProvider } from "@/lib/synapse-context"
import { FilecoinPayProvider } from "@/lib/filecoin-pay-context"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DataVault Pro - Decentralized Data Marketplace",
  description: "Buy and sell datasets with verified storage and streaming payments on Filecoin",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <WalletProvider>
          <SynapseProvider>
            <FilecoinPayProvider>
              <SiteHeader />
              <main className="min-h-[calc(100vh-4rem)]">{children}</main>
              <Toaster />
            </FilecoinPayProvider>
          </SynapseProvider>
        </WalletProvider>
        <Analytics />
      </body>
    </html>
  )
}
