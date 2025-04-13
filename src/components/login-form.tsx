"use client"

import type React from "react"

import { useState, type ComponentProps } from "react"
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AtSign, KeyRound, Loader2, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const [studentId, setStudentId] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "studentId">("email")
  const router = useRouter()
  const session = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        ...(loginMethod === "email" ? { email } : { studentId }),
        password,
        callbackUrl: "/home",
      })

      if (result?.error) {
        setLoginError(result.error)
      } else {
        router.push(result?.url || "/home")
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FpjsProvider loadOptions={{ apiKey: process.env.NEXT_PUBLIC_FP_PUBLIC_KEY ?? "" }}>
      <div className={cn("w-full max-w-md mx-auto", className)} {...props}>
        <Card className="shadow-lg border-opacity-50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Login to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {loginError && (
              <Alert variant="destructive" className="mb-4 animate-in fade-in-50 duration-300">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}

            <Tabs
              defaultValue="email"
              className="w-full"
              onValueChange={(value) => setLoginMethod(value as "email" | "studentId")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="studentId">Student ID</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <TabsContent value="email" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={loginMethod === "email"}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="studentId" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentID" className="text-sm font-medium">
                      Student ID
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="studentID"
                        type="text"
                        placeholder="22bc8010"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required={loginMethod === "studentId"}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <a href="#" className="text-xs text-primary hover:underline underline-offset-4 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full transition-all" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center p-6 border-t bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-primary font-medium hover:underline underline-offset-4 transition-colors"
              >
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </FpjsProvider>
  )
}
