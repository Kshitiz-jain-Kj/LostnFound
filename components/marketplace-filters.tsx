"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Filter, X, DollarSign } from "lucide-react"

interface MarketplaceFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function MarketplaceFilters({ onFiltersChange }: MarketplaceFiltersProps) {
  const [filters, setFilters] = useState({
    category: "all",
    condition: "all",
    priceRange: "all",
    minPrice: "",
    maxPrice: "",
    negotiable: "all", // all, negotiable, firm
    meetingPreference: "all",
  })

  const categories = [
    "Electronics",
    "Books & Textbooks",
    "Furniture",
    "Clothing & Accessories",
    "Sports Equipment",
    "Musical Instruments",
    "Kitchen & Appliances",
    "Art & Crafts",
    "Vehicles & Transportation",
    "Other",
  ]

  const conditions = ["Brand New", "Like New", "Excellent", "Good", "Fair", "Poor"]
  const priceRanges = ["Under $25", "$25-$50", "$50-$100", "$100-$250", "$250-$500", "Over $500"]

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const updatePriceFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    if (key === "priceRange" && value !== "all") {
      // Clear custom price inputs when selecting a range
      newFilters.minPrice = ""
      newFilters.maxPrice = ""
    }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const updateCustomPrice = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    if (value) {
      // Clear price range when entering custom prices
      newFilters.priceRange = "all"
    }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: "all",
      condition: "all",
      priceRange: "all",
      minPrice: "",
      maxPrice: "",
      negotiable: "all",
      meetingPreference: "all",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.entries(filters).some(([key, value]) =>
    key !== "minPrice" && key !== "maxPrice" ? value !== "all" : value !== "",
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />

        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.condition} onValueChange={(value) => updateFilter("condition", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Condition</SelectItem>
            {conditions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.priceRange} onValueChange={(value) => updatePriceFilter("priceRange", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            {priceRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateCustomPrice("minPrice", e.target.value)}
            className="w-20"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateCustomPrice("maxPrice", e.target.value)}
            className="w-20"
          />
        </div>

        <Select value={filters.negotiable} onValueChange={(value) => updateFilter("negotiable", value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="negotiable">Negotiable</SelectItem>
            <SelectItem value="firm">Firm Price</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.meetingPreference} onValueChange={(value) => updateFilter("meetingPreference", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Meeting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Meeting</SelectItem>
            <SelectItem value="campus">On Campus</SelectItem>
            <SelectItem value="pickup">Pickup Only</SelectItem>
            <SelectItem value="delivery">Can Deliver</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
            <X className="w-3 h-3" />
            Clear
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("category", "all")} />
            </Badge>
          )}
          {filters.condition !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.condition}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("condition", "all")} />
            </Badge>
          )}
          {filters.priceRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.priceRange}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updatePriceFilter("priceRange", "all")} />
            </Badge>
          )}
          {(filters.minPrice || filters.maxPrice) && (
            <Badge variant="secondary" className="gap-1">
              ${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => {
                  updateCustomPrice("minPrice", "")
                  updateCustomPrice("maxPrice", "")
                }}
              />
            </Badge>
          )}
          {filters.negotiable !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.negotiable === "negotiable" ? "Negotiable" : "Firm Price"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("negotiable", "all")} />
            </Badge>
          )}
          {filters.meetingPreference !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.meetingPreference === "campus"
                ? "On Campus"
                : filters.meetingPreference === "pickup"
                  ? "Pickup Only"
                  : "Can Deliver"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("meetingPreference", "all")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
