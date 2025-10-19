"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet-context"
import { Database, Wallet, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Database className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DataVault Pro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/marketplace"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/upload"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Upload
            </Link>
            <Link
              href="/verification"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Verification
            </Link>
            <Link
              href="/analytics"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="/payments"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Payments
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {!isConnected ? (
            <Button onClick={connect} disabled={isConnecting} className="gap-2">
              <Wallet className="h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Wallet className="h-4 w-4" />
                  {formatAddress(address!)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-mono text-xs">{address}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={disconnect} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
