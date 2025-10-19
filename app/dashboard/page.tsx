"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/lib/wallet-context"
import { useSynapse } from "@/lib/synapse-context"
import { Database, TrendingUp, DollarSign, Eye, MoreVertical, CheckCircle2, Clock, FileText, Plus } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Dataset {
  id: string
  cid: string
  title: string
  description: string
  category: string
  price: number
  views: number
  sales: number
  revenue: number
  status: "verified" | "pending" | "failed"
  uploadedAt: number
  fileSize: number
}

export default function DashboardPage() {
  const { isConnected, address } = useWallet()
  const { isInitialized } = useSynapse()
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isConnected && isInitialized) {
      // Simulate loading datasets
      setTimeout(() => {
        setDatasets([
          {
            id: "1",
            cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
            title: "Customer Analytics Dataset 2024",
            description: "Comprehensive customer behavior data with purchase patterns",
            category: "analytics",
            price: 2.5,
            views: 234,
            sales: 12,
            revenue: 30.0,
            status: "verified",
            uploadedAt: Date.now() - 86400000 * 5,
            fileSize: 45600000,
          },
          {
            id: "2",
            cid: "bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly",
            title: "ML Training Dataset - Image Classification",
            description: "10,000 labeled images for computer vision training",
            category: "machine-learning",
            price: 5.0,
            views: 567,
            sales: 28,
            revenue: 140.0,
            status: "verified",
            uploadedAt: Date.now() - 86400000 * 12,
            fileSize: 234000000,
          },
          {
            id: "3",
            cid: "bafybeibhwfzx6oo5rymsxmkdxpmkujcejbxvn2ykwencbxa3g7wcstss52",
            title: "Financial Market Data Q1 2024",
            description: "Stock market data with technical indicators",
            category: "finance",
            price: 3.75,
            views: 89,
            sales: 5,
            revenue: 18.75,
            status: "pending",
            uploadedAt: Date.now() - 86400000 * 2,
            fileSize: 12300000,
          },
        ])
        setLoading(false)
      }, 1000)
    }
  }, [isConnected, isInitialized])

  if (!isConnected) {
    return (
      <div className="container py-24">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>You need to connect your wallet to view your dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const totalRevenue = datasets.reduce((sum, d) => sum + d.revenue, 0)
  const totalSales = datasets.reduce((sum, d) => sum + d.sales, 0)
  const totalViews = datasets.reduce((sum, d) => sum + d.views, 0)

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + " MB"
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Seller Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage your datasets and track earnings</p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link href="/upload">
            <Plus className="h-5 w-5" />
            Upload Dataset
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalRevenue.toFixed(2)} FIL</div>
            <p className="text-xs text-muted-foreground mt-1">From {totalSales} sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all datasets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Datasets</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{datasets.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {datasets.filter((d) => d.status === "verified").length} verified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Datasets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Datasets</CardTitle>
          <CardDescription>Manage and monitor your uploaded datasets</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Datasets</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading datasets...</div>
              ) : datasets.length === 0 ? (
                <div className="text-center py-12">
                  <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No datasets yet</h3>
                  <p className="text-muted-foreground mb-4">Upload your first dataset to get started</p>
                  <Button asChild>
                    <Link href="/upload">Upload Dataset</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {datasets.map((dataset) => (
                    <Card key={dataset.id} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold truncate">{dataset.title}</h3>
                              <Badge
                                variant={dataset.status === "verified" ? "default" : "secondary"}
                                className="shrink-0"
                              >
                                {dataset.status === "verified" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                {dataset.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                                {dataset.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dataset.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                {formatFileSize(dataset.fileSize)}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {dataset.price} FIL
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {dataset.views} views
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                {dataset.sales} sales
                              </div>
                              <div className="font-medium text-foreground">{dataset.revenue.toFixed(2)} FIL earned</div>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              Uploaded {formatDate(dataset.uploadedAt)} • CID: {dataset.cid.slice(0, 20)}...
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="shrink-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Listing</DropdownMenuItem>
                              <DropdownMenuItem>View Analytics</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Remove Listing</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="verified" className="space-y-4 mt-6">
              <div className="space-y-4">
                {datasets
                  .filter((d) => d.status === "verified")
                  .map((dataset) => (
                    <Card key={dataset.id} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold truncate">{dataset.title}</h3>
                              <Badge variant="default" className="shrink-0">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                verified
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dataset.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {dataset.price} FIL
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4" />
                                {dataset.sales} sales
                              </div>
                              <div className="font-medium text-foreground">{dataset.revenue.toFixed(2)} FIL earned</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4 mt-6">
              <div className="space-y-4">
                {datasets
                  .filter((d) => d.status === "pending")
                  .map((dataset) => (
                    <Card key={dataset.id} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold truncate">{dataset.title}</h3>
                              <Badge variant="secondary" className="shrink-0">
                                <Clock className="h-3 w-3 mr-1" />
                                pending
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dataset.description}</p>
                            <div className="text-sm text-muted-foreground">
                              Waiting for PDP verification to complete...
                            </div>
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
