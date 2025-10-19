"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Shield, Search, CheckCircle2, XCircle, Clock, FileText, Database, Calendar, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface VerificationResult {
  cid: string
  verified: boolean
  pdpProof: {
    proofHash: string
    timestamp: number
    blockHeight: number
    storageProvider: string
  }
  fileInfo: {
    size: number
    uploadedAt: number
    lastVerified: number
  }
  status: "verified" | "pending" | "failed"
}

export default function VerificationPage() {
  const { toast } = useToast()
  const [cid, setCid] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)

  const handleVerify = async () => {
    if (!cid.trim()) {
      toast({
        title: "CID required",
        description: "Please enter a CID to verify",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock verification result
      const mockResult: VerificationResult = {
        cid: cid,
        verified: true,
        pdpProof: {
          proofHash: "0x" + Math.random().toString(36).substring(2, 15).repeat(4),
          timestamp: Date.now() - 3600000,
          blockHeight: 3456789,
          storageProvider: "f01234",
        },
        fileInfo: {
          size: 45600000,
          uploadedAt: Date.now() - 86400000 * 5,
          lastVerified: Date.now() - 3600000,
        },
        status: "verified",
      }

      setResult(mockResult)

      toast({
        title: "Verification complete",
        description: "PDP proof has been verified successfully",
      })
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Failed to verify CID",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + " MB"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="h-5 w-5 text-chart-2" />
      case "pending":
        return <Clock className="h-5 w-5 text-accent" />
      case "failed":
        return <XCircle className="h-5 w-5 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
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
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">PDP Verification</h1>
          <p className="text-lg text-muted-foreground">Verify cryptographic proof of data possession on Filecoin</p>
        </div>

        {/* Verification Input */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Verify Dataset</CardTitle>
            <CardDescription>Enter a CID to verify its PDP proof and storage status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter CID (e.g., bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi)"
                  value={cid}
                  onChange={(e) => setCid(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  disabled={loading}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleVerify} disabled={loading} className="gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Verify
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Verification Result */}
        {result && (
          <div className="space-y-6">
            <Card className="border-chart-2/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    Verification Result
                  </CardTitle>
                  <Badge variant="outline" className={getStatusColor(result.status)}>
                    {result.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* CID Info */}
                <div>
                  <div className="text-sm font-medium mb-2">Content Identifier (CID)</div>
                  <div className="rounded-lg bg-muted p-3 font-mono text-sm break-all">{result.cid}</div>
                </div>

                <Separator />

                {/* PDP Proof Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">PDP Proof Details</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium mb-1">Proof Hash</div>
                      <div className="text-sm text-muted-foreground font-mono break-all">
                        {result.pdpProof.proofHash}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Block Height</div>
                      <div className="text-sm text-muted-foreground">
                        {result.pdpProof.blockHeight.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Storage Provider</div>
                      <div className="text-sm text-muted-foreground font-mono">{result.pdpProof.storageProvider}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Proof Timestamp</div>
                      <div className="text-sm text-muted-foreground">{formatDate(result.pdpProof.timestamp)}</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* File Information */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">File Information</h3>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium mb-1">File Size</div>
                      <div className="text-sm text-muted-foreground">{formatFileSize(result.fileInfo.size)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Uploaded</div>
                      <div className="text-sm text-muted-foreground">{formatDate(result.fileInfo.uploadedAt)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Last Verified</div>
                      <div className="text-sm text-muted-foreground">{formatDate(result.fileInfo.lastVerified)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Storage Status</div>
                      <div className="flex items-center gap-1 text-sm text-chart-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Active
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Verification Checks */}
                <div>
                  <div className="text-sm font-medium mb-3">Verification Checks</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-chart-2" />
                      <span>Cryptographic proof verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-chart-2" />
                      <span>Storage provider confirmed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-chart-2" />
                      <span>Data integrity validated</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-chart-2" />
                      <span>Warm storage active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What is PDP? */}
            <Card>
              <CardHeader>
                <CardTitle>About PDP Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Proof of Data Possession (PDP) is a cryptographic verification method that proves a storage provider
                  actually possesses the data they claim to store, without requiring the entire dataset to be
                  downloaded.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Ensures sellers actually have the data before buyers purchase
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Provides cryptographic proof without revealing the data
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Verified on-chain for transparency and trust</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Cards */}
        {!result && (
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Cryptographic Proof</h3>
                <p className="text-sm text-muted-foreground">
                  Verify data possession without downloading the entire dataset
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Database className="h-8 w-8 text-accent mb-3" />
                <h3 className="font-semibold mb-2">On-Chain Verification</h3>
                <p className="text-sm text-muted-foreground">All proofs are recorded on the Filecoin blockchain</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-chart-2 mb-3" />
                <h3 className="font-semibold mb-2">Continuous Monitoring</h3>
                <p className="text-sm text-muted-foreground">Regular verification ensures data integrity over time</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
