import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const company = "Property Listers";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center bg-muted">
      <div className="w-full p-8">
        <div className="grid grid-cols-1 justify-between gap-6 md:grid-cols-4 md:gap-16">
          <div className="mx-8 text-center md:mx-0 md:text-left">
            <h2 className="text-2xl font-bold text-primary">Newsletter</h2>
            <div className="mt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="mb-4 border-primary text-muted-foreground focus:text-primary"
              />
              <Button className="w-full bg-primary">Subscribe</Button>
            </div>
          </div>
          <div className="hidden text-center md:block md:text-left">
            <h2 className="text-2xl font-bold text-primary">Resources</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden text-center md:block md:text-left">
            <h2 className="text-2xl font-bold text-primary">Products</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="hidden text-center md:block md:text-left">
            <h2 className="text-2xl font-bold text-primary">Company</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-6 bg-muted-foreground" />
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="order-2 mb-4 flex space-x-4 md:order-1 md:mb-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary-foreground"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary-foreground"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-secondary-foreground"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
          <div className="order-1 p-2 text-muted-foreground hover:text-secondary-foreground md:order-2">
            {`© 2024 ${company}. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
}
