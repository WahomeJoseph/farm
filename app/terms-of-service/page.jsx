import Image from "next/image"
import Chatbot from "@/components/chat/Chatbot"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Mail } from "lucide-react"
import { PhoneCall } from "lucide-react"

export async function generateMetadata() {
  return {
    title: "Terms & Conditions | Wahome Premium Pigs",
    description: "Read the terms and conditions for using Wahome Premium Pigs services and website.",
  }
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Chatbot />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1677958584456-0cc45c6feb2c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVybXN8ZW58MHx8MHx8fDA%3D"
          alt="Legal Document"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-green-600 text-white border-0 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            Legal Information
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Terms & Conditions</h1>
          <p className="text-lg md:text-xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Understanding your rights and responsibilities when using our services.
          </p>
        </div>
      </section>

      {/* Terms and Conditions Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 text-justify rounded-xl shadow-lg">
          <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().getMonth()} , {new Date().getFullYear()}</p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to Wahome Premium Pigs. These Terms and Conditions govern your
            access to and use of <a href="https://farm-orpin-mu.vercel.app/" className="text-green-600 hover:text-green-700"> our website</a>,
            products, and services. By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to
            these Terms, please do not use our Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            All content on this website, including text, graphics, logos, images, and software, is the property of
            Wahome Premium Pigs or its content suppliers and is protected by intellectual property laws. You may not
            reproduce, distribute, modify, or create derivative works of any content without our express written
            permission.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>You must be at least 18 years old to use our Services.</li>
            <li>You are responsible for maintaining the confidentiality of your account information.</li>
            <li>You agree to provide accurate and complete information when placing orders or interacting with us.</li>
            <li>You agree to use our Services only for lawful purposes and in accordance with these Terms.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Uses</h2>
          <p className="text-gray-700 leading-relaxed mb-6">You may not use our Services to:</p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
            <li>Engage in any illegal or fraudulent activity.</li>
            <li>Transmit any harmful code, viruses, or other destructive files.</li>
            <li>Interfere with the proper functioning of our website or Services.</li>
            <li>Collect or store personal data about other users without their consent.</li>
            <li>Impersonate any person or entity.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Product Information and Orders</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We strive to provide accurate product descriptions and pricing. However, we do not guarantee that all
            information is error-free. We reserve the right to correct any errors, inaccuracies, or omissions and to
            change or update information or cancel orders if any information on the Services is inaccurate at any time
            without prior notice. All livestock sales are subject to availability and our health guarantee policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our Services are provided "as is" and "as available" without any warranties of any kind, either express or
            implied, including but not limited to implied warranties of merchantability, fitness for a particular
            purpose, or non-infringement. We do not warrant that our Services will be uninterrupted, error-free, or
            secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            To the fullest extent permitted by law, Wahome Premium Pigs shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting
            from (a) your access to or use of or inability to access or use the Services; (b) any conduct or content of
            any third party on the Services; or (c) unauthorized access, use, or alteration of your transmissions or
            content.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its
            conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to
            the exclusive jurisdiction of the courts located in Kenya.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to These Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new
            Terms on this page and updating the "Last Updated" date. Your continued use of the Services after any such
            modifications constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="space-y-1">
            <Link href="mailto:info@wahomepremiumpigs.com" className="hover:text-green-800 break-all flex items-center gap-2"> <Mail size={16} className="text-green-600" /> info@wahomepremiumpigs.com</Link>
            <Link href="tel:+254711430249" className="hover:text-green-800 break-all flex items-center gap-2"> <PhoneCall size={16} className="text-green-600" /> +254 711 430 249</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
