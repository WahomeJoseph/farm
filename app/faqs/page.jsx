import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Chatbot from "@/components/chat/Chatbot"

export async function generateMetadata() {
  return {
    title: "FAQ | Wahome Premium Pigs",
    description: "Find answers to common questions about Wahome Premium Pigs, our products, and services.",
  }
}

export default function FAQPage() {
  const faqItems = [
    {
      question: "What types of pigs do you offer?",
      answer:
        "We offer a variety of premium pig breeds including Large White, Landrace, Duroc, Hampshire, and Pietrain. We specialize in healthy piglets (8-10 weeks old), breeding gilts (4-6 months old), and quality boars (8+ months old) with superior genetics. All our livestock come with comprehensive health certificates.",
    },
    {
      question: "Are your pigs organically raised?",
      answer:
        "Yes, absolutely! All our pigs are raised using 100% organic and sustainable farming practices. We adhere to strict animal welfare guidelines and are proudly certified by the Kenya Bureau of Standards. Our feed is natural and free from chemicals, ensuring healthier produce.",
    },
    {
      question: "Do you offer nationwide delivery in Kenya?",
      answer:
        "Yes, we provide free and reliable delivery services to all 47 counties across Kenya. Our logistics team ensures that your livestock arrives healthy, stress-free, and on time, directly to your farm. We coordinate delivery schedules to suit your convenience.",
    },
    {
      question: "Can I visit your farm for a tour?",
      answer:
        "We welcome visitors to experience sustainable farming firsthand! We offer free educational farm tours for farmers, students, and interested individuals. Tours are strictly by appointment only to ensure proper planning and a quality experience. Please contact us via phone or email to book your visit.",
    },
    {
      question: "What is your health guarantee for livestock?",
      answer:
        "We stand by the health of our livestock. All our animals come with comprehensive health certificates issued by certified veterinarians and a 30-day health guarantee from the date of delivery. We ensure all animals are vaccinated and dewormed before they leave our farm.",
    },
    {
      question: "Do you provide farming consultation services?",
      answer:
        "Yes, our team of experienced veterinarians and pig farming specialists offers expert consultation services. We provide personalized advice on various aspects of pig farming, including nutrition management, disease prevention, optimal housing solutions, and effective breeding programs to help you maximize productivity and profitability.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can easily place an order directly through our website's 'Shop' section, where you can browse available livestock and products. Alternatively, you can call us directly at +254 711 430 249. Our dedicated team will guide you through the selection, payment, and delivery process.",
    },
    {
      question: "What other farm products do you offer?",
      answer:
        "Beyond livestock, we also offer premium organic manure, a nutrient-rich fertilizer perfect for your crops and gardens. We are also expanding our range to include organic pork and artisanal pork products in the near future.",
    },
    {
      question: "What are your payment options?",
      answer:
        "We accept various secure payment methods, including mobile money (M-Pesa), bank transfers, and major credit/debit cards through our secure online payment gateway. Details will be provided during the order placement process.",
    },
    {
      question: "How do you ensure animal welfare?",
      answer:
        "Animal welfare is a top priority at Wahome Premium Pigs. Our practices include spacious, clean housing, balanced organic nutrition, regular veterinary care, and stress-free handling. We believe healthy and happy pigs lead to superior quality products.",
    },
    {
      question: "What is your commitment to sustainability?",
      answer:
        "We are Kenya's first SDGs-certified pig farm. Our commitment includes zero-waste operations, advanced water recycling systems, biogas energy production (60% of our energy), and extensive tree planting initiatives. We aim to be a model for eco-friendly agriculture.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Chatbot />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=3174&auto=format&fit=crop"
          alt="FAQ Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-green-600 text-white border-0 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            Common Questions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Find quick answers to your queries about our farm, products, and services.
          </p>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl shadow-lg border-0 px-6 py-4 hover:shadow-xl transition-shadow duration-300"
              >
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline py-2">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pt-2 pb-4">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
