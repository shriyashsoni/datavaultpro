"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useWallet } from "@/lib/wallet-context"
import { useFilecoinPay } from "@/lib/filecoin-pay-context"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle2,
  Eye,
  TrendingUp,
  Calendar,
  User,
  FileText,
  Shield,
  Download,
  ArrowLeft,
  Loader2,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
  pdpProof: boolean
  detailedDescription: string
  sampleData: string
}

const MOCK_DATASETS: Record<string, Dataset> = {
  "1": {
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
    pdpProof: true,
    detailedDescription:
      "This comprehensive dataset contains detailed customer behavior analytics collected over 12 months. It includes purchase patterns, demographic information, engagement metrics, and customer journey data. Perfect for training recommendation systems, customer segmentation models, or conducting market research.",
    sampleData: `{
  "customer_id": "C12345",
  "age": 34,
  "location": "New York",
  "total_purchases": 23,
  "avg_order_value": 156.78,
  "last_purchase_date": "2024-01-15",
  "engagement_score": 8.5
}`,
  },
  "2": {
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
    pdpProof: true,
    detailedDescription:
      "A high-quality image classification dataset containing 10,000 professionally labeled images across 50 categories. Each image is 1024x1024 pixels with detailed annotations and metadata. Ideal for training computer vision models, transfer learning, or benchmarking classification algorithms.",
    sampleData: `{
  "image_id": "IMG_001",
  "category": "wildlife",
  "subcategory": "birds",
  "labels": ["eagle", "flying", "outdoor"],
  "resolution": "1024x1024",
  "format": "PNG"
}`,
  },
}

export default function DatasetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isConnected } = useWallet()
  const { createPayment, isProcessing: isPaymentProcessing } = useFilecoinPay()
  const { toast } = useToast()
  const [dataset, setDataset] = useState<Dataset | null>(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      const id = params.id as string
      const foundDataset = MOCK_DATASETS[id]
      if (foundDataset) {
        setDataset(foundDataset)
      }
      setLoading(false)
    }, 500)
  }, [params.id])

  const handlePurchase = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase datasets",
        variant: "destructive",
      })
      return
    }

    if (!dataset) return

    setPurchasing(true)

    try {
      const paymentId = await createPayment(dataset.id, dataset.seller, dataset.price)

      console.log("[v0] Payment ID:", paymentId)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Purchase successful!",
        description: "Payment processed via Filecoin Pay. You now have access to this dataset.",
      })

      setShowPaymentDialog(false)

      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error: any) {
      toast({
        title: "Purchase failed",
        description: error.message || "Failed to complete purchase",
        variant: "destructive",
      })
    } finally {
      setPurchasing(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + " MB"
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (loading) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!dataset) {
    return (
      <div className="container py-24">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Dataset Not Found</CardTitle>
            <CardDescription>The dataset you're looking for doesn't exist</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/marketplace">Back to Marketplace</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" asChild className="mb-6 gap-2">
        <Link href="/marketplace">
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start gap-3 mb-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {dataset.category.replace("-", " ")}
              </Badge>
              {dataset.verified && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              )}
              {dataset.pdpProof && (
                <Badge variant="outline" className="gap-1 bg-chart-2/10 text-chart-2 border-chart-2/20">
                  <Shield className="h-3 w-3" />
                  PDP Verified
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{dataset.title}</h1>
            <p className="text-lg text-muted-foreground">{dataset.description}</p>
          </div>

          <Separator />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sample">Sample Data</TabsTrigger>
              <TabsTrigger value="details">Technical Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Dataset</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{dataset.detailedDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Verified storage on Filecoin with cryptographic proof</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Instant access via FilCDN after purchase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>High-quality data with detailed documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Regular updates and seller support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sample" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sample Data Preview</CardTitle>
                  <CardDescription>Example of the data structure you'll receive</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{dataset.sampleData}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium mb-1">File Size</div>
                      <div className="text-muted-foreground">{formatFileSize(dataset.fileSize)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Format</div>
                      <div className="text-muted-foreground">JSON, CSV</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">CID</div>
                      <div className="text-muted-foreground font-mono text-xs">{dataset.cid}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Storage Provider</div>
                      <div className="text-muted-foreground">Filecoin Network</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-chart-2" />
                    <span className="text-sm">PDP Proof Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-chart-2" />
                    <span className="text-sm">Warm Storage Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-chart-2" />
                    <span className="text-sm">FilCDN Enabled</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">{dataset.price} FIL</CardTitle>
              <CardDescription>One-time purchase for lifetime access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => setShowPaymentDialog(true)}
                disabled={purchasing || isPaymentProcessing}
                className="w-full gap-2"
                size="lg"
              >
                {purchasing || isPaymentProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Purchase Dataset
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-primary" />
                <span>Secure payment via Filecoin Pay</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dataset Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  Views
                </div>
                <div className="font-medium">{dataset.views}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Sales
                </div>
                <div className="font-medium">{dataset.sales}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Size
                </div>
                <div className="font-medium">{formatFileSize(dataset.fileSize)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Uploaded
                </div>
                <div className="font-medium text-sm">{formatDate(dataset.uploadedAt)}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm">{formatAddress(dataset.seller)}</span>
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                View Seller Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>Review your purchase details before proceeding</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Dataset</div>
              <div className="text-sm text-muted-foreground">{dataset?.title}</div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="text-sm font-medium">Payment Details</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="text-sm font-medium">{dataset?.price} FIL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment Method</span>
                <div className="flex items-center gap-1 text-sm">
                  <Zap className="h-3 w-3 text-primary" />
                  <span>Filecoin Pay</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="rounded-lg bg-muted p-4 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Instant access after payment</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Lifetime access to dataset</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">Secure payment via smart contract</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)} disabled={purchasing}>
              Cancel
            </Button>
            <Button onClick={handlePurchase} disabled={purchasing || isPaymentProcessing} className="gap-2">
              {purchasing || isPaymentProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Confirm Purchase
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
