"use client"

import { useState, useRef, useEffect } from "react"
import { toast, Toaster } from "sonner"
import { Card, CardContent, CardTitle, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Send, CircleUserRound, MessageCircle, Minimize2 } from "lucide-react"
import { RiRobot3Fill } from "react-icons/ri"
import { Avatar } from "../ui/avatar"
import { cn } from "@/lib/utils"

export default function Chatbot() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async () => {
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    if (!input.trim()) {
      toast.error("Chat input cannot be empty", { duration: 3000 })
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.log("Error occurred communicating with Egan")
      toast.error("Error occurred communicating with Egan", { duration: 3000 })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <>
      <Toaster />

      {!openChat && (
        <button
          onClick={() => setOpenChat(true)}
          className="fixed right-4 bottom-20 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all">
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Panel */}
      {openChat && (
        <div className="fixed right-4 bottom-24 z-50 w-80 h-[70vh] transition-all duration-300">
          <Card className="w-full h-full border-green-200 bg-gradient-to-b from-green-50 to-white flex flex-col">
            <CardHeader className="bg-green-700 text-white rounded-t-lg py-3 px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl flex items-center gap-2">I'm Egan</CardTitle>
                </div>
                <button onClick={() => setOpenChat(false)} className="text-green-100 hover:text-white">
                  <Minimize2 />
                </button>
              </div>
              <p className="text-green-100 capitalize text-sm">Your virtual farming assistant</p>
            </CardHeader>

            <CardContent className="p-0 flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 p-4 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                      <div className="flex items-start gap-2 max-w-[80%]">
                        {message.role === "assistant" && (
                          <Avatar className="flex-shrink-0 items-center justify-center h-8 w-8 bg-green-700">
                            <RiRobot3Fill size={18} />
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "rounded-lg p-3 break-words overflow-wrap-anywhere",
                            message.role === "user"
                              ? "bg-green-600 text-white"
                              : "bg-green-100 text-green-900 border border-green-200",
                          )}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        {message.role === "user" && (
                          <Avatar className="flex-shrink-0 items-center justify-center h-8 w-8 bg-green-500">
                            <CircleUserRound size={18} />
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Loading indicator */}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2 max-w-[80%]">
                        <Avatar className="flex-shrink-0 items-center justify-center h-8 w-8 bg-green-700">
                          <RiRobot3Fill size={18} />
                        </Avatar>
                        <div className="bg-green-100 text-green-900 border border-green-200 rounded-lg p-3">
                          <div className="flex space-x-2">
                            <div
                              className="w-2 h-2 rounded-full bg-green-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-green-500 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-green-600 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-4 border-t border-green-200 bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about Wahome Premium Pigs"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-green-200 focus-visible:ring-green-500"
                    disabled={loading}
                  />
                  <Button onClick={handleSend} className="bg-green-700 hover:bg-green-800" disabled={loading}>
                    {loading ? (
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="mt-2 text-xs text-green-600">
                  <p>Egan is here to help answers any queries about pig farming</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
