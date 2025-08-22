"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, X } from "lucide-react"

interface ItemFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function ItemFilters({ onFiltersChange }: ItemFiltersProps) {
  const [filters, setFilters] = useState({
    type: "all", // all, lost, found
    category: "all",
    location: "all",
    dateRange: "all", // all, today, week, month
  })

  const categories = [
    "Electronics",
    "Clothing",
    "Books & Stationery",
    "Accessories",
    "Keys & Cards",
    "Sports Equipment",
    "Personal Items",
    "Other",
  ]

  const locations = [
    "Main Library",
    "Student Cafeteria",
    "Physics Building",
    "Computer Lab",
    "Gym",
    "Dormitory A",
    "Dormitory B",
    "Parking Lot",
  ]

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      type: "all",
      category: "all",
      location: "all",
      dateRange: "all",
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
            <SelectItem value="lost">Lost Only</SelectItem>
            <SelectItem value="found">Found Only</SelectItem>
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

        <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
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
              {filters.type === "lost" ? "Lost Items" : "Found Items"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("type", "all")} />
            </Badge>
          )}
          {filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("category", "all")} />
            </Badge>
          )}
          {filters.location !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.location}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("location", "all")} />
            </Badge>
          )}
          {filters.dateRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.dateRange === "today" ? "Today" : filters.dateRange === "week" ? "This Week" : "This Month"}
              <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter("dateRange", "all")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
