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
import { Plus, Upload, Clock, X, DollarSign } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface BorrowLendDialogProps {
  onSubmit: (item: any) => void
}

export function BorrowLendDialog({ onSubmit }: BorrowLendDialogProps) {
  const [open, setOpen] = useState(false)
  const [itemType, setItemType] = useState<"offer" | "request">("offer")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    duration: "",
    maxDuration: "",
    deposit: "",
    rules: "",
    images: [] as string[],
    tags: [] as string[],
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    urgency: "normal", // normal, urgent
  })
  const [newTag, setNewTag] = useState("")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = {
      id: Date.now().toString(),
      type: itemType,
      ...formData,
      timestamp: new Date().toISOString(),
      status: "active",
      owner: "Current User", // In real app, get from auth
      rating: 4.5, // Default rating for new users
      requests: [],
      borrowHistory: [],
    }
    onSubmit(newItem)
    setOpen(false)
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      condition: "",
      duration: "",
      maxDuration: "",
      deposit: "",
      rules: "",
      images: [],
      tags: [],
      availability: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      urgency: "normal",
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
        images: [...prev.images, ...newImages].slice(0, 3),
      }))
    }
  }

  const toggleAvailability = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: !prev.availability[day as keyof typeof prev.availability],
      },
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          {itemType === "offer" ? "Offer Item" : "Request Item"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{itemType === "offer" ? "Offer an Item to Lend" : "Request an Item to Borrow"}</DialogTitle>
          <DialogDescription>
            {itemType === "offer"
              ? "Share your items with the community and help others"
              : "Request items you need from community members"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Type Selection */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={itemType === "offer" ? "default" : "outline"}
              onClick={() => setItemType("offer")}
              className="flex-1"
            >
              I Want to Lend
            </Button>
            <Button
              type="button"
              variant={itemType === "request" ? "default" : "outline"}
              onClick={() => setItemType("request")}
              className="flex-1"
            >
              I Need to Borrow
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
                placeholder="e.g., Scientific Calculator, Lab Coat, Guitar"
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

              {itemType === "offer" && (
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
              )}
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder={
                  itemType === "offer"
                    ? "Describe the item, its features, any special instructions..."
                    : "Describe what you need, when you need it, and how you'll use it..."
                }
                rows={3}
                required
              />
            </div>
          </div>

          {/* Duration and Timing */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="duration">
                <Clock className="w-4 h-4 inline mr-1" />
                {itemType === "offer" ? "Available Duration" : "Needed Duration"} *
              </Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {itemType === "request" && (
              <div>
                <Label htmlFor="urgency">Urgency</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Availability Schedule (for offers) */}
          {itemType === "offer" && (
            <div>
              <Label>Availability Schedule</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {Object.entries(formData.availability).map(([day, checked]) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={day} checked={checked} onCheckedChange={() => toggleAvailability(day)} />
                    <Label htmlFor={day} className="text-sm capitalize">
                      {day.slice(0, 3)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deposit and Rules (for offers) */}
          {itemType === "offer" && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="deposit">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Security Deposit (optional)
                </Label>
                <Input
                  id="deposit"
                  value={formData.deposit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, deposit: e.target.value }))}
                  placeholder="e.g., $20, None required"
                />
              </div>

              <div>
                <Label htmlFor="maxDuration">Maximum Loan Period</Label>
                <Select
                  value={formData.maxDuration}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, maxDuration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Max duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {itemType === "offer" && (
            <div>
              <Label htmlFor="rules">Lending Rules & Instructions</Label>
              <Textarea
                id="rules"
                value={formData.rules}
                onChange={(e) => setFormData((prev) => ({ ...prev, rules: e.target.value }))}
                placeholder="Any special care instructions, usage rules, or requirements..."
                rows={2}
              />
            </div>
          )}

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

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {itemType === "offer" ? "Offer Item" : "Request Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
