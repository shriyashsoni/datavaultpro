"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet-context"
import { useFilecoinPay } from "@/lib/filecoin-pay-context"
import { Zap, TrendingUp, Clock, CheckCircle2, XCircle, ArrowUpRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Payment {
  id: string
  datasetId: string
  datasetTitle: string
  amount: number
  seller: string
  timestamp: number
  status: "completed" | "pending" | "failed"
  txHash: string
}

export default function PaymentsPage() {
  const { isConnected, address } = useWallet()
  const { getActiveStreams } = useFilecoinPay()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected && address) {
      // Simulate loading payment history
      setTimeout(() => {
        setPayments([
          {
            id: "pay_1",
            datasetId: "1",
            datasetTitle: "Customer Analytics Dataset 2024",
            amount: 2.5,
            seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
            timestamp: Date.now() - 86400000 * 2,
            status: "completed",
            txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
          },
          {
            id: "pay_2",
            datasetId: "2",
            datasetTitle: "ML Training Dataset - Image Classification",
            amount: 5.0,
            seller: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            timestamp: Date.now() - 86400000 * 7,
            status: "completed",
            txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          },
          {
            id: "pay_3",
            datasetId: "3",
            datasetTitle: "Financial Market Data Q1 2024",
            amount: 3.75,
            seller: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
            timestamp: Date.now() - 3600000,
            status: "pending",
            txHash: "0xpending1234567890abcdef1234567890abcdef1234567890abcdef12345678",
          },
        ])
        setLoading(false)
      }, 1000)
    }
  }, [isConnected, address])

  if (!isConnected) {
    return (
      <div className="container py-24">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>You need to connect your wallet to view payment history</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const totalSpent = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-chart-2" />
      case "pending":
        return <Clock className="h-4 w-4 text-accent" />
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20"
      case "pending":
        return "bg-accent/10 text-accent border-accent/20"
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return ""
    }
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Payment History</h1>
        <p className="text-lg text-muted-foreground">Track your purchases and payment streams</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalSpent.toFixed(2)} FIL</div>
            <p className="text-xs text-muted-foreground mt-1">
              {payments.filter((p) => p.status === "completed").length} completed payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Streams</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">No active payment streams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{payments.filter((p) => p.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>All your dataset purchases and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading payments...</div>
              ) : payments.length === 0 ? (
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No payments yet</h3>
                  <p className="text-muted-foreground mb-4">Purchase datasets to see your payment history</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <Card key={payment.id} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold truncate">{payment.datasetTitle}</h3>
                              <Badge variant="outline" className={getStatusColor(payment.status)}>
                                {getStatusIcon(payment.status)}
                                <span className="ml-1">{payment.status}</span>
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div>Amount: {payment.amount} FIL</div>
                              <div>Seller: {formatAddress(payment.seller)}</div>
                              <div>Date: {formatDate(payment.timestamp)}</div>
                              <div className="flex items-center gap-1">
                                <span>Tx:</span>
                                <span className="font-mono text-xs">{formatAddress(payment.txHash)}</span>
                                <Button variant="ghost" size="icon" className="h-4 w-4">
                                  <ArrowUpRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">-{payment.amount} FIL</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-6">
              <div className="space-y-3">
                {payments
                  .filter((p) => p.status === "completed")
                  .map((payment) => (
                    <Card key={payment.id} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold truncate">{payment.datasetTitle}</h3>
                              <Badge variant="outline" className={getStatusColor(payment.status)}>
                                {getStatusIcon(payment.status)}
                                <span className="ml-1">{payment.status}</span>
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div>Date: {formatDate(payment.timestamp)}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">-{payment.amount} FIL</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4 mt-6">
              <div className="space-y-3">
                {payments
                  .filter((p) => p.status === "pending")
                  .map((payment) => (
                    <Card key={payment.id} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold truncate">{payment.datasetTitle}</h3>
                              <Badge variant="outline" className={getStatusColor(payment.status)}>
                                {getStatusIcon(payment.status)}
                                <span className="ml-1">{payment.status}</span>
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">Waiting for confirmation...</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-accent">-{payment.amount} FIL</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
