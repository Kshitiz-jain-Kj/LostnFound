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
import { Plus, Upload, MapPin, Calendar, X } from "lucide-react"

interface ReportItemDialogProps {
  onSubmit: (item: any) => void
}

export function ReportItemDialog({ onSubmit }: ReportItemDialogProps) {
  const [open, setOpen] = useState(false)
  const [itemType, setItemType] = useState<"lost" | "found">("lost")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    contactInfo: "",
    images: [] as string[],
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = {
      id: Date.now().toString(),
      type: itemType,
      ...formData,
      timestamp: new Date().toISOString(),
      status: "active",
    }
    onSubmit(newItem)
    setOpen(false)
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      date: "",
      contactInfo: "",
      images: [],
      tags: [],
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
      // In a real app, you'd upload to a service and get URLs
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 3), // Max 3 images
      }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Report Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report an Item</DialogTitle>
          <DialogDescription>Help your community by reporting lost or found items</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Type Selection */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={itemType === "lost" ? "default" : "outline"}
              onClick={() => setItemType("lost")}
              className="flex-1"
            >
              I Lost Something
            </Button>
            <Button
              type="button"
              variant={itemType === "found" ? "default" : "outline"}
              onClick={() => setItemType("found")}
              className="flex-1"
            >
              I Found Something
            </Button>
          </div>

          {/* Basic Information */}
          <div className="grid gap-4">
            <div>
              <Label htmlFor="title">Item Name *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., iPhone 14 Pro, Blue Backpack"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
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
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Provide detailed description including color, size, brand, distinctive features..."
                rows={3}
                required
              />
            </div>
          </div>

          {/* Location and Date */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="location">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Main Library, Cafeteria"
                required
              />
            </div>

            <div>
              <Label htmlFor="date">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date {itemType === "lost" ? "Lost" : "Found"} *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Images */}
          <div>
            <Label>Photos (up to 3)</Label>
            <div className="mt-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                </div>
                <input type="file" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
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

          {/* Contact Information */}
          <div>
            <Label htmlFor="contactInfo">Contact Information *</Label>
            <Input
              id="contactInfo"
              value={formData.contactInfo}
              onChange={(e) => setFormData((prev) => ({ ...prev, contactInfo: e.target.value }))}
              placeholder="Email or phone number"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Report {itemType === "lost" ? "Lost" : "Found"} Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
