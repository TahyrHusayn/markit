"use client";

import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";

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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <FpjsProvider
      loadOptions={{ apiKey: process.env.NEXT_PUBLIC_FP_PUBLIC_KEY ?? "" }}
    >
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Hi</CardTitle>
            <CardDescription>Singup with your credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Student ID</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="22BC8010"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Name</Label>
                    <Input
                      id="name"
                      type="name"
                      placeholder="narendra modi"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="me@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Ph.</Label>
                    <Input
                      id="phone"
                      type="phone"
                      placeholder="+9177328xxxxx"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Father's Name</Label>
                    <Input
                      id="name"
                      type="name"
                      placeholder="amit shah"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Mother's Name</Label>
                    <Input
                      id="name"
                      type="name"
                      placeholder="nirmala sitaraman"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Father Ph.</Label>
                    <Input
                      id="phone"
                      type="phone"
                      placeholder="+94135xxxxx"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Mother's Ph.</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="+9175974xxxxx"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type="password" required />
                  </div>

                  <div className="grid gap-3">
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </div>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Log In
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </FpjsProvider>
  );
}
