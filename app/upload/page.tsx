"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWallet } from "@/lib/wallet-context"
import { useSynapse } from "@/lib/synapse-context"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const { uploadFile, isUploading } = useSynapse()
  const { toast } = useToast()

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to upload datasets",
        variant: "destructive",
      })
      return
    }

    if (!file || !title || !description || !category || !price) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a file",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const metadata = {
        title,
        description,
        category,
        price: Number.parseFloat(price),
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: Date.now(),
      }

      const cid = await uploadFile(file, metadata)

      clearInterval(progressInterval)
      setUploadProgress(100)
      setUploadComplete(true)

      toast({
        title: "Upload successful!",
        description: `Your dataset has been uploaded with CID: ${cid}`,
      })

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload dataset",
        variant: "destructive",
      })
      setUploadProgress(0)
    }
  }

  if (!isConnected) {
    return (
      <div className="container py-24">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>You need to connect your wallet to upload datasets</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Upload Dataset</h1>
          <p className="text-lg text-muted-foreground">
            Upload your dataset to Filecoin with verified storage and start earning
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dataset Information</CardTitle>
            <CardDescription>Provide details about your dataset for buyers</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">Dataset File</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="cursor-pointer"
                  />
                  {file && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Customer Analytics Dataset 2024"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isUploading}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your dataset, what it contains, and how it can be used..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isUploading}
                  rows={4}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={isUploading}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="machine-learning">Machine Learning</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (FIL)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isUploading}
                />
                <p className="text-sm text-muted-foreground">Set the price per access in FIL tokens</p>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploading to Filecoin...</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {/* Success Message */}
              {uploadComplete && (
                <div className="flex items-center gap-2 rounded-lg border border-chart-2/20 bg-chart-2/10 p-4 text-chart-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Upload complete! Redirecting to dashboard...</span>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" disabled={isUploading || uploadComplete} className="w-full gap-2" size="lg">
                {isUploading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : uploadComplete ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Upload Complete
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Upload Dataset
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Verified Storage</h3>
              <p className="text-sm text-muted-foreground">
                Your data is stored on Filecoin with cryptographic proof of possession
              </p>
            </CardContent>
          </Card>
          <Card className="border-accent/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Instant Delivery</h3>
              <p className="text-sm text-muted-foreground">Buyers get instant access via FilCDN after payment</p>
            </CardContent>
          </Card>
          <Card className="border-chart-2/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Streaming Payments</h3>
              <p className="text-sm text-muted-foreground">Receive payments automatically with Filecoin Pay</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
