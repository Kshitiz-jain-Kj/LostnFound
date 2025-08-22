"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, DollarSign, X, Truck } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface MarketplaceDialogProps {
  onSubmit: (item: any) => void
}

export function MarketplaceDialog({ onSubmit }: MarketplaceDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    negotiable: true,
    meetingPreference: "campus", // campus, delivery, pickup
    paymentMethods: [] as string[],
    images: [] as string[],
    tags: [] as string[],
    warranty: "",
    accessories: "",
    reasonForSelling: "",
  })
  const [newTag, setNewTag] = useState("")

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

  const paymentOptions = ["Cash", "Venmo", "PayPal", "Zelle", "Apple Pay", "Bank Transfer"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = {
      id: Date.now().toString(),
      ...formData,
      seller: "Current User", // In real app, get from auth
      sellerRating: 4.5, // Default rating for new users
      timestamp: new Date().toISOString(),
      status: "active",
      views: 0,
      favorites: 0,
      messages: [],
      salesHistory: [],
    }
    onSubmit(newItem)
    setOpen(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      condition: "",
      price: "",
      originalPrice: "",
      negotiable: true,
      meetingPreference: "campus",
      paymentMethods: [],
      images: [],
      tags: [],
      warranty: "",
      accessories: "",
      reasonForSelling: "",
    })
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5), // Max 5 images
      }))
    }
  }

  const togglePaymentMethod = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Sell Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>List an Item for Sale</DialogTitle>
          <DialogDescription>Sell your items to community members safely and easily</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Item Name *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., MacBook Pro 2021, Physics Textbook, Desk Chair"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="condition">Condition *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Item condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the item's condition, features, any defects, reason for selling..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="price">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Asking Price *
              </Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="$50"
                required
              />
            </div>

            <div>
              <Label htmlFor="originalPrice">Original Price (optional)</Label>
              <Input
                id="originalPrice"
                value={formData.originalPrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: e.target.value }))}
                placeholder="$100"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="negotiable"
                checked={formData.negotiable}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, negotiable: !!checked }))}
              />
              <Label htmlFor="negotiable" className="text-sm">
                Price negotiable
              </Label>
            </div>
          </div>

          {/* Meeting & Payment */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="meetingPreference">
                <Truck className="w-4 h-4 inline mr-1" />
                Meeting Preference
              </Label>
              <Select
                value={formData.meetingPreference}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, meetingPreference: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campus">Meet on Campus</SelectItem>
                  <SelectItem value="pickup">Buyer Pickup</SelectItem>
                  <SelectItem value="delivery">Can Deliver</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Accepted Payment Methods</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {paymentOptions.map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={method}
                      checked={formData.paymentMethods.includes(method)}
                      onCheckedChange={() => togglePaymentMethod(method)}
                    />
                    <Label htmlFor={method} className="text-sm">
                      {method}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="warranty">Warranty/Return Policy</Label>
              <Input
                id="warranty"
                value={formData.warranty}
                onChange={(e) => setFormData((prev) => ({ ...prev, warranty: e.target.value }))}
                placeholder="e.g., 30-day return, No warranty"
              />
            </div>

            <div>
              <Label htmlFor="accessories">Included Accessories</Label>
              <Input
                id="accessories"
                value={formData.accessories}
                onChange={(e) => setFormData((prev) => ({ ...prev, accessories: e.target.value }))}
                placeholder="e.g., Charger, Case, Manual"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="reasonForSelling">Reason for Selling (optional)</Label>
            <Input
              id="reasonForSelling"
              value={formData.reasonForSelling}
              onChange={(e) => setFormData((prev) => ({ ...prev, reasonForSelling: e.target.value }))}
              placeholder="e.g., Upgrading, Moving, No longer needed"
            />
          </div>

          {/* Images */}
          <div>
            <Label>Photos (up to 5) *</Label>
            <div className="mt-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                  <p className="text-xs text-muted-foreground">First image will be the main photo</p>
                </div>
                <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                    {index === 0 && <Badge className="absolute -top-2 -left-2 text-xs">Main</Badge>}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 w-5 h-5 p-0"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index),
                        }))
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <Label>Tags (optional)</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tags..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              List Item for Sale
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
