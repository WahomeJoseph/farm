"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Gift, Bell, Users } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail("")
  }

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Content */}
                <div className="p-8 md:p-12">
                  <Badge className="mb-4 bg-green-100 text-green-800 px-3 py-1">Join Our Community</Badge>

                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stay Updated with Wahome Farm</h2>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Get exclusive farming tips, seasonal recipes, product updates, and special offers delivered to your
                    inbox. Join 1,000+ farmers already in our community!
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-8">
                    {[
                      { icon: Gift, text: "Exclusive discounts and early access" },
                      { icon: Bell, text: "New product announcements" },
                      { icon: Users, text: "Farming tips from experts" },
                    ].map((benefit, index) => {
                      const Icon = benefit.icon
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Icon className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-gray-700">{benefit.text}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Newsletter Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold"
                        disabled={isSubmitted}
                      >
                        {isSubmitted ? "Subscribed!" : "Subscribe"}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
                  </form>

                  {isSubmitted && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 text-sm font-medium">
                        ✓ Thank you! You've been subscribed to our newsletter.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Side - Visual */}
                <div className="bg-gradient-to-br from-green-700 to-green-800 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">1,000+ Subscribers</h3>
                    <p className="text-green-100 leading-relaxed">
                      Join farmers across Kenya who trust our expertise and get the latest updates on sustainable pig
                      farming.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold">Weekly</div>
                        <div className="text-green-200 text-sm">Updates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">Expert</div>
                        <div className="text-green-200 text-sm">Tips</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
