import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Eye, Heart } from "lucide-react"

export const BlogCard = ({ post, featured = false }) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1 border-0 bg-white rounded-2xl">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg?height=200&width=400&text=Blog+Image"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div> */}

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white border-0 font-medium px-3 py-1">
            {post.category}
          </Badge>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-amber-600 text-white hover:bg-amber-700 border-0 font-medium px-3 py-1 shadow-lg">
              ⭐ Featured
            </Badge>
          </div>
        )}

        {/* Reading Stats Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white text-sm">
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
            <Eye className="h-3 w-3" />
            <span>{post.views || "1.2k"}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
            <Heart className="h-3 w-3" />
            <span>{post.likes || "24"}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Title and Excerpt */}
        <Link href={`/blog/${post.id}`} className="block group/link">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover/link:text-green-600 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100 transition-colors"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            href={`/blog/${post.id}`}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-all duration-300 group/btn"
          >
            <span>Read Full Article</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </CardContent>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-green-200 transition-all duration-300 pointer-events-none"></div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-green-400/5 via-transparent to-amber-400/5"></div>
    </Card>
  )
}
