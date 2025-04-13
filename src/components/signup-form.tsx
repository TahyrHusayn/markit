"use client";

import { useState, ComponentProps } from "react";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import { useRouter } from "next/navigation";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [fatherPhoneNumber, setFatherPhoneNumber] = useState("");
  const [motherPhoneNumber, setMotherPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(0);
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          studentId,
          password,
          fatherName,
          motherName,
          fatherPhoneNumber,
          motherPhoneNumber,
          dateOfBirth,
          address,
          course,
          department,
          yearOfStudy,
          emergencyContactName,
          emergencyContactPhone,
          agreedToTerms,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          data.message || "Signup successful! Redirecting to login..."
        );
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    }
  };

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
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
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
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name:</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
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
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="phoneNumber">Phone Number:</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password:</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirm Password:</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="fatherName">Father&apos;s Name:</Label>
                    <Input
                      id="fatherName"
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="motherName">Mother&apos;s Name:</Label>
                    <Input
                      id="motherName"
                      type="text"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="fatherPhoneNumber">
                      Father&apos;s Phone Number:
                    </Label>
                    <Input
                      id="fatherPhoneNumber"
                      type="tel"
                      value={fatherPhoneNumber}
                      onChange={(e) => setFatherPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="motherPhoneNumber">
                      Mother&apos;s Phone Number:
                    </Label>
                    <Input
                      id="motherPhoneNumber"
                      type="tel"
                      value={motherPhoneNumber}
                      onChange={(e) => setMotherPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="dateOfBirth">Date of Birth:</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth ? dateOfBirth.slice(0, 10) : ""} // extract only the 'YYYY-MM-DD' part
                    onChange={(e) => {
                      const isoDate = new Date(e.target.value).toISOString(); // keep ISO format internally
                      setDateOfBirth(isoDate);
                    }}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="address">Address:</Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="course">Course:</Label>
                    <Input
                      id="course"
                      type="text"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="department">Department:</Label>
                    <Input
                      id="department"
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="yearOfStudy">Year of Study:</Label>
                  <Input
                    id="yearOfStudy"
                    type="number"
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(parseInt(e.target.value))}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="emergencyContactName">
                    Emergency Contact Name:
                  </Label>
                  <Input
                    id="emergencyContactName"
                    type="text"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="emergencyContactPhone">
                    Emergency Contact Phone:
                  </Label>
                  <Input
                    id="emergencyContactPhone"
                    type="tel"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    required
                  />
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </CardContent>
        </Card>
      </div>
    </FpjsProvider>
  );
}
