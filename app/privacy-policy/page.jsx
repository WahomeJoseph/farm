import Image from "next/image"
import Chatbot from "@/components/chat/Chatbot"
import { Badge } from "@/components/ui/badge"
import { Mail } from "lucide-react"
import { PhoneCall } from "lucide-react"
import Link from "next/link"

export async function generateMetadata() {
    return {
        title: "Privacy Policy | Wahome Premium Pigs",
        description: "Understand how Wahome Premium Pigs collects, uses, and protects your personal data abiding by the data protection act.",
        keywords: [
            "privacy policy wahome premium pigs",
            "data protection wahome pigs",
            "personal information wahome pigs",
            "user privacy wahome pigs",
            "data security wahome pigs",
            "pig farming privacy policy",
            "premium pig sales data protection",
        ],
        robots: "index, follow",
        openGraph: {
            title: "Privacy Policy | Wahome Premium Pigs",
            description: "Understand how Wahome Premium Pigs collects, uses, and protects your personal data abiding by the data protection act.",
            url: "https://farm-orpin-mu.vercel.app/privacy-policy",
            siteName: "Wahome Premium Pigs",
            images: [
                {
                    url: "https://farm-orpin-mu.vercel.app/logo-remove.png",
                    width: 800,
                    height: 600,
                },
                {
                    url: "https://farm-orpin-mu.vercel.app/logo-remove.png",
                    width: 1800,
                    height: 1600,
                    alt: "Wahome Premium Pigs",
                },
            ],
            locale: "en-US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Privacy Policy | Wahome Premium Pigs",
            description: "Understand how Wahome Premium Pigs collects, uses, and protects your personal data abiding by the data protection act.",
            images: ["https://farm-orpin-mu.vercel.app/logo-remove.png"],
            site: "@WahomePigs",
            creator: "@WahomePigs",
        },
        authors: [{ name: "Wahome Joseph", url: "https://joseph-wachira-portfolio.vercel.app/" }],
        creator: "Wahome Premium Pigs",
        publisher: "Wahome Premium Pigs",
    }
}

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Chatbot />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1547190027-9156686aa2f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByaXZhY3klMjBwb2xpY3l8ZW58MHx8MHx8fDA%3D"
                    alt="Privacy Policy Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

                <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                    <Badge className="mb-4 bg-green-600 text-white border-0 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                        Your Data, Our Commitment
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Privacy Policy</h1>
                    <p className="text-lg md:text-xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        How we collect, use, and protect your personal information.
                    </p>
                </div>
            </section>

            {/* Privacy Policy Content */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().getMonth()} , {new Date().getFullYear()}</p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Wahome Premium Pigs is committed to protecting your privacy. This Privacy Policy
                        explains how we collect, use, disclose, and safeguard your information when you visit
                        <a href="https://farm-orpin-mu.vercel.app/" className="text-green-600 hover:text-green-700"> our website</a>
                        and use our services. Please read this Privacy Policy carefully. If you do not agree
                        with the terms of this Privacy Policy, please do not access the site.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We may collect personal information that you voluntarily provide to us when you register on the website,
                        place an order, subscribe to our newsletter, respond to a survey, fill out a form, or otherwise interact
                        with our Services. This may include:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
                        <li>
                            <strong>Personal Identifiable Information:</strong> Name, email address, phone number, postal address,
                            payment information (processed securely by third-party payment processors).
                        </li>
                        <li>
                            <strong>Usage Data:</strong> Information about how you access and use the Services, such as your IP
                            address, browser type, operating system, pages viewed, and the dates/times of your visits.
                        </li>
                        <li>
                            <strong>Communication Data:</strong> Content of your communications with us, including emails and chat
                            messages.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We use the information we collect for various purposes, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
                        <li>To provide and maintain our Services.</li>
                        <li>To process your orders and manage your account.</li>
                        <li>To send you transactional emails, such as order confirmations and shipping updates.</li>
                        <li>To send you marketing and promotional communications (if you have opted in).</li>
                        <li>To improve our website, products, and services.</li>
                        <li>To respond to your inquiries and provide customer support.</li>
                        <li>To monitor and analyze usage and trends to improve your experience.</li>
                        <li>To detect, prevent, and address technical issues or fraudulent activities.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        We may share your information with third parties in the following situations:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
                        <li>
                            <strong>Service Providers:</strong> With third-party vendors who perform services on our behalf, such as
                            payment processing, data analysis, email delivery, hosting services, and customer service.
                        </li>
                        <li>
                            <strong>Legal Requirements:</strong> If required to do so by law or in response to valid requests by
                            public authorities (e.g., a court order or government agency).
                        </li>
                        <li>
                            <strong>Business Transfers:</strong> In connection with a merger, sale of company assets, financing, or
                            acquisition of all or a portion of our business by another company.
                        </li>
                        <li>
                            <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with
                            your consent.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        We implement reasonable security measures to protect your personal information from unauthorized access,
                        use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100%
                        secure. Therefore, we cannot guarantee absolute security.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        Depending on your location, you may have certain rights regarding your personal information, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6 space-y-2">
                        <li>
                            <strong>Access:</strong> The right to request a copy of the personal information we hold about you.
                        </li>
                        <li>
                            <strong>Correction:</strong> The right to request correction of inaccurate or incomplete data.
                        </li>
                        <li>
                            <strong>Deletion:</strong> The right to request deletion of your personal information, subject to legal
                            obligations.
                        </li>
                        <li>
                            <strong>Opt-out:</strong> The right to opt-out of marketing communications at any time.
                        </li>
                    </ul>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        To exercise these rights, please contact us using the details below.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Our Services may contain links to third-party websites or services that are not operated by us. We have no
                        control over and assume no responsibility for the content, privacy policies, or practices of any third-party
                        sites or services.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal
                        information from children. If we become aware that we have collected personal information from a child
                        without parental consent, we will take steps to remove that information from our servers.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                        Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
                        Policy periodically for any changes.
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
