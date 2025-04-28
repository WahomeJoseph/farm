import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaFacebookF, FaTiktok } from "react-icons/fa6";

export const Socials = () => {
    return (
      <div className="fixed right-4 bottom-8 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/254795969757?text=Hello%20Wahome%20Farm%2C%20I%20would%20like%20to%20inquire%20about..."
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
  
        <a
          href="www.youtube.com/@josephwachira2119"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FF0000] text-white p-3 rounded-full shadow-lg hover:bg-[#CC0000] transition-colors"
          aria-label="YouTube">
          <FaYoutube size={20} />
        </a>
      </div>
    );
  };