"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { WalmartLogo } from "@/components/walmart-logo"
import { VerticalTimeline } from "@/components/vertical-timeline"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <WalmartLogo width={140} height={100} className="hover:opacity-80 transition-opacity" />
        </Link>
        <Link href="/auth">
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent font-syabil text-sm sm:text-base"
          >
            Sign In
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-rubik text-gray-900 leading-tight">
                Revolutionize Delivery with
                <span className="text-blue-600"> Drone Intelligence</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-syabil">
                Advanced analytics and prediction system for optimizing drone delivery operations. Analyze routes,
                predict profitability, and make data-driven decisions for autonomous delivery solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="gradient-bg text-white hover:opacity-90 transition-opacity font-syabil w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent font-syabil w-full sm:w-auto"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="drone-float">
              <Image
                src="/images/drone-hero.png"
                alt="Drone Delivery System"
                width={600}
                height={400}
                className="w-full h-auto max-w-md sm:max-w-lg lg:max-w-full mx-auto rounded-3xl hero-image-shadow cool-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-rubik text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-syabil">
            Our intelligent system analyzes multiple parameters to predict the feasibility and profitability of drone
            deliveries through a comprehensive four-step process
          </p>
        </div>

        <VerticalTimeline />
      </section>

      {/* Video Demo Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-rubik text-gray-900 mb-4">See It In Action</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-syabil">
            Watch how our drone delivery prediction system transforms logistics operations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Image
            src="/images/drone_land.png" // Using the new placeholder image
            alt="Drone Delivery Demo"
            width={960} // Adjust width/height as needed for your image aspect ratio
            height={540}
            className="w-full h-full object-cover rounded-2xl cool-shadow"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-rubik text-white mb-4">
            Ready to Transform Your Delivery Operations?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto font-syabil">
            Join the future of autonomous delivery with our advanced prediction and analytics platform
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-syabil">
              Start Your Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <WalmartLogo width={140} height={100} className="filter brightness-0 invert" />
          </div>
          <p className="text-center text-gray-400 font-syabil text-sm sm:text-base">
            © 2024 Walmart Inc. All rights reserved. Drone Delivery Intelligence Platform
          </p>
        </div>
      </footer>
    </div>
  )
}
