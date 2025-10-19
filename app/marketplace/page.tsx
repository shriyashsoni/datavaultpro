"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, TrendingUp, Eye, Database, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface Dataset {
  id: string
  cid: string
  title: string
  description: string
  category: string
  price: number
  views: number
  sales: number
  seller: string
  uploadedAt: number
  fileSize: number
  verified: boolean
}

const MOCK_DATASETS: Dataset[] = [
  {
    id: "1",
    cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    title: "Customer Analytics Dataset 2024",
    description: "Comprehensive customer behavior data with purchase patterns, demographics, and engagement metrics",
    category: "analytics",
    price: 2.5,
    views: 234,
    sales: 12,
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    uploadedAt: Date.now() - 86400000 * 5,
    fileSize: 45600000,
    verified: true,
  },
  {
    id: "2",
    cid: "bafybeihkoviema7g3gxyt6la7vd5ho32ictqbilu3wnlo3rs7ewhnp7lly",
    title: "ML Training Dataset - Image Classification",
    description:
      "10,000 labeled images for computer vision training with diverse categories and high-quality annotations",
    category: "machine-learning",
    price: 5.0,
    views: 567,
    sales: 28,
    seller: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    uploadedAt: Date.now() - 86400000 * 12,
    fileSize: 234000000,
    verified: true,
  },
  {
    id: "3",
    cid: "bafybeibhwfzx6oo5rymsxmkdxpmkujcejbxvn2ykwencbxa3g7wcstss52",
    title: "Financial Market Data Q1 2024",
    description: "Stock market data with technical indicators, volume analysis, and historical price movements",
    category: "finance",
    price: 3.75,
    views: 189,
    sales: 8,
    seller: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
    uploadedAt: Date.now() - 86400000 * 8,
    fileSize: 12300000,
    verified: true,
  },
  {
    id: "4",
    cid: "bafybeif2ewg3nqa7dmbqkqkdqkqkqkqkqkqkqkqkqkqkqkqkqkqkqkqkq",
    title: "Healthcare Research Dataset - Patient Outcomes",
    description: "Anonymized patient outcome data for medical research with treatment efficacy metrics",
    category: "healthcare",
    price: 8.0,
    views: 423,
    sales: 15,
    seller: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
    uploadedAt: Date.now() - 86400000 * 20,
    fileSize: 89000000,
    verified: true,
  },
  {
    id: "5",
    cid: "bafybeigvgzoolc3drupxhlevdp2ugqcrbcsqfmcek2zxiw5wctk3xjpjrm",
    title: "E-commerce Product Catalog 2024",
    description: "Complete product catalog with descriptions, pricing, and sales performance data",
    category: "analytics",
    price: 1.5,
    views: 156,
    sales: 6,
    seller: "0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C",
    uploadedAt: Date.now() - 86400000 * 3,
    fileSize: 23400000,
    verified: true,
  },
  {
    id: "6",
    cid: "bafybeihdwdcefgh4dfdiu3uhjixvsqwejqhvqiemr542796fsz6f5paaaq",
    title: "Climate Data - Global Temperature Records",
    description: "Historical climate data with temperature, precipitation, and atmospheric measurements",
    category: "research",
    price: 4.25,
    views: 312,
    sales: 11,
    seller: "0x0F4ee9631f4be0a63756515141281A3E2B293Bbe",
    uploadedAt: Date.now() - 86400000 * 15,
    fileSize: 67800000,
    verified: true,
  },
]

export default function MarketplacePage() {
  const [datasets, setDatasets] = useState<Dataset[]>(MOCK_DATASETS)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredDatasets = datasets
    .filter((dataset) => {
      const matchesSearch =
        dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || dataset.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return b.uploadedAt - a.uploadedAt
        case "popular":
          return b.views - a.views
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "machine-learning": "bg-primary/10 text-primary border-primary/20",
      analytics: "bg-accent/10 text-accent border-accent/20",
      research: "bg-chart-3/10 text-chart-3 border-chart-3/20",
      finance: "bg-chart-2/10 text-chart-2 border-chart-2/20",
      healthcare: "bg-chart-4/10 text-chart-4 border-chart-4/20",
      other: "bg-muted text-muted-foreground border-border",
    }
    return colors[category] || colors.other
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Dataset Marketplace</h1>
        <p className="text-lg text-muted-foreground">Discover and purchase verified datasets stored on Filecoin</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="machine-learning">Machine Learning</SelectItem>
              <SelectItem value="analytics">Analytics</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Database className="h-4 w-4" />
          <span>
            Showing {filteredDatasets.length} of {datasets.length} datasets
          </span>
        </div>
      </div>

      {/* Dataset Grid */}
      {filteredDatasets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No datasets found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDatasets.map((dataset) => (
            <Link key={dataset.id} href={`/marketplace/${dataset.id}`}>
              <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={getCategoryColor(dataset.category)} variant="outline">
                      {dataset.category.replace("-", " ")}
                    </Badge>
                    {dataset.verified && (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{dataset.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{dataset.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-primary">{dataset.price} FIL</div>
                      <div className="text-sm text-muted-foreground">{formatFileSize(dataset.fileSize)}</div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {dataset.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {dataset.sales} sales
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="text-xs text-muted-foreground">Uploaded {formatDate(dataset.uploadedAt)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
