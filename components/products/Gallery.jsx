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

                <section className="mb-20">
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
                                    <GalleryCard key={item._id} item={item}/>
                                ))}
                            </div>
                        )
                    )}
                </section>

                {/* Featured Products Carousel */}
                {!loading && featuredProducts.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                <span className="inline-block bg-green-100 text-green-800 px-2 mr-2 rounded">Featured</span>
                                Premium Selections
                            </h2>
                            <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                View All <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredProducts.slice(0, 3).map((product) => (
                                <Card
                                    key={product.id}
                                    className="group overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-0">
                                    <div className="relative">
                                        <div className="absolute top-2 right-2 z-10">
                                            <Badge className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1">
                                                Featured
                                            </Badge>
                                        </div>
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <Badge
                                                    variant="outline"
                                                    className="mb-2 bg-green-50 text-green-700 border-green-200 font-normal"
                                                >
                                                    {product.category}
                                                </Badge>
                                                <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4">{product.description}</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center">
                                                <span className="font-medium mr-1">Weight:</span> {product.weight}
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium mr-1">Age:</span> {product.age}
                                            </div>
                                        </div>
                                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">View Details</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Pig Categories Information with Visual Enhancement */}
                <section className="mb-20 relative">
                    <div className="absolute inset-0 bg-green-50 rounded-3xl -z-10"></div>
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5 rounded-3xl -z-10"></div>
                    <div className="px-6 py-12 md:p-12">
                        <h2 className="text-3xl font-bold text-center text-green-700 mb-4 slide-in-right">Understanding Pig Categories</h2>
                        <p className="text-gray-700 mb-8 text-center drop-shadow-md font-medium max-w-3xl mx-auto slide-in-left">
                            Pigs are categorized based on their age, gender, and reproductive status. Understanding these categories
                            is essential for proper management and breeding programs.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {Object.keys(breedInfo).map((category) => (
                                <div
                                    key={category}
                                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 focus-in">
                                    <div className="flex items-center mb-4">
                                        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-green-100")}>
                                            <span
                                                className={cn("text-2xl font-bold text-green-700")}>
                                                {category[0]}
                                            </span>
                                        </div>
                                        <h3
                                            className={cn(
                                                "text-xl font-bold text-green-600")}>
                                            {category}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 text-justify leading-relaxed mb-4">{breedInfo[category].description}</p>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-700 mb-2">Key Characteristics:</h4>
                                        <ul className="space-y-2">
                                            {breedInfo[category].traits.map((trait, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="">
                                                        <CircleCheckBig className="flex shrink-0 mt-1 text-amber-700 mr-2" size={16} />
                                                    </span>
                                                    <div>
                                                        <span className="font-semi-bold text-gray-700">{trait.name}:</span>{" "}
                                                        <span className="font-light text-gray-600">{trait.value}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Farming Tips Section with Enhanced Cards */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold capitalize text-gray-800 mb-1">Tips for pig farming</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            At Wahome Premium Pigs, We follow these professional tips to ensure our pigs are healthy hence maximize the farm productivity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {farmingTips.map((tip, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden bg-[#f1f1f1f] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-0">
                                <CardHeader className="p-0">
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={tip.image || "/placeholder.svg"}
                                            alt={tip.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-4">
                                            <h3 className="text-xl font-bold text-white">{tip.title}</h3>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 relative">
                                    <div className="absolute -top-8 right-6 w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                                        {tip.icon}
                                    </div>
                                    <p className="text-gray-600">{tip.content}</p>
                                </CardContent>
                                <CardFooter className="px-6 pb-6 pt-0">
                                    <Button
                                        variant="outline"
                                        className="w-full border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300">
                                        Learn More
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Breed Comparison with Enhanced Tabs */}
                <section className="mb-12">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Popular Pig Breeds</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore the characteristics and performance of different pig breeds to find the best fit for your farm.
                        </p>
                    </div>

                    <Tabs defaultValue="Large White" className="w-full">
                        <div className="bg-green-100 p-1 rounded-full mb-8">
                            <TabsList className="w-full bg-transparent justify-center gap-1 p-1">
                                {["Large White", "Landrace", "Duroc", "Hampshire", "Pietrain"].map((breed) => (
                                    <TabsTrigger
                                        key={breed}
                                        value={breed}
                                        className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-full px-6 py-2 transition-all duration-200">
                                        {breed}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <TabsContent value="Large White" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
                            <Card className="bg-white border-0 shadow-md rounded-xl overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="md:flex">
                                        <div className="md:w-1/3 relative">
                                            <div className="relative h-64 md:h-full w-full">
                                                <Image
                                                    src="https://media.istockphoto.com/id/1919843360/photo/large-white.jpg?s=612x612&w=0&k=20&c=TsI1OxSPEc5LJJeBQP14REyrsJak-FxYOLhZ-i_ZLFw="
                                                    alt="Large White pig breed"
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t"></div>
                                                <div className="absolute bottom-0 left-0 p-6 md:p-8">

                                                    <h3 className="text-2xl font-bold text-white drop-shadow-sm">Large White</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-2/3 p-6 md:p-8">
                                            <p className="text-gray-700 mb-6 leading-relaxed">
                                                The Large White is one of the most common and influential pig breeds worldwide. Known for their
                                                white color, erect ears, and dished face, they're prized for their high fertility, good
                                                mothering ability, and excellent growth rate.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-green-50 rounded-lg p-4">
                                                    <h4 className="font-medium text-green-800 mb-3 flex items-center">
                                                        <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center mr-2">
                                                            <span className="text-green-700 text-xs">1</span>
                                                        </span>
                                                        Characteristics
                                                    </h4>
                                                    <ul className="space-y-2 text-gray-700">
                                                        <li className="flex items-center">
                                                            <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                            White color with pink skin
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                            Erect ears and dished face
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                            Long body with deep sides
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                            Good leg strength
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="bg-green-50 rounded-lg p-4">
                                                    <h4 className="font-medium text-green-800 mb-3 flex items-center">
                                                        <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center mr-2">
                                                            <span className="text-green-700 text-xs">2</span>
                                                        </span>
                                                        Performance
                                                    </h4>
                                                    <ul className="space-y-2 text-gray-700">
                                                        <li className="flex items-center">
                                                            <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                            Litter size: 10-12 piglets
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                            Growth rate: 0.8-1.0 kg/day
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                            Feed conversion: 2.5-3.0
                                                        </li>
                                                        <li className="flex items-center">
                                                            <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
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

                        {/* Similar structure for other breed tabs */}
                        {["Landrace", "Duroc", "Hampshire", "Pietrain"].map((breed) => (
                            <TabsContent key={breed} value={breed} className="mt-4 focus-visible:outline-none focus-visible:ring-0">
                                <Card className="bg-white border-0 shadow-md rounded-xl overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="md:flex">
                                            <div className="md:w-1/3 relative">
                                                <div className="relative h-64 md:h-full w-full">
                                                    <Image
                                                        src={`${breedImages[breed]}`}
                                                        alt={`${breed} pig breed`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t"></div>
                                                    <div className="absolute bottom-0 left-0 p-6 md:p-8">

                                                        <h3 className="text-2xl font-bold text-white drop-shadow-sm">{breed}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:w-2/3 p-6 md:p-8">
                                                <p className="text-gray-700 mb-6 leading-relaxed">
                                                    {breed === "Landrace"
                                                        ? "The Landrace is known for its long body and excellent bacon production. These white pigs have distinctive drooping ears and are valued for their prolificacy and mothering abilities."
                                                        : breed === "Duroc"
                                                            ? "The Duroc is a red-colored breed known for its hardiness and excellent growth rate. They produce high-quality meat with good marbling and are often used in crossbreeding programs."
                                                            : breed === "Hampshire"
                                                                ? "The Hampshire is a black pig with a distinctive white belt around the shoulders and front legs. They're known for producing lean meat with excellent muscle quality."
                                                                : "The Pietrain is a heavily muscled breed with distinctive black spots on a white background. They're known for their exceptional carcass quality and high lean meat percentage."}
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="bg-green-50 rounded-lg p-4">
                                                        <h4 className="font-medium text-green-800 mb-3 flex items-center">
                                                            <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center mr-2">
                                                                <span className="text-green-700 text-xs">1</span>
                                                            </span>
                                                            Characteristics
                                                        </h4>
                                                        <ul className="space-y-2 text-gray-700">
                                                            {breed === "Landrace" ? (
                                                                <>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        White color with long body
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Drooping ears
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Excellent length of side
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Calm temperament
                                                                    </li>
                                                                </>
                                                            ) : breed === "Duroc" ? (
                                                                <>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Red to reddish-brown color
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Drooping ears
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Muscular build
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Hardy constitution
                                                                    </li>
                                                                </>
                                                            ) : breed === "Hampshire" ? (
                                                                <>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Black with white belt
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Erect ears
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Muscular build
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Active temperament
                                                                    </li>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        White with black spots
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Erect ears
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Extremely muscular
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Compact body
                                                                    </li>
                                                                </>
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-green-50 rounded-lg p-4">
                                                        <h4 className="font-medium text-green-800 mb-3 flex items-center">
                                                            <span className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center mr-2">
                                                                <span className="text-green-700 text-xs">2</span>
                                                            </span>
                                                            Performance
                                                        </h4>
                                                        <ul className="space-y-2 text-gray-700">
                                                            {breed === "Landrace" ? (
                                                                <>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Litter size: 12-14 piglets
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Growth rate: 0.7-0.9 kg/day
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Feed conversion: 2.6-3.1
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Lean meat: 58-60%
                                                                    </li>
                                                                </>
                                                            ) : breed === "Duroc" ? (
                                                                <>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Litter size: 8-10 piglets
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Growth rate: 0.9-1.1 kg/day
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Feed conversion: 2.5-2.8
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Meat quality: Excellent marbling
                                                                    </li>
                                                                </>
                                                            ) : breed === "Hampshire" ? (
                                                                <>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Litter size: 8-10 piglets
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Growth rate: 0.7-0.9 kg/day
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Feed conversion: 2.7-3.0
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Lean meat: 62-65%
                                                                    </li>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Litter size: 8-9 piglets
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Growth rate: 0.7-0.8 kg/day
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
                                                                        Feed conversion: 2.8-3.2
                                                                    </li>
                                                                    <li className="flex items-center">
                                                                        <span className="w-2 h-2 rounded-full bg-green-300 mr-2"></span>
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

                {/* Call to Action */}
                <section className="mb-12">
                    <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500"></div>
                        <div className="relative z-10 px-6 py-12 md:py-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Start Your Pig Farming Journey?
                            </h2>
                            <p className="text-white/90 max-w-2xl mx-auto mb-8">
                                Contact us today to learn more about our premium pig breeds and get expert advice on starting or
                                expanding your pig farm.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link href='/contact' className="bg-white text-green-600 hover:bg-green-50 rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <span className="font-semibold">Contact us</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
