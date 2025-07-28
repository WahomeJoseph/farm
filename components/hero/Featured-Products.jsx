import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Phone, Eye, Truck, Shield, Award, Star, Clock } from "lucide-react"
import { Headphones } from "lucide-react"
import { Headset } from "lucide-react"

const products = [
    {
        name: "Healthy Piglets",
        description: "8-10 weeks old, fully weaned, vaccinated & dewormed. Perfect for starting your pig farming journey.",
        price: "From KES 5,000",
        originalPrice: "KES 6,000",
        image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
        badge: "Best Seller",
        badgeColor: "bg-amber-600",
        features: ["Vaccinated", "Dewormed", "Health Certificate", "8-10 Weeks Old"],
        inStock: true,
        rating: 4.9,
        reviews: 127,
    },
    {
        name: "Breeding Gilts",
        description:
            "4-6 months old, ready for first breeding. DOC certified with superior genetics for quality offspring.",
        price: "From KES 21,000",
        image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
        badge: "Premium Quality",
        badgeColor: "bg-green-700",
        features: ["DOC Certified", "Breeding Ready", "Superior Genetics", "4-6 Months"],
        inStock: true,
        rating: 4.8,
        reviews: 89,
    },
    {
        name: "Quality Boars",
        description:
            "Proven breeding boars with excellent genetics. High fertility rates and disease resistance guaranteed.",
        price: "From KES 42,000",
        image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
        badge: "Elite Genetics",
        badgeColor: "bg-amber-600",
        features: ["Proven Genetics", "High Fertility", "Disease Resistant", "Breeding Records"],
        inStock: true,
        rating: 5.0,
        reviews: 34,
    },
    {
        name: "Breeding Sows",
        description:
            "Experienced breeding sows with excellent mothering abilities. Perfect for expanding your breeding program.",
        price: "From KES 38,000",
        image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103",
        badge: "Proven Mothers",
        badgeColor: "bg-green-700",
        features: ["Excellent Mothers", "Proven Track Record", "High Litter Size", "Gentle Temperament"],
        inStock: true,
        rating: 4.9,
        reviews: 56,
    },
    {
        name: "Organic Manure",
        description: "Premium organic fertilizer from our farm. Rich in nutrients, perfect for crops and gardens.",
        price: "KES 500/bag",
        originalPrice: "KES 700/bag",
        image:
            "https://media.istockphoto.com/id/1488312382/photo/a-manure-pile-in-the-country.jpg?s=612x612&w=0&k=20&c=4mVqE1JvZHiFq6aRRm80Q-pqqM9HePyxWs7VKFhdDc4=",
        badge: "Eco-Friendly",
        badgeColor: "bg-green-600",
        features: ["100% Organic", "Nutrient Rich", "Crop Tested", "50kg Bags"],
        inStock: true,
        rating: 4.7,
        reviews: 203,
    },
    {
        name: "Farm Consultation",
        description: "Expert consultation services for pig farming. Get personalized advice from our experienced team.",
        price: "Free/visit",
        image: "/placeholder.svg?height=300&width=400&text=Farm+Consultation",
        badge: "Expert Service",
        badgeColor: "bg-amber-600",
        features: ["On-site Visit", "Expert Advice", "Custom Solutions", "Follow-up Support"],
        inStock: true,
        rating: 4.9,
        reviews: 78,
    },
]

export default function FeaturedProducts() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">Our Products & Services</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-aos="fade-right" data-aos-delay="300">Premium Livestock & Farm Solutions</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed" 
                    data-aos="fade-left" data-aos-delay="300">
                        From healthy piglets to expert consultation, we provide everything you need for successful pig farming in
                        Kenya. All products come with health guarantees and nationwide delivery.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {products.map((product, index) => (
                        <Card
                            key={index}
                            className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-0 shadow-lg"
                            data-aos="fade-up" data-aos-delay="300"
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={400}
                                    height={280}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Badges */}
                                <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white font-semibold`}>
                                    {product.badge}
                                </Badge>

                                {product.originalPrice && (
                                    <Badge className="absolute top-4 right-4 bg-red-600 text-white font-semibold">
                                        Save{" "}
                                        {Math.round(
                                            ((Number.parseInt(product.originalPrice.replace(/[^\d]/g, "")) -
                                                Number.parseInt(product.price.replace(/[^\d]/g, ""))) /
                                                Number.parseInt(product.originalPrice.replace(/[^\d]/g, ""))) *
                                            100,
                                        )}
                                        %
                                    </Badge>
                                )}

                                {/* Stock Status */}
                                <div className="absolute bottom-4 left-4">
                                    <Badge className="bg-green-600 text-white">✓ In Stock</Badge>
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 rounded-full">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                                        <ShoppingCart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <CardContent className="p-6">
                                {/* Rating & Reviews */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-amber-600 text-amber-600" />
                                            <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{product.description}</p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.features.slice(0, 3).map((feature, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs border-green-200 text-green-700">
                                            {feature}
                                        </Badge>
                                    ))}
                                    {product.features.length > 5 && (
                                        <Badge variant="outline" className="text-xs border-gray-200 text-gray-500">
                                            +{product.features.length - 3} more
                                        </Badge>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-2xl font-bold text-green-700">{product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 mb-4">
                                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold" asChild>
                                        <Link href="/shop">
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Order Now
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-amber-600 text-amber-800 hover:bg-amber-600/10 bg-transparent"
                                        asChild
                                    >
                                        <Link href="tel:+254711430249">
                                            <Phone className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>

                                {/* Trust Indicators */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Headset className="h-3 w-3 text-green-600" />
                                        <span>24/7 Consultation</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Shield className="h-3 w-3 text-green-600" />
                                        <span>Health Guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Award className="h-3 w-3 text-green-600" />
                                        <span>Certified</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
