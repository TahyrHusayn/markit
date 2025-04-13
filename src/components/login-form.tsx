"use client";

import { useState, ComponentProps } from "react";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import { useRouter } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null); // Clear any previous errors

    const result = await signIn("credentials", {
      redirect: false, // Prevent default redirect so we can handle it
      email: email || undefined, // Send email if provided
      studentId: studentId || undefined, // Send studentId if provided
      password,
      callbackUrl: "/home", // The page to redirect to after successful login
    });

    if (result?.error) {
      setLoginError(result.error); // Set the error message from NextAuth.js
    } else {
      // Successful login, redirect to the callbackUrl
      router.push(result?.url || "/home");
    }
  };

  return (
    <FpjsProvider
      loadOptions={{ apiKey: process.env.NEXT_PUBLIC_FP_PUBLIC_KEY ?? "" }}
    >
      {JSON.stringify(session)}
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardDescription className="mt-2 text-red-500">
              Note:- Only enter Student ID if you are a Student
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loginError && <p className="text-red-500 mb-4">{loginError}</p>}{" "}
            {/* Display login error */}
            <form onSubmit={handleSubmit}>
              {" "}
              {/* Add the onSubmit handler */}
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="studentID">Student ID:</Label>
                    <Input
                      id="studentID"
                      type="text"
                      placeholder="22bc8010"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button
                  onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
                >
                  Sign Out
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FpjsProvider>
  );
}
