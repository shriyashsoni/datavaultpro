"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/lib/wallet-context"
import { TrendingUp, Eye, DollarSign, Download, Users, BarChart3, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AnalyticsData {
  totalViews: number
  totalSales: number
  totalRevenue: number
  uniqueVisitors: number
  conversionRate: number
  avgOrderValue: number
  viewsOverTime: { date: string; views: number }[]
  salesOverTime: { date: string; sales: number }[]
  topDatasets: { id: string; title: string; views: number; sales: number; revenue: number }[]
}

export default function AnalyticsPage() {
  const { isConnected } = useWallet()
  const [timeRange, setTimeRange] = useState("7d")
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    if (isConnected) {
      // Simulate loading analytics data
      setTimeout(() => {
        setAnalytics({
          totalViews: 1234,
          totalSales: 45,
          totalRevenue: 188.75,
          uniqueVisitors: 892,
          conversionRate: 3.65,
          avgOrderValue: 4.19,
          viewsOverTime: [
            { date: "Jan 13", views: 145 },
            { date: "Jan 14", views: 178 },
            { date: "Jan 15", views: 203 },
            { date: "Jan 16", views: 189 },
            { date: "Jan 17", views: 234 },
            { date: "Jan 18", views: 156 },
            { date: "Jan 19", views: 129 },
          ],
          salesOverTime: [
            { date: "Jan 13", sales: 4 },
            { date: "Jan 14", sales: 7 },
            { date: "Jan 15", sales: 9 },
            { date: "Jan 16", sales: 6 },
            { date: "Jan 17", sales: 11 },
            { date: "Jan 18", sales: 5 },
            { date: "Jan 19", sales: 3 },
          ],
          topDatasets: [
            {
              id: "2",
              title: "ML Training Dataset - Image Classification",
              views: 567,
              sales: 28,
              revenue: 140.0,
            },
            {
              id: "1",
              title: "Customer Analytics Dataset 2024",
              views: 234,
              sales: 12,
              revenue: 30.0,
            },
            {
              id: "3",
              title: "Financial Market Data Q1 2024",
              views: 189,
              sales: 5,
              revenue: 18.75,
            },
          ],
        })
        setLoading(false)
      }, 1000)
    }
  }, [isConnected, timeRange])

  if (!isConnected) {
    return (
      <div className="container py-24">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>You need to connect your wallet to view analytics</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (loading || !analytics) {
    return (
      <div className="container py-24 flex items-center justify-center">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Analytics Dashboard</h1>
          <p className="text-lg text-muted-foreground">Track your dataset performance and earnings</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.totalRevenue.toFixed(2)} FIL</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+12.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.totalSales}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+8.3%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+15.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+10.7%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.conversionRate.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+0.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.avgOrderValue.toFixed(2)} FIL</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+3.8%</span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="datasets">Top Datasets</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
                <CardDescription>Daily views for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.viewsOverTime.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground w-16">{item.date}</div>
                      <div className="flex-1">
                        <div
                          className="h-8 bg-primary/20 rounded flex items-center justify-end px-2"
                          style={{ width: `${(item.views / 250) * 100}%` }}
                        >
                          <span className="text-xs font-medium">{item.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Over Time</CardTitle>
                <CardDescription>Daily sales for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.salesOverTime.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground w-16">{item.date}</div>
                      <div className="flex-1">
                        <div
                          className="h-8 bg-accent/20 rounded flex items-center justify-end px-2"
                          style={{ width: `${(item.sales / 15) * 100}%` }}
                        >
                          <span className="text-xs font-medium">{item.sales}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Datasets</CardTitle>
              <CardDescription>Your best-selling datasets in the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topDatasets.map((dataset, index) => (
                  <div key={dataset.id} className="flex items-center gap-4 p-4 rounded-lg border border-border/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{dataset.title}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {dataset.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {dataset.sales} sales
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{dataset.revenue.toFixed(2)} FIL</div>
                      <div className="text-xs text-muted-foreground">revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key trends and patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-2/10">
                    <TrendingUp className="h-4 w-4 text-chart-2" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Strong Growth</div>
                    <div className="text-sm text-muted-foreground">
                      Your datasets are seeing increased interest with 15% more views this period
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">New Audience</div>
                    <div className="text-sm text-muted-foreground">
                      You're reaching 10% more unique visitors compared to last period
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <BarChart3 className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Higher Value</div>
                    <div className="text-sm text-muted-foreground">
                      Average order value increased by 3.8%, indicating premium dataset interest
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Actions to improve performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border/50 p-4">
                  <div className="font-medium mb-2">Optimize Pricing</div>
                  <div className="text-sm text-muted-foreground">
                    Consider adjusting prices based on view-to-sale conversion rates
                  </div>
                </div>
                <div className="rounded-lg border border-border/50 p-4">
                  <div className="font-medium mb-2">Improve Descriptions</div>
                  <div className="text-sm text-muted-foreground">
                    Datasets with detailed descriptions convert 2x better
                  </div>
                </div>
                <div className="rounded-lg border border-border/50 p-4">
                  <div className="font-medium mb-2">Add More Datasets</div>
                  <div className="text-sm text-muted-foreground">Sellers with 5+ datasets earn 3x more on average</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
