"use client"

import { useState } from "react"
import { blogPosts } from "@/data/blogPosts"
import { BlogSection } from "./BlogSection"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, BookOpen, Users, Award, TrendingUp, CircleCheckBig } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Chatbot from "../chat/Chatbot"

export async function generateMetadata() {
  return {
    title: 'Blogs | Wahome Premium Pigs Knowledge Hub - Increase your pig rearing knowledge and our latest updates on sustainable pig farming',
    description: 'Your leading source for premium pig breeds in Kenya and quality pork suppliers. Get scalable pig farming tips make profits with our expert advice and resources.',
  }
}

// Educational Data
const breedInfo = {
  Piglets: {
    description:
      "Young pigs under 8 weeks of age, typically weaned from their mothers. These are the foundation of any pig farming operation and require special care and nutrition for optimal growth.",
    traits: [
      { name: "Age Range", value: "0-8 weeks" },
      { name: "Weight Range", value: "1.5-20 kg" },
      { name: "Feed Type", value: "Starter feed (20-24% protein)" },
      { name: "Housing", value: "Warm, draft-free environment" },
      { name: "Vaccination", value: "Iron shots, deworming" },
    ],
  },
  Gilts: {
    description:
      "Young female pigs that have not yet farrowed (given birth). They represent the future breeding stock and are carefully selected based on genetic potential and physical characteristics.",
    traits: [
      { name: "Age Range", value: "4-8 months" },
      { name: "Weight Range", value: "60-120 kg" },
      { name: "Breeding Age", value: "7-8 months" },
      { name: "Feed Type", value: "Grower feed (16-18% protein)" },
      { name: "Selection Criteria", value: "12+ teats, good conformation" },
    ],
  },
  Sows: {
    description:
      "Mature female pigs that have farrowed at least once. They are the backbone of breeding operations, responsible for producing and nurturing the next generation of pigs.",
    traits: [
      { name: "Age Range", value: "12+ months" },
      { name: "Weight Range", value: "150-250 kg" },
      { name: "Gestation Period", value: "114 days (3 months, 3 weeks, 3 days)" },
      { name: "Litter Size", value: "8-12 piglets" },
      { name: "Productive Life", value: "4-6 years" },
    ],
  },
  Boars: {
    description:
      "Mature male pigs used for breeding purposes. They contribute 50% of the genetics to offspring and must be carefully selected for superior traits and breeding performance.",
    traits: [
      { name: "Age Range", value: "8+ months" },
      { name: "Weight Range", value: "200-350 kg" },
      { name: "Breeding Ratio", value: "1 boar : 15-20 sows" },
      { name: "Service Life", value: "3-5 years" },
      { name: "Key Traits", value: "Fertility, libido, genetic merit" },
    ],
  },
}

const farmingTips = [
  {
    title: "Proper Nutrition Management",
    content:
      "Provide balanced feed with appropriate protein levels for each growth stage. Piglets need 20-24% protein, growers 16-18%, and finishers 14-16%. Always ensure fresh, clean water is available.",
    image:
      "https://images.unsplash.com/photo-1560493676-04071c5f467b",
    icon: <span className="text-xl sm:text-2xl">🌾</span>,
  },
  {
    title: "Disease Prevention",
    content:
      "Implement strict biosecurity measures, maintain vaccination schedules, and ensure proper hygiene. Regular health checks and quarantine procedures for new animals are essential.",
    image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
    icon: <span className="text-xl sm:text-2xl">🏥</span>,
  },
  {
    title: "Housing & Environment",
    content:
      "Provide adequate space, proper ventilation, and comfortable temperatures. Clean, dry bedding and appropriate flooring prevent injuries and disease transmission.",
    image: "https://images.unsplash.com/photo-1657856636736-e93a84e63673?w=600",
    icon: <span className="text-xl sm:text-2xl">🏠</span>,
  },
]

const breedImages = {
  Landrace:
    "https://images.unsplash.com/photo-1682525269849-f0816cab7716",
  Duroc:
    "https://media.istockphoto.com/id/515449339/photo/pig-farm-in-highland-scotland.jpg?s=612x612&w=0&k=20&c=C4Bc0IItIYvlxs2I7HjwikikaifmavtdxGxArgRFgLo=",
  Hampshire:
    "https://media.istockphoto.com/id/89915541/photo/freerange-pig-hampshire-england.jpg?s=612x612&w=0&k=20&c=D5tww5eZK5r7nQetutRX0h_Z3s-VRQ9XE39ErMS-rUo=",
  Pietrain:
    "https://media.istockphoto.com/id/488596864/photo/happy-fatty.jpg?s=612x612&w=0&k=20&c=vvbE-i6YLmYCHvbQQ67As4Obs8lYNwLcATUw4M-bYIs=",
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [activeTab, setActiveTab] = useState("articles")

  const categories = [...new Set(blogPosts.map((post) => post.category))]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Chatbot />
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-4 mt-6">
            <Badge className="bg-white/20 text-white border-white/30 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
              Knowledge Hub
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
            Pig Farming Knowledge Center
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
            Expert insights, practical guides, and comprehensive resources for successful pig farming operations in Kenya
          </p>

          {/* Navigation Tabs */}
          <div className="max-w-md mx-auto mb-6 sm:mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("articles")}
                  className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === "articles" ? "bg-white text-green-700 shadow-sm" : "text-white hover:bg-white/10"
                  }`}
                >
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Articles
                </button>
                <button
                  onClick={() => setActiveTab("guides")}
                  className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === "guides" ? "bg-white text-green-700 shadow-sm" : "text-white hover:bg-white/10"
                  }`}
                >
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Guides
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar - Only show for articles */}
          {activeTab === "articles" && (
            <div className="max-w-xl sm:max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles by title, content or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 pr-4 py-4 sm:py-6 text-sm sm:text-lg border-0 bg-white/90 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-white/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm sm:text-base"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Articles Tab Content */}
        {activeTab === "articles" && (
          <>
            {/* Category Filter */}
            <div className="mb-8 sm:mb-12 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-green-100">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2 sm:mr-3"></span>
                Browse by Category
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Badge
                  variant={selectedCategory === "" ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 text-xs sm:text-sm ${
                    selectedCategory === ""
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "hover:bg-green-50 border-green-200 text-green-700"
                  }`}
                  onClick={() => setSelectedCategory("")}
                >
                  All Categories
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 text-xs sm:text-sm ${
                      selectedCategory === category
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "hover:bg-green-50 border-green-200 text-green-700"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Blog Sections */}
            <BlogSection featuredPosts={featuredPosts} regularPosts={regularPosts} />

            {/* No Results */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="mx-auto w-16 sm:w-24 h-16 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Search className="h-8 sm:h-12 w-8 sm:w-12 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">No articles found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                  We couldn't find any articles matching your search. Try different keywords or categories.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("")
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm text-sm sm:text-base"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Guides Tab Content */}
        {activeTab === "guides" && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
              {[
                { icon: Users, label: "Pig Categories", value: "4", color: "text-green-600" },
                { icon: Award, label: "Pig Breeds", value: "5+", color: "text-amber-600" },
                { icon: TrendingUp, label: "Farming Tips", value: "Expert", color: "text-green-600" },
                { icon: BookOpen, label: "Guides", value: "Complete", color: "text-amber-600" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="text-center p-4 sm:p-6 border-0 shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="bg-gray-50 w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <stat.icon className={`h-6 sm:h-8 w-6 sm:w-8 ${stat.color}`} />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pig Categories Information */}
            <section className="mb-16 sm:mb-20 relative">
              <div className="absolute inset-0 bg-green-50 rounded-3xl -z-10"></div>
              <div className="px-4 sm:px-6 md:px-12 py-8 sm:py-12">
                <div className="text-center mb-8 sm:mb-12">
                  <Badge className="mb-3 sm:mb-4 bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                    Educational Guide
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-3 sm:mb-4">
                    Understanding Pig Categories
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    Pigs are categorized based on their age, gender, and reproductive status. Understanding these
                    categories is essential for proper management and breeding programs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {Object.keys(breedInfo).map((category) => (
                    <Card
                      key={category}
                      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 group"
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center mb-4 sm:mb-6">
                          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center mr-3 sm:mr-4 bg-green-100 group-hover:bg-green-200 transition-colors">
                            <span className="text-xl sm:text-2xl font-bold text-green-700">{category[0]}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{category}</h3>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                          {breedInfo[category].description}
                        </p>

                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                          <h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-green-600" />
                            Key Characteristics
                          </h4>
                          <ul className="space-y-2 sm:space-y-3">
                            {breedInfo[category].traits.map((trait, index) => (
                              <li key={index} className="flex items-start">
                                <CircleCheckBig
                                  className="flex shrink-0 mt-0.5 sm:mt-1 text-amber-700 mr-2 sm:mr-3"
                                  size={14}
                                />
                                <div>
                                  <span className="font-semibold text-gray-700 text-xs sm:text-sm">
                                    {trait.name}:
                                  </span>{" "}
                                  <span className="text-gray-600 text-xs sm:text-sm">{trait.value}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Farming Tips Section */}
            <section className="mb-16 sm:mb-20">
              <div className="text-center mb-8 sm:mb-12">
                <Badge className="mb-3 sm:mb-4 bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                  Expert Tips
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Professional Pig Farming Tips
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  At Wahome Premium Pigs, we follow these professional tips to ensure our pigs are healthy and maximize
                  farm productivity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {farmingTips.map((tip, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 group"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                        <Image
                          src={tip.image || "/placeholder.svg"}
                          alt={tip.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{tip.title}</h3>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 relative">
                      <div className="absolute -top-6 sm:-top-8 right-4 sm:right-6 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
                        {tip.icon}
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-4 sm:pt-6">
                        {tip.content}
                      </p>
                    </CardContent>
                    <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                      <Button
                        variant="outline"
                        className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 font-medium bg-transparent text-xs sm:text-sm"
                        asChild
                      >
                        <Link href="/contact">Get Expert Consultation</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            {/* Breed Comparison */}
            <section className="mb-12 sm:mb-16">
              <div className="text-center mb-8 sm:mb-12">
                <Badge className="mb-3 sm:mb-4 bg-green-100 text-green-800 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                  Breed Guide
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Popular Pig Breeds
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Explore the characteristics and performance of different pig breeds to find the best fit for your farm.
                </p>
              </div>

              <Tabs defaultValue="Large White" className="w-full">
                <div className="bg-green-100 p-1 rounded-full mb-6 sm:mb-8 max-w-4xl mx-auto">
                  <TabsList className="w-full bg-transparent justify-center gap-1 p-1 flex-wrap">
                    {["Large White", "Landrace", "Duroc", "Hampshire", "Pietrain"].map((breed) => (
                      <TabsTrigger
                        key={breed}
                        value={breed}
                        className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-200 font-medium"
                      >
                        {breed}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <TabsContent value="Large White" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
                  <Card className="bg-white border-0 shadow-lg rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative">
                          <div className="relative h-48 sm:h-64 md:h-full w-full">
                            <Image
                              src="https://media.istockphoto.com/id/1919843360/photo/large-white.jpg?s=612x612&w=0&k=20&c=TsI1OxSPEc5LJJeBQP14REyrsJak-FxYOLhZ-i_ZLFw="
                              alt="Large White pig breed"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t"></div>
                            <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-sm">
                                Large White
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="md:w-2/3 p-4 sm:p-6 md:p-8">
                          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                            The Large White is one of the most common and influential pig breeds worldwide. Known for
                            their white color, erect ears, and dished face, they're prized for their high fertility,
                            good mothering ability, and excellent growth rate.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                              <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                <span className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-green-200 flex items-center justify-center mr-1.5 sm:mr-2">
                                  <span className="text-green-700 text-xs">1</span>
                                </span>
                                Characteristics
                              </h4>
                              <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                  White color with pink skin
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                  Erect ears and dished face
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                  Long body with deep sides
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                  Good leg strength
                                </li>
                              </ul>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                              <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                <span className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-green-200 flex items-center justify-center mr-1.5 sm:mr-2">
                                  <span className="text-green-700 text-xs">2</span>
                                </span>
                                Performance
                              </h4>
                              <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                  Litter size: 10-12 piglets
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                  Growth rate: 0.8-1.0 kg/day
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                  Feed conversion: 2.5-3.0
                                </li>
                                <li className="flex items-center">
                                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                  Lean meat: 60-62%
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {["Landrace", "Duroc", "Hampshire", "Pietrain"].map((breed) => (
                  <TabsContent
                    key={breed}
                    value={breed}
                    className="mt-4 focus-visible:outline-none focus-visible:ring-0"
                  >
                    <Card className="bg-white border-0 shadow-lg rounded-xl overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative">
                            <div className="relative h-48 sm:h-64 md:h-full w-full">
                              <Image
                                src={breedImages[breed] || "/placeholder.svg"}
                                alt={`${breed} pig breed`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t"></div>
                              <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-sm">
                                  {breed}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="md:w-2/3 p-4 sm:p-6 md:p-8">
                            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                              {breed === "Landrace"
                                ? "The Landrace is known for its long body and excellent bacon production. These white pigs have distinctive drooping ears and are valued for their prolificacy and mothering abilities."
                                : breed === "Duroc"
                                  ? "The Duroc is a red-colored breed known for its hardiness and excellent growth rate. They produce high-quality meat with good marbling and are often used in crossbreeding programs."
                                  : breed === "Hampshire"
                                    ? "The Hampshire is a black pig with a distinctive white belt around the shoulders and front legs. They're known for producing lean meat with excellent muscle quality."
                                    : "The Pietrain is a heavily muscled breed with distinctive black spots on a white background. They're known for their exceptional carcass quality and high lean meat percentage."}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                              <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                  <span className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-green-200 flex items-center justify-center mr-1.5 sm:mr-2">
                                    <span className="text-green-700 text-xs">1</span>
                                  </span>
                                  Characteristics
                                </h4>
                                <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                                  {breed === "Landrace" ? (
                                    <>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        White color with long body
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Drooping ears
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Excellent length of side
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Calm temperament
                                      </li>
                                    </>
                                  ) : breed === "Duroc" ? (
                                    <>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Red to reddish-brown color
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Drooping ears
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Muscular build
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Hardy constitution
                                      </li>
                                    </>
                                  ) : breed === "Hampshire" ? (
                                    <>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Black with white belt
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Erect ears
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Muscular build
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Active temperament
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        White with black spots
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Erect ears
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Extremely muscular
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Compact body
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                                <h4 className="font-semibold text-green-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                                  <span className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-green-200 flex items-center justify-center mr-1.5 sm:mr-2">
                                    <span className="text-green-700 text-xs">2</span>
                                  </span>
                                  Performance
                                </h4>
                                <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                                  {breed === "Landrace" ? (
                                    <>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Litter size: 12-14 piglets
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Growth rate: 0.7-0.9 kg/day
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Feed conversion: 2.6-3.1
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Lean meat: 58-60%
                                      </li>
                                    </>
                                  ) : breed === "Duroc" ? (
                                    <>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Litter size: 8-10 piglets
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Growth rate: 0.9-1.1 kg/day
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Feed conversion: 2.5-2.8
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Meat quality: Excellent marbling
                                      </li>
                                    </>
                                  ) : breed === "Hampshire" ? (
                                    <>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Litter size: 8-10 piglets
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Growth rate: 0.7-0.9 kg/day
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Feed conversion: 2.7-3.0
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Lean meat: 62-65%
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Litter size: 8-9 piglets
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Growth rate: 0.7-0.8 kg/day
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Feed conversion: 2.8-3.2
                                      </li>
                                      <li className="flex items-center">
                                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
                                        Lean meat: 65-68%
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
