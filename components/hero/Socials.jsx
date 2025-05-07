import { useState } from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaFacebookF, FaTiktok } from "react-icons/fa6";
import { Button } from "../ui/button";
import { MessageSquareShare, X } from "lucide-react";

export const Socials = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed right-5 bottom-10 z-50 flex flex-col items-center">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-700/80 text-white w-12 h-12 mb-3 shadow-lg rounded-full hover:bg-green-700/90 cursor-pointer transition-colors"
        aria-label={isOpen ? 'Close Socials' : 'Open Socials'}>
        {isOpen ? <X size={24}/> : <MessageSquareShare size={24}/>}
      </Button>

      {isOpen && (
        <div className="flex flex-col space-y-3 animate-fade-in">
          <a
            href="https://wa.me/254711430249?text=Hello%20Wahome%20Premium%20Pigs%2C%20I%20would%20like%20to%20inquire%20about..."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            aria-label="WhatsApp">
            <FaWhatsapp size={20} />
          </a>
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Facebook">
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-colors"
            aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a
            href="https://tiktok.com/@yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            aria-label="TikTok">
            <FaTiktok size={20} />
          </a>
          <a
            href="https://x.com/WachiraJoseph17"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
            aria-label="X (Twitter)">
            <FaXTwitter size={20} />
          </a>
        </div>
      )}
    </div>
  );
};