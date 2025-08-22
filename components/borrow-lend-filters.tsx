"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

interface BorrowLendFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function BorrowLendFilters({ onFiltersChange }: BorrowLendFiltersProps) {
  const [filters, setFilters] = useState({
    type: "all", // all, offer, request
    category: "all",
    condition: "all",
    duration: "all",
    availability: "all", // all, available, urgent
  })

  const categories = [
    "Electronics",
    "Books & Stationery",
    "Lab Equipment",
    "Sports Equipment",
    "Tools & Hardware",
    "Clothing & Accessories",
    "Musical Instruments",
    "Kitchen Items",
    "Other",
  ]

  const conditions = ["Excellent", "Good", "Fair", "Poor"]
  const durations = ["1 day", "3 days", "1 week", "2 weeks", "1 month", "Flexible"]

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      type: "all",
      category: "all",
      condition: "all",
      duration: "all",
      availability: "all",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "all")

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />

        <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="offer">Available</SelectItem>
            <SelectItem value="request">Requested</SelectItem>
          </SelectContent>
        </Select>

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

        <Select value={filters.duration} onValueChange={(value) => updateFilter("duration", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Duration</SelectItem>
            {durations.map((duration) => (
              <SelectItem key={duration} value={duration}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.availability} onValueChange={(value) => updateFilter("availability", value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="available">Available Now</SelectItem>
            <SelectItem value="urgent">Urgent Requests</SelectItem>
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
          {filters.type !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.type === "offer" ? "Available Items" : "Requested Items"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("type", "all")} />
            </Badge>
          )}
          {filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("category", "all")} />
            </Badge>
          )}
          {filters.condition !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.condition} Condition
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("condition", "all")} />
            </Badge>
          )}
          {filters.duration !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.duration}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("duration", "all")} />
            </Badge>
          )}
          {filters.availability !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.availability === "available" ? "Available Now" : "Urgent Requests"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("availability", "all")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
