"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { WalmartLogo } from "@/components/walmart-logo"

export function AuthPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const router = useRouter()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setIsScanning(true)

      setTimeout(() => {
        setIsScanning(false)
        setScanComplete(true)
      }, 4000)
    }
  }

  const handleSignIn = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <WalmartLogo width={140} height={70} className="hover:opacity-80 transition-opacity" />
          </div>
          <p className="text-blue-100 font-syabil text-sm sm:text-base">Secure Employee Access Portal</p>
        </div>

        <Card className="border-blue-200 shadow-xl">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-center text-xl sm:text-2xl font-syabil">Welcome Back</CardTitle>
            <CardDescription className="text-center font-syabil text-sm sm:text-base">
              Sign in to access the Drone Delivery Analytics Platform
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" className="font-syabil">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="font-syabil">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-syabil">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@walmart.com"
                    className="h-10 sm:h-12 font-syabil"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-id" className="font-syabil">
                    Employee Number
                  </Label>
                  <Input id="employee-id" placeholder="WMT123456" className="h-10 sm:h-12 font-syabil" />
                </div>
                <Button onClick={handleSignIn} className="w-full gradient-bg text-white h-10 sm:h-12 font-syabil">
                  Sign In
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-syabil">
                    Full Name
                  </Label>
                  <Input id="name" placeholder="John Doe" className="h-10 sm:h-12 font-syabil" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="font-syabil">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@walmart.com"
                    className="h-10 sm:h-12 font-syabil"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-employee-id" className="font-syabil">
                    Walmart Employee Number
                  </Label>
                  <Input id="signup-employee-id" placeholder="WMT123456" className="h-10 sm:h-12 font-syabil" />
                </div>

                {/* ID Card Upload */}
                <div className="space-y-2">
                  <Label htmlFor="id-card" className="font-syabil">
                    Walmart ID Card
                  </Label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 sm:p-6 text-center relative overflow-hidden">
                    {!uploadedFile && (
                      <div>
                        <Upload className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-blue-400 mb-3 sm:mb-4" />
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 font-syabil">Upload your Walmart ID Card</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Button
                          variant="outline"
                          className="pointer-events-none bg-transparent font-syabil text-xs sm:text-sm"
                        >
                          Choose File
                        </Button>
                      </div>
                    )}

                    {uploadedFile && !scanComplete && (
                      <div className="space-y-3 sm:space-y-4">
                        <p className="text-xs sm:text-sm font-syabil">Scanning ID Card...</p>
                        {isScanning && (
                          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="scanning-animation absolute inset-y-0 w-1/3 bg-blue-500 rounded-full"></div>
                          </div>
                        )}
                        <Loader2 className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-spin" />
                      </div>
                    )}

                    {scanComplete && (
                      <div className="space-y-3 sm:space-y-4">
                        <CheckCircle className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-green-500" />
                        <p className="text-green-600 font-syabil text-sm sm:text-base">Successfully Scanned!</p>
                        <p className="text-xs sm:text-sm text-gray-600 font-syabil">ID verification complete</p>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleSignIn}
                  disabled={!scanComplete}
                  className="w-full gradient-bg text-white disabled:opacity-50 h-10 sm:h-12 font-syabil"
                >
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-4 sm:mt-6">
          <Link href="/" className="text-blue-100 hover:text-white transition-colors font-syabil text-sm sm:text-base">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
