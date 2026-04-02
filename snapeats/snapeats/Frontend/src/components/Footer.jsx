import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-8 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Brand Info */}
        <div>
          <h4 className="text-xl font-bold mb-2">Snap Eats</h4>
          <p>Fast delivery of your favorite meals.</p>
        </div>

        {/* Social Media Icons */}
        <div>
          <h4 className="text-xl font-bold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {/* Facebook */}
            <a
              href="#"
              className="bg-[#1877F2] text-white w-10 h-10 flex items-center justify-center rounded-full hover:brightness-110 transition-all"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>

            {/* Instagram (Gradient) */}
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 hover:brightness-110 transition-all"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="bg-[#1DA1F2] text-white w-10 h-10 flex items-center justify-center rounded-full hover:brightness-110 transition-all"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>

            {/* Pinterest */}
            <a
              href="#"
              className="bg-[#E60023] text-white w-10 h-10 flex items-center justify-center rounded-full hover:brightness-110 transition-all"
              aria-label="Pinterest"
            >
              <FaPinterestP size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm">
        &copy; 2025 Snap Eats. All rights reserved.
      </div>
    </footer>
  );
}
