import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-green-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 mr-2" />
              <h3 className="text-xl font-bold">Traditional Medicine AI</h3>
            </div>
            <p className="text-green-200 mb-6">
              Bridging ancient wisdom with modern technology to provide personalized herbal remedies from Korean and
              Indian traditional medicine systems.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-green-200 hover:text-white hover:bg-green-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-green-200 hover:text-white hover:bg-green-800">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-green-200 hover:text-white hover:bg-green-800">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-green-200 hover:text-white hover:bg-green-800">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Herbal Database
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Find a Practitioner
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-green-200">123 Healing Street, Seoul, South Korea</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-green-200">+82 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-green-200">info@traditionalmedicine.ai</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-green-200 mb-4">
              Subscribe to our newsletter for the latest updates on traditional medicine research and herbal remedies.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Your email"
                className="bg-green-800 border-green-700 text-white placeholder:text-green-400 focus:border-green-500"
              />
              <Button className="bg-green-600 hover:bg-green-500 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 mt-8 text-center text-green-300 text-sm">
          <p className="mb-2">
            Disclaimer: This application provides information based on traditional medicine principles and is not
            intended to replace professional medical advice.
          </p>
          <p>© {new Date().getFullYear()} Traditional Medicine AI Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
