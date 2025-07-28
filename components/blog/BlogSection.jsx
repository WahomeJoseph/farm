import { BlogCard } from "./BlogCard"
import { ArrowRight } from "lucide-react"

export const BlogSection = ({ featuredPosts, regularPosts }) => {
    return (
        <>
            {/* Featured Articles */}
            {featuredPosts.length > 0 && (
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-4"></div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">Featured Articles</h2>
                                <p className="text-gray-600">Hand-picked content from our experts</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium px-4 py-2 rounded-full hover:bg-green-50 transition-all duration-300 group">
                            <span>View all featured</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {featuredPosts.map((post) => (
                            <BlogCard key={post.id} post={post} featured />
                        ))}
                    </div>
                </section>
            )}

            {/* Regular Articles */}
            {regularPosts.length > 0 && (
                <section className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-green-500 rounded-full mr-4"></div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                                    {featuredPosts.length > 0 ? "Latest Articles" : "All Articles"}
                                </h2>
                                <p className="text-gray-600">Stay updated with the latest insights</p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium px-4 py-2 rounded-full hover:bg-green-50 transition-all duration-300 group">
                            <span>View all articles</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}
