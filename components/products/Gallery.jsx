"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ChevronRight, Info, Award, Leaf, CircleCheckBig } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Loader } from "../loader/Loader"
import { GalleryCard } from "./GalleryCard"
import Chatbot from "../chat/Chatbot"

export default function Gallery() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")
    const [isScrolled, setIsScrolled] = useState(false)
    const categories = ["All", "Piglets", "Gilts", "Boars", "Sows"]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true)
                const result = await fetch('/api/products', { cache: 'no-store' })
                const data = await result.json()
                setProducts(data.products.slice(0, 23) || [])

            } catch (error) {
                console.error('Error fetching products:', error)
                setError('Failed to fetch products!')
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const breedImages = {
        LargeWhite: "/images/large-white.png",
        Landrace: "https://media.istockphoto.com/id/177330635/photo/grazing-pigs.jpg?s=612x612&w=0&k=20&c=nS879qGPmji6OTszvSLGw4HnN-MHkGpCq37CKzTaW04=",
        Duroc: "https://media.istockphoto.com/id/518170848/photo/duroc-pig.jpg?s=612x612&w=0&k=20&c=z_vRF8sOD0ZFvoLS8SiCOUTA70b0BRL9LHTjyyGAspw=",
        Hampshire: "https://media.istockphoto.com/id/1388917287/photo/piglets-farm-life.jpg?s=612x612&w=0&k=20&c=klHekk-wxbzsQY8F5CK3msot48DuPLGMnUgiaYd_46s=",
        Pietrain: "https://media.istockphoto.com/id/1365154357/photo/young-spotted-female-pietrain-pig-with-black-spots-on-farm-field.jpg?s=612x612&w=0&k=20&c=nhL0zrlkkWMItM03jrFdYzu81yMaw0E5Txr8mFhxwWY=",
    }

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = activeCategory === "All" || product.category === activeCategory
        return matchesSearch && matchesCategory
    })

    // Get featured products
    const featuredProducts = products.filter((product) => product.featured)
    const farmingTips = [
        {
            title: "Optimal Feeding Practices",
            content:
                "Feed pigs twice daily with balanced rations containing 16-18% protein for optimal growth. Adjust feed based on age, weight, and production stage.",
            image: "https://media.istockphoto.com/id/588618788/photo/mammal.jpg?s=612x612&w=0&k=20&c=bvdVS08Vgd1C0GB7urfi5HmimxGzcTKz-3bPtb06xLo=",
            icon: <Leaf className="h-10 w-10 text-green-500" />,
        },
        {
            title: "Housing Requirements",
            content:
                "Provide at least 8 sq.ft per pig in growing pens with proper ventilation and dry bedding. Ensure adequate drainage and temperature control.",
            image: "https://media.istockphoto.com/id/488663598/photo/the-farm-pigs.jpg?s=612x612&w=0&k=20&c=MSTyo9zqkLnm4NrRBEQXnZnXff8D93MvfV7WFmykUIg=",
            icon: <Info className="h-10 w-10 text-green-500" />,
        },
        {
            title: "Disease Prevention",
            content:
                "Implement biosecurity measures including foot baths and quarantine new animals for 2 weeks. Regular health checks and vaccinations are essential.",
            image: "https://media.istockphoto.com/id/1178892250/photo/veterinarian-at-pig-farm-with-tablet-computer.jpg?s=612x612&w=0&k=20&c=XmCxT8tr0uMV00ApbwdlCHCZF1E8mroogxMRZLTvYbc=",
            icon: <Award className="h-10 w-10 text-green-500" />,
        },
    ]

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "KES",
            maximumFractionDigits: 0,
        }).format(price)
    }

    // Breed information
    const breedInfo = {
        Piglets: {
            traits: [
                { name: "Average Weight", value: "20-35kg" },
                { name: "Growth Rate", value: "Fast (0.5-0.8kg/day)" },
                { name: "Temperament", value: "Playful and curious" },
                { name: "Best For", value: "Starter stock for fattening" },
            ],
            description:
                "Piglets are young pigs typically under 3 months old. They require special care including proper temperature control, high-protein feed, and protection from disease.",
        },
        Gilts: {
            traits: [
                { name: "Average Weight", value: "120-150kg" },
                { name: "Growth Rate", value: "Moderate (0.6-0.7kg/day)" },
                { name: "Temperament", value: "Generally docile" },
                { name: "Best For", value: "First-time breeding stock" },
            ],
            description:
                "Gilts are young female pigs that haven't yet had their first litter. They're typically 6-8 months old and are selected for their growth performance and maternal traits.",
        },
        Boars: {
            traits: [
                { name: "Average Weight", value: "200-300kg" },
                { name: "Growth Rate", value: "Moderate to slow" },
                { name: "Temperament", value: "Can be territorial" },
                { name: "Best For", value: "Breeding programs, siring" },
            ],
            description:
                "Boars are intact male pigs used for breeding. One boar can service 15-20 sows. They require special housing and handling due to their size and temperament.",
        },
        Sows: {
            traits: [
                { name: "Average Weight", value: "180-250kg" },
                { name: "Litter Size", value: "10-14 piglets" },
                { name: "Temperament", value: "Generally calm" },
                { name: "Best For", value: "Farrowing, commercial production" },
            ],
            description:
                "Sows are mature female pigs that have had at least one litter. They're the backbone of pig production, selected for their mothering ability, milk production, and litter size.",
        },
    }

    return (
        <div id="gallery" className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Chatbot />
            <div className="relative h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="/video/aerial-pig.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-[3rem] font-bold capitalize text-white mb-0 drop-shadow-lg">Wahome premium Pig Farm Gallery</h1>
                    <p className="text-[1.2rem] font-light text-white max-w-2xl mx-auto mb-8 drop-shadow-md">
                        Discover our premium pig breeds, learn about different categories, and get expert farming tips
                    </p>
                </div>
            </div>

            {/* Sticky Search and Filter Bar */}
            <div
                className={cn(
                    "sticky top-0 z-40 w-full bg-white shadow-md transition-all duration-300",
                    isScrolled ? "py-3" : "py-5",
                )}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-600" />
                            <Input
                                type="text"
                                placeholder="Search pig breeds..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 rounded-full shadow-sm"
                                aria-label="Search pig breeds or products"
                            />
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={activeCategory === category ? "default" : "outline"}
                                    size="sm"
                                    className={cn(
                                        activeCategory === category
                                            ? "bg-green-600 text-white hover:bg-green-700"
                                            : "border-green-100 text-green-600 hover:bg-green-100 hover:border-green-300",
                                        "rounded-full transition-all duration-300",
                                    )}
                                    onClick={() => setActiveCategory(category)}>
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8" role="alert">
                        <p className="font-medium">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                <section className="mb-4">
                    <div className="flex items-center mb-8">
                        <div className="h-1 bg-green-200 flex-grow rounded-full"></div>
                        <h2 className="text-2xl font-bold text-gray-800 px-4">Our Pig Breeds & Products</h2>
                        <div className="h-1 bg-green-200 flex-grow rounded-full"></div>
                    </div>

                    {loading ? <Loader /> : (
                        filteredProducts.length === 0 ? (
                            <p className='text-center text-red-600'>No products found!</p>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-12 sm:gap-8 sm:p-8 mt-0 md:p-12'>
                                {filteredProducts.map((item) => (
                                    <GalleryCard key={item._id} item={item} />
                                ))}
                            </div>
                        )
                    )}
                </section>

                <div className="flex items-center justify-center">
                    <Button
                        asChild
                        size="lg"
                        className="mt-0 bg-white flex justify-center items-center gap-2 hover:animate-bounce hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg text-green-600 w-full sm:w-auto">
                        <Link href='/blogs'>Explore More</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
