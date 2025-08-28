"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Users,
  Star,
  Heart,
  ShoppingBag,
  Package,
  Calendar,
  Eye,
  Clock,
  DollarSign,
  MessageCircle,
  TrendingUp,
  Truck,
} from "lucide-react"
import { ReportItemDialog } from "@/components/report-item-dialog"
import { ItemFilters } from "@/components/item-filters"
import { SmartMatches } from "@/components/smart-matches"
import { BorrowLendDialog } from "@/components/borrow-lend-dialog"
import { BorrowLendFilters } from "@/components/borrow-lend-filters"
import { MarketplaceDialog } from "@/components/marketplace-dialog"
import { MarketplaceFilters } from "@/components/marketplace-filters"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("lost-found")
  const [searchQuery, setSearchQuery] = useState("")
  const [borrowLendSearchQuery, setBorrowLendSearchQuery] = useState("")
  const [marketplaceSearchQuery, setMarketplaceSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    location: "all",
    dateRange: "all",
  })
  const [borrowLendFilters, setBorrowLendFilters] = useState({
    type: "all",
    category: "all",
    condition: "all",
    duration: "all",
    availability: "all",
  })
  const [marketplaceFilters, setMarketplaceFilters] = useState({
    category: "all",
    condition: "all",
    priceRange: "all",
    minPrice: "",
    maxPrice: "",
    negotiable: "all",
    meetingPreference: "all",
  })

  const [lostFoundItems, setLostFoundItems] = useState([
    {
      id: "1",
      type: "lost",
      title: "iPhone 14 Pro",
      description: "Lost near library, black case with stickers. Has a cracked screen protector.",
      category: "Electronics",
      location: "Main Library",
      date: "2024-01-20",
      time: "2 hours ago",
      contactInfo: "john@university.edu",
      images: ["https://goldenshield.in/cdn/shop/files/thin_506787be-7abc-49d3-a205-003b72ab6458.jpg?v=1698340594&width=2000"],
      tags: ["urgent", "reward"],
      status: "active",
      timestamp: "2024-01-20T14:00:00Z",
    },
    {
      id: "2",
      type: "found",
      title: "Blue Water Bottle",
      description: "Found in cafeteria, has university logo and some dents on the bottom",
      category: "Personal Items",
      location: "Student Cafeteria",
      date: "2024-01-20",
      time: "4 hours ago",
      contactInfo: "sarah@university.edu",
      images: ["https://destinio.in/cdn/shop/files/LightBlue_15_39e8ccd5-424a-45f1-a08c-88f0c2f205f9.jpg?v=1747916326&width=1080"],
      tags: ["university-logo"],
      status: "active",
      timestamp: "2024-01-20T12:00:00Z",
    },
    {
      id: "3",
      type: "lost",
      title: "Physics 101 Textbook",
      description: "Green cover, lots of notes inside. Name 'Mike R.' written on first page",
      category: "Books & Stationery",
      location: "Physics Building",
      date: "2024-01-19",
      time: "1 day ago",
      contactInfo: "mike.r@university.edu",
      images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShBkQwBui3IeyyoLxOzwq9UwfTnNRcNyQ9WA&s"],
      tags: ["textbook", "notes"],
      status: "active",
      timestamp: "2024-01-19T16:00:00Z",
    },
    {
      id: "4",
      type: "found",
      title: "Black iPhone",
      description: "Found iPhone with black case, has some stickers. Screen is cracked.",
      category: "Electronics",
      location: "Near Library",
      date: "2024-01-20",
      time: "3 hours ago",
      contactInfo: "emma@university.edu",
      images: ["https://carefone.in/cdn/shop/files/Black-1_88239cd3-4998-4880-b3e1-74203f924c0f.jpg?v=1685708187"],
      tags: ["cracked-screen"],
      status: "active",
      timestamp: "2024-01-20T13:00:00Z",
    },
  ])

  const [borrowLendItems, setBorrowLendItems] = useState([
    {
      id: "bl1",
      type: "offer",
      title: "Scientific Calculator TI-84 Plus",
      description:
        "Perfect for math and engineering courses. All functions work perfectly. Includes manual and protective case.",
      category: "Electronics",
      condition: "Excellent",
      duration: "1 week",
      maxDuration: "2 weeks",
      deposit: "$20",
      rules: "Please handle with care. No food or drinks near the calculator.",
      owner: "Sarah M.",
      rating: 4.8,
      images: ["https://m.media-amazon.com/images/I/71OioW6z5mL.jpg"],
      tags: ["math", "engineering", "calculator"],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
      status: "available",
      timestamp: "2024-01-20T10:00:00Z",
      requests: [],
      borrowHistory: [{ borrower: "Mike R.", date: "2024-01-15", rating: 5, review: "Great condition, very helpful!" }],
    },
    {
      id: "bl2",
      type: "request",
      title: "Lab Coat - Size M",
      description:
        "Need a clean lab coat for chemistry lab sessions next week. Must be size Medium and in good condition.",
      category: "Clothing & Accessories",
      duration: "3 days",
      urgency: "urgent",
      owner: "Mike R.",
      rating: 4.5,
      images: ["/white-lab-coat-chemistry.png"],
      tags: ["chemistry", "lab", "urgent"],
      status: "active",
      timestamp: "2024-01-20T08:00:00Z",
      offers: [{ lender: "Emma L.", message: "I have a size M lab coat available", rating: 4.7 }],
    },
    {
      id: "bl3",
      type: "offer",
      title: "Acoustic Guitar",
      description:
        "Yamaha acoustic guitar in great condition. Perfect for beginners or practice sessions. Includes picks and strap.",
      category: "Musical Instruments",
      condition: "Good",
      duration: "Flexible",
      maxDuration: "1 month",
      deposit: "None required",
      rules: "Please tune after use and store in case when not playing.",
      owner: "Alex K.",
      rating: 4.9,
      images: ["https://m.media-amazon.com/images/I/611oz95XDTL._UF1000,1000_QL80_.jpg"],
      tags: ["music", "beginner-friendly", "acoustic"],
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      status: "available",
      timestamp: "2024-01-19T15:00:00Z",
      requests: [{ borrower: "Lisa P.", message: "Would love to borrow for music class", rating: 4.6 }],
      borrowHistory: [],
    },
    {
      id: "bl4",
      type: "request",
      title: "Drill and Basic Tools",
      description: "Need a drill and basic tools for a small furniture assembly project. Just for one afternoon.",
      category: "Tools & Hardware",
      duration: "1 day",
      urgency: "normal",
      owner: "Emma L.",
      rating: 4.6,
      images: ["https://thediyplaybook.com/wp-content/uploads/2020/01/homeowner-tools.jpg"],
      tags: ["tools", "furniture", "assembly"],
      status: "active",
      timestamp: "2024-01-20T12:00:00Z",
      offers: [],
    },
  ])

  const [marketplaceItems, setMarketplaceItems] = useState([
    {
      id: "mp1",
      title: "MacBook Air M1 - 13 inch",
      description:
        "Excellent condition MacBook Air with M1 chip. Used for 1 year, mostly for school work. No scratches or dents. Includes original charger, box, and documentation. Battery health at 95%. Perfect for students!",
      category: "Electronics",
      condition: "Like New",
      price: "$800",
      originalPrice: "$1200",
      negotiable: true,
      meetingPreference: "campus",
      paymentMethods: ["Cash", "Venmo", "PayPal"],
      seller: "Alex K.",
      sellerRating: 4.9,
      images: ["https://www.lifewire.com/thmb/Opx7k5CGFpJF5s4bsCN9g42DEHw=/1000x1000/filters:no_upscale():max_bytes(150000):strip_icc()/_hero_horiz_MacBook-Air-M1-2020-Computer-1-030783bfc1ec44f6be220018b3b89239.jpg"],
      tags: ["laptop", "apple", "student", "fast"],
      warranty: "30-day return policy",
      accessories: "Charger, Box, Documentation",
      reasonForSelling: "Upgrading to MacBook Pro",
      timestamp: "2024-01-19T14:00:00Z",
      status: "active",
      views: 45,
      favorites: 8,
      messages: [{ buyer: "Sarah M.", message: "Is this still available?", timestamp: "2024-01-20T10:00:00Z" }],
      salesHistory: [],
    },
    {
      id: "mp2",
      title: "Adjustable Study Desk Lamp",
      description:
        "Perfect LED desk lamp for studying. Multiple brightness levels and color temperatures. Barely used, bought last semester but switching to overhead lighting. Great for late-night study sessions.",
      category: "Furniture",
      condition: "Excellent",
      price: "$25",
      originalPrice: "$45",
      negotiable: false,
      meetingPreference: "pickup",
      paymentMethods: ["Cash", "Venmo"],
      seller: "Emma L.",
      sellerRating: 4.6,
      images: ["/adjustable-study-lamp.png"],
      tags: ["study", "LED", "adjustable", "dorm"],
      warranty: "No warranty",
      accessories: "Power adapter",
      reasonForSelling: "Moving to new dorm",
      timestamp: "2024-01-20T09:00:00Z",
      status: "active",
      views: 23,
      favorites: 3,
      messages: [],
      salesHistory: [],
    },
    {
      id: "mp3",
      title: "Physics Textbook Bundle - 3 Books",
      description:
        "Complete set of physics textbooks for Fundamental of Physics . All in good condition with minimal highlighting. Saved me hundreds compared to buying new. Perfect for physics majors or anyone taking the sequence.",
      category: "Books & Textbooks",
      condition: "Good",
      price: "$120",
      originalPrice: "$400",
      negotiable: true,
      meetingPreference: "campus",
      paymentMethods: ["Cash", "Venmo", "Zelle"],
      seller: "Mike R.",
      sellerRating: 4.5,
      images: ["https://scienceshepherd.com/cdn/shop/files/physics-curriculum-homeschool-3-book-set-cover-min_1600x.jpg?v=1719634037"],
      tags: ["textbook", "physics", "bundle", "college"],
      warranty: "No returns",
      accessories: "Solution manual included",
      reasonForSelling: "Graduated, no longer needed",
      timestamp: "2024-01-18T16:00:00Z",
      status: "active",
      views: 67,
      favorites: 12,
      messages: [
        { buyer: "Lisa P.", message: "Would you take $100?", timestamp: "2024-01-19T11:00:00Z" },
        { buyer: "John D.", message: "Are all three books included?", timestamp: "2024-01-20T08:00:00Z" },
      ],
      salesHistory: [],
    },
    {
      id: "mp4",
      title: "Gaming Chair - Ergonomic",
      description:
        "Comfortable gaming chair with lumbar support. Used for about 6 months. Some minor wear on armrests but still very comfortable. Great for long study sessions or gaming. Adjustable height and tilt.",
      category: "Furniture",
      condition: "Good",
      price: "$150",
      originalPrice: "$250",
      negotiable: true,
      meetingPreference: "pickup",
      paymentMethods: ["Cash", "PayPal"],
      seller: "David W.",
      sellerRating: 4.7,
      images: ["https://ii1.pepperfry.com/media/catalog/product/o/x/494x544/oxford-classic-breathable-mesh-ergonomic-chair-in-gray-and-blue-colour-oxford-classic-breathable-mes-zrsn05.jpg"],
      tags: ["gaming", "chair", "ergonomic", "comfortable"],
      warranty: "No warranty",
      accessories: "Assembly tools included",
      reasonForSelling: "Moving apartments",
      timestamp: "2024-01-17T13:00:00Z",
      status: "active",
      views: 34,
      favorites: 6,
      messages: [],
      salesHistory: [],
    },
  ])

  const getSmartMatches = (item: any) => {
    return lostFoundItems
      .filter((otherItem) => {
        if (otherItem.id === item.id) return false
        if (otherItem.type === item.type) return false // Opposite types only

        // Calculate match score based on various factors
        let score = 0

        // Title similarity (simple keyword matching)
        const itemWords = item.title.toLowerCase().split(" ")
        const otherWords = otherItem.title.toLowerCase().split(" ")
        const commonWords = itemWords.filter((word) => otherWords.includes(word))
        score += (commonWords.length / Math.max(itemWords.length, otherWords.length)) * 40

        // Category match
        if (item.category === otherItem.category) score += 30

        // Location proximity
        if (
          item.location === otherItem.location ||
          item.location.includes(otherItem.location) ||
          otherItem.location.includes(item.location)
        ) {
          score += 20
        }

        // Date proximity (within 3 days)
        const itemDate = new Date(item.date)
        const otherDate = new Date(otherItem.date)
        const daysDiff = Math.abs((itemDate.getTime() - otherDate.getTime()) / (1000 * 60 * 60 * 24))
        if (daysDiff <= 3) score += 10

        return score >= 50 // Only show matches with 50%+ similarity
      })
      .map((match) => ({
        ...match,
        matchScore: Math.min(
          100,
          Math.round(
            // Recalculate for display
            (match.title.toLowerCase().includes(item.title.toLowerCase().split(" ")[0]) ? 40 : 0) +
              (match.category === item.category ? 30 : 0) +
              (match.location === item.location ? 20 : 0) +
              10,
          ),
        ),
      }))
  }

  const filteredItems = useMemo(() => {
    return lostFoundItems.filter((item) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Type filter
      if (filters.type !== "all" && item.type !== filters.type) return false

      // Category filter
      if (filters.category !== "all" && item.category !== filters.category) return false

      // Location filter
      if (filters.location !== "all" && item.location !== filters.location) return false

      // Date range filter
      if (filters.dateRange !== "all") {
        const itemDate = new Date(item.timestamp)
        const now = new Date()
        const diffTime = now.getTime() - itemDate.getTime()
        const diffDays = diffTime / (1000 * 60 * 60 * 24)

        switch (filters.dateRange) {
          case "today":
            if (diffDays > 1) return false
            break
          case "week":
            if (diffDays > 7) return false
            break
          case "month":
            if (diffDays > 30) return false
            break
        }
      }

      return true
    })
  }, [lostFoundItems, searchQuery, filters])

  const filteredBorrowLendItems = useMemo(() => {
    return borrowLendItems.filter((item) => {
      // Search query filter
      if (borrowLendSearchQuery) {
        const query = borrowLendSearchQuery.toLowerCase()
        const matchesSearch =
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }

      // Type filter
      if (borrowLendFilters.type !== "all" && item.type !== borrowLendFilters.type) return false

      // Category filter
      if (borrowLendFilters.category !== "all" && item.category !== borrowLendFilters.category) return false

      // Condition filter (only for offers)
      if (
        borrowLendFilters.condition !== "all" &&
        item.type === "offer" &&
        item.condition !== borrowLendFilters.condition
      )
        return false

      // Duration filter
      if (borrowLendFilters.duration !== "all" && item.duration !== borrowLendFilters.duration) return false

      // Availability filter
      if (borrowLendFilters.availability !== "all") {
        if (borrowLendFilters.availability === "available" && item.type !== "offer") return false
        if (borrowLendFilters.availability === "urgent" && (item.type !== "request" || item.urgency !== "urgent"))
          return false
      }

      return true
    })
  }, [borrowLendItems, borrowLendSearchQuery, borrowLendFilters])

  const filteredMarketplaceItems = useMemo(() => {
    return marketplaceItems.filter((item) => {
      // Search query filter
      if (marketplaceSearchQuery) {
        const query = marketplaceSearchQuery.toLowerCase()
        const matchesSearch =
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          item.seller.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filter
      if (marketplaceFilters.category !== "all" && item.category !== marketplaceFilters.category) return false

      // Condition filter
      if (marketplaceFilters.condition !== "all" && item.condition !== marketplaceFilters.condition) return false

      // Price range filter
      if (marketplaceFilters.priceRange !== "all") {
        const price = Number.parseFloat(item.price.replace("$", ""))
        const ranges = {
          "Under $25": [0, 25],
          "$25-$50": [25, 50],
          "$50-$100": [50, 100],
          "$100-$250": [100, 250],
          "$250-$500": [250, 500],
          "Over $500": [500, Number.POSITIVE_INFINITY],
        }
        const [min, max] = ranges[marketplaceFilters.priceRange as keyof typeof ranges] || [0, Number.POSITIVE_INFINITY]
        if (price < min || price > max) return false
      }

      // Custom price filter
      if (marketplaceFilters.minPrice || marketplaceFilters.maxPrice) {
        const price = Number.parseFloat(item.price.replace("$", ""))
        const min = marketplaceFilters.minPrice ? Number.parseFloat(marketplaceFilters.minPrice) : 0
        const max = marketplaceFilters.maxPrice
          ? Number.parseFloat(marketplaceFilters.maxPrice)
          : Number.POSITIVE_INFINITY
        if (price < min || price > max) return false
      }

      // Negotiable filter
      if (marketplaceFilters.negotiable !== "all") {
        if (marketplaceFilters.negotiable === "negotiable" && !item.negotiable) return false
        if (marketplaceFilters.negotiable === "firm" && item.negotiable) return false
      }

      // Meeting preference filter
      if (
        marketplaceFilters.meetingPreference !== "all" &&
        item.meetingPreference !== marketplaceFilters.meetingPreference
      )
        return false

      return true
    })
  }, [marketplaceItems, marketplaceSearchQuery, marketplaceFilters])

  const handleReportItem = (newItem: any) => {
    setLostFoundItems((prev) => [newItem, ...prev])

    // Show smart matches for the new item
    const matches = getSmartMatches(newItem)
    if (matches.length > 0) {
      // In a real app, you'd show a notification or modal
      console.log(`Found ${matches.length} potential matches for ${newItem.title}`)
    }
  }

  const handleBorrowLendSubmit = (newItem: any) => {
    setBorrowLendItems((prev) => [newItem, ...prev])
  }

  const handleMarketplaceSubmit = (newItem: any) => {
    setMarketplaceItems((prev) => [newItem, ...prev])
  }

  const handleContactMatch = (matchId: string) => {
    // In a real app, this would open a chat or send a notification
    console.log(`Contacting owner of item ${matchId}`)
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuth={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">CommunityFind</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-1">
                <Star className="w-3 h-3" />
                125 pts
              </Badge>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="lost-found" className="gap-2">
              <Search className="w-4 h-4" />
              Lost & Found
            </TabsTrigger>
            <TabsTrigger value="borrow-lend" className="gap-2">
              <Heart className="w-4 h-4" />
              Borrow/Lend
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="gap-2">
              <ShoppingBag className="w-4 h-4" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="community" className="gap-2">
              <Users className="w-4 h-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lost-found" className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search lost or found items..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <ReportItemDialog onSubmit={handleReportItem} />
            </div>

            <ItemFilters onFiltersChange={setFilters} />

            {/* Smart Matches Section */}
            {filteredItems.length > 0 && (
              <SmartMatches matches={getSmartMatches(filteredItems[0])} onContactMatch={handleContactMatch} />
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {filteredItems.length} items</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>Auto-refresh every 30s</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <EnhancedItemCard key={item.id} item={item} />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters, or be the first to report an item.
                </p>
                <ReportItemDialog onSubmit={handleReportItem} />
              </div>
            )}
          </TabsContent>

          {/* Borrow/Lend Tab */}
          <TabsContent value="borrow-lend" className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items to borrow or lend..."
                    className="pl-10"
                    value={borrowLendSearchQuery}
                    onChange={(e) => setBorrowLendSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <BorrowLendDialog onSubmit={handleBorrowLendSubmit} />
            </div>

            <BorrowLendFilters onFiltersChange={setBorrowLendFilters} />

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {filteredBorrowLendItems.length} items</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="bg-primary/10">
                    {filteredBorrowLendItems.filter((item) => item.type === "offer").length} Available
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="bg-secondary/10">
                    {filteredBorrowLendItems.filter((item) => item.type === "request").length} Requested
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBorrowLendItems.map((item) => (
                <EnhancedBorrowLendCard key={item.id} item={item} />
              ))}
            </div>

            {filteredBorrowLendItems.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters, or be the first to offer or request an item.
                </p>
                <BorrowLendDialog onSubmit={handleBorrowLendSubmit} />
              </div>
            )}
          </TabsContent>

          {/* Marketplace Tab */}
          <TabsContent value="marketplace" className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search marketplace..."
                    className="pl-10"
                    value={marketplaceSearchQuery}
                    onChange={(e) => setMarketplaceSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <MarketplaceDialog onSubmit={handleMarketplaceSubmit} />
            </div>

            <MarketplaceFilters onFiltersChange={setMarketplaceFilters} />

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {filteredMarketplaceItems.length} items</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending: Electronics, Textbooks</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredMarketplaceItems.map((item) => (
                <EnhancedMarketplaceCard key={item.id} item={item} />
              ))}
            </div>

            {filteredMarketplaceItems.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters, or be the first to list an item for sale.
                </p>
                <MarketplaceDialog onSubmit={handleMarketplaceSubmit} />
              </div>
            )}
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Your Communities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Computer Science Dept</p>
                      <p className="text-sm text-muted-foreground">245 members</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Dorm Building A</p>
                      <p className="text-sm text-muted-foreground">89 members</p>
                    </div>
                    <Badge variant="secondary">Member</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">You helped return a lost wallet</p>
                      <p className="text-xs text-muted-foreground">+10 points • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm">Successfully lent calculator to Mike</p>
                      <p className="text-xs text-muted-foreground">+5 points • 1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function EnhancedItemCard({ item }: { item: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img src={item.images?.[0] || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
        <Badge className={`absolute top-2 left-2 ${item.type === "lost" ? "bg-destructive" : "bg-primary"}`}>
          {item.type === "lost" ? "Lost" : "Found"}
        </Badge>
        {item.tags.includes("urgent") && <Badge className="absolute top-2 right-2 bg-orange-500">Urgent</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold">{item.title}</h3>
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.location}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.date}
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            {item.type === "lost" ? "I Found This" : "This is Mine"}
          </Button>
          <Button variant="outline" size="sm">
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EnhancedBorrowLendCard({ item }: { item: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img src={item.images?.[0] || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
        <Badge className={`absolute top-2 left-2 ${item.type === "offer" ? "bg-primary" : "bg-secondary"}`}>
          {item.type === "offer" ? "Available" : "Requested"}
        </Badge>
        {item.urgency === "urgent" && <Badge className="absolute top-2 right-2 bg-orange-500">Urgent</Badge>}
        {item.type === "offer" && item.condition && (
          <Badge className="absolute bottom-2 left-2 bg-background/80 text-foreground">{item.condition}</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold line-clamp-1">{item.title}</h3>
          <Badge variant="outline" className="text-xs flex-shrink-0">
            {item.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{item.owner}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-xs">{item.rating}</span>
            </div>
          </div>
          {item.type === "offer" && item.deposit && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <DollarSign className="w-3 h-3" />
              {item.deposit}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {item.duration}
          </div>
          {item.type === "offer" && item.requests?.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {item.requests.length} requests
            </div>
          )}
          {item.type === "request" && item.offers?.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {item.offers.length} offers
            </div>
          )}
        </div>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            {item.type === "offer" ? "Request to Borrow" : "Offer to Lend"}
          </Button>
          <Button variant="outline" size="sm">
            Message
          </Button>
        </div>

        {item.type === "offer" && item.borrowHistory?.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground">Successfully lent {item.borrowHistory.length} times</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function EnhancedMarketplaceCard({ item }: { item: any }) {
  const savings = item.originalPrice
    ? Math.round(
        ((Number.parseFloat(item.originalPrice.replace("$", "")) - Number.parseFloat(item.price.replace("$", ""))) /
          Number.parseFloat(item.originalPrice.replace("$", ""))) *
          100,
      )
    : 0

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img src={item.images?.[0] || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">{item.condition}</Badge>
        {item.negotiable && <Badge className="absolute top-2 right-2 bg-secondary">Negotiable</Badge>}
        {savings > 0 && <Badge className="absolute bottom-2 left-2 bg-primary">{savings}% off</Badge>}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold line-clamp-1 flex-1">{item.title}</h3>
          <div className="text-right flex-shrink-0 ml-2">
            <span className="font-bold text-primary text-lg">{item.price}</span>
            {item.originalPrice && <p className="text-xs text-muted-foreground line-through">{item.originalPrice}</p>}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{item.seller}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-primary text-primary" />
              <span className="text-xs">{item.sellerRating}</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>

        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3" />
            {item.meetingPreference === "campus"
              ? "Campus"
              : item.meetingPreference === "pickup"
                ? "Pickup"
                : item.meetingPreference === "delivery"
                  ? "Delivery"
                  : "Flexible"}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {item.views} views
          </div>
          {item.messages.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {item.messages.length} messages
            </div>
          )}
        </div>

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            Message Seller
          </Button>
          <Button variant="outline" size="sm">
            ♡
          </Button>
        </div>

        {item.reasonForSelling && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground">Reason: {item.reasonForSelling}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-[family-name:var(--font-space-grotesk)]">
            Welcome to CommunityFind
          </CardTitle>
          <CardDescription>Connect with your community to find, share, and trade items</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? "login" : "signup"} onValueChange={(v) => setIsLogin(v === "login")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button onClick={onAuth} className="w-full">
                Sign In
              </Button>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button onClick={onAuth} className="w-full">
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
