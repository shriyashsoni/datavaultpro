"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useWallet } from "@/lib/wallet-context"
import { Database, Shield, Zap, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { isConnected, connect } = useWallet()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-4 w-4" />
            Powered by Filecoin Onchain Cloud
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
            The Decentralized Data Marketplace
          </h1>

          <p className="mb-8 text-xl text-muted-foreground text-balance md:text-2xl">
            Buy and sell datasets with cryptographically verified storage, streaming payments, and instant delivery via
            FilCDN.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {!isConnected ? (
              <Button size="lg" onClick={connect} className="gap-2 text-lg">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <>
                <Button size="lg" asChild className="gap-2 text-lg">
                  <Link href="/marketplace">
                    Browse Marketplace
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg bg-transparent">
                  <Link href="/upload">Upload Dataset</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Built on Filecoin's Cutting-Edge Infrastructure
            </h2>
            <p className="text-lg text-muted-foreground">
              Leveraging Synapse SDK, Warm Storage, PDP Verification, and Filecoin Pay
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">PDP Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Cryptographic proof that sellers actually possess the data they're selling
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Streaming Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Pay per access or subscription with automatic settlements via Filecoin Pay
                </p>
              </CardContent>
            </Card>

            <Card className="border-chart-2/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10">
                  <Zap className="h-6 w-6 text-chart-2" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast content delivery through FilCDN for instant access
                </p>
              </CardContent>
            </Card>

            <Card className="border-chart-4/20">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10">
                  <Database className="h-6 w-6 text-chart-4" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Warm Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Fast, reliable storage with built-in data integrity monitoring
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-24">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Three simple steps to start buying or selling data</p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="mb-2 text-xl font-semibold">Connect Wallet</h3>
            <p className="text-muted-foreground">Connect your MetaMask wallet to access the marketplace</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
              2
            </div>
            <h3 className="mb-2 text-xl font-semibold">Browse or Upload</h3>
            <p className="text-muted-foreground">Explore datasets or upload your own with verified storage</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-2 text-2xl font-bold text-primary-foreground">
              3
            </div>
            <h3 className="mb-2 text-xl font-semibold">Trade Securely</h3>
            <p className="text-muted-foreground">Buy with streaming payments or earn from your data sales</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">Join the future of decentralized data trading</p>
            {!isConnected ? (
              <Button size="lg" onClick={connect} className="gap-2 text-lg">
                Connect Wallet to Begin
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild className="gap-2 text-lg">
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg bg-transparent">
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
