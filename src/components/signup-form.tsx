"use client";

import { useState, ComponentProps } from "react";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <FpjsProvider
      loadOptions={{ apiKey: process.env.NEXT_PUBLIC_FP_PUBLIC_KEY ?? "" }}
    >
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="studentID">Student ID</Label>
                  <Input
                    id="studentID"
                    type="text"
                    placeholder="22bc8010"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" type="tel" required />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="fatherName">Father&apos;s Name</Label>
                    <Input id="fatherName" type="text" required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="motherName">Mother&apos;s Name</Label>
                    <Input id="motherName" type="text" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="fatherPhoneNumber">
                      Father&apos;s Phone Number
                    </Label>
                    <Input id="fatherPhoneNumber" type="tel" required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="motherPhoneNumber">
                      Mother&apos;s Phone Number
                    </Label>
                    <Input id="motherPhoneNumber" type="tel" required />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input id="dateOfBirth" type="date" required />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" type="text" required />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="course">Course</Label>
                    <Input id="course" type="text" required />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" type="text" required />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="yearOfStudy">Year of Study</Label>
                  <Input id="yearOfStudy" type="number" required />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="emergencyContactName">
                    Emergency Contact Name
                  </Label>
                  <Input id="emergencyContactName" type="text" required />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="emergencyContactPhone">
                    Emergency Contact Phone
                  </Label>
                  <Input id="emergencyContactPhone" type="tel" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setAgreedToTerms(checked == true)
                    }
                  />
                  <Label htmlFor="terms">
                    I agree to the{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      terms and conditions
                    </a>
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!agreedToTerms}
                >
                  Sign Up
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Log in
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FpjsProvider>
  );
}
