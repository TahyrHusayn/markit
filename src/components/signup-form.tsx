"use client";

import type React from "react";

import { useState, type ComponentProps } from "react";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  User,
  GraduationCap,
  Home,
  Phone,
  Calendar,
  Users,
  BookOpen,
  Building,
  AlertTriangle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

type FormData = {
  studentId: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  fatherName: string;
  motherName: string;
  fatherPhoneNumber: string;
  motherPhoneNumber: string;
  dateOfBirth: string;
  address: string;
  course: string;
  department: string;
  yearOfStudy: number;
  emergencyContactName: string;
  emergencyContactPhone: string;
  agreedToTerms: boolean;
};

type FormErrors = {
  [key in keyof FormData]?: string;
};

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<FormData>({
    studentId: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    fatherName: "",
    motherName: "",
    fatherPhoneNumber: "",
    motherPhoneNumber: "",
    dateOfBirth: "",
    address: "",
    course: "",
    department: "",
    yearOfStudy: 1,
    emergencyContactName: "",
    emergencyContactPhone: "",
    agreedToTerms: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const router = useRouter();

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.studentId) {
        newErrors.studentId = "Student ID is required";
        isValid = false;
      } else if (!/^\d{2}[a-z]{2}\d{4}$/i.test(formData.studentId)) {
        newErrors.studentId = "Invalid student ID format (e.g., 22BC8010)";
        isValid = false;
      }

      if (!formData.name) {
        newErrors.name = "Name is required";
        isValid = false;
      }

      if (!formData.email) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
        isValid = false;
      }

      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
        isValid = false;
      } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
        newErrors.phoneNumber = "Phone number must have 10 digits";
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        isValid = false;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required";
        isValid = false;
      }

      if (!formData.address) {
        newErrors.address = "Address is required";
        isValid = false;
      }
    }

    if (step === 3) {
      if (!formData.course) {
        newErrors.course = "Course is required";
        isValid = false;
      }

      if (!formData.department) {
        newErrors.department = "Department is required";
        isValid = false;
      }

      if (!formData.yearOfStudy) {
        newErrors.yearOfStudy = "Year of study is required";
        isValid = false;
      } else if (formData.yearOfStudy < 1 || formData.yearOfStudy > 5) {
        newErrors.yearOfStudy = "Year of study must be between 1 and 5";
        isValid = false;
      }
    }

    if (step === 4) {
      if (!formData.fatherName) {
        newErrors.fatherName = "Father's name is required";
        isValid = false;
      }

      if (!formData.motherName) {
        newErrors.motherName = "Mother's name is required";
        isValid = false;
      }

      if (!formData.fatherPhoneNumber) {
        newErrors.fatherPhoneNumber = "Father's phone number is required";
        isValid = false;
      } else if (
        !/^\d{10}$/.test(formData.fatherPhoneNumber.replace(/\D/g, ""))
      ) {
        newErrors.fatherPhoneNumber = "Phone number must have 10 digits";
        isValid = false;
      }

      if (!formData.motherPhoneNumber) {
        newErrors.motherPhoneNumber = "Mother's phone number is required";
        isValid = false;
      } else if (
        !/^\d{10}$/.test(formData.motherPhoneNumber.replace(/\D/g, ""))
      ) {
        newErrors.motherPhoneNumber = "Phone number must have 10 digits";
        isValid = false;
      }

      if (!formData.emergencyContactName) {
        newErrors.emergencyContactName = "Emergency contact name is required";
        isValid = false;
      }

      if (!formData.emergencyContactPhone) {
        newErrors.emergencyContactPhone = "Emergency contact phone is required";
        isValid = false;
      } else if (
        !/^\d{10}$/.test(formData.emergencyContactPhone.replace(/\D/g, ""))
      ) {
        newErrors.emergencyContactPhone = "Phone number must have 10 digits";
        isValid = false;
      }
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;

    if (type === "number") {
      setFormData({
        ...formData,
        [id]: Number.parseInt(value) || 0,
      });
    } else if (type === "date") {
      const isoDate = new Date(value).toISOString();
      setFormData({
        ...formData,
        [id]: isoDate,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }

    // Clear error for this field when user types
    if (formErrors[id as keyof FormData]) {
      setFormErrors({
        ...formErrors,
        [id]: undefined,
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      agreedToTerms: checked,
    });
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    if (!formData.agreedToTerms) {
      setFormErrors({
        ...formErrors,
        agreedToTerms: "You must agree to the terms and conditions",
      });
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          data.message || "Signup successful! Redirecting to login..."
        );
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.error || "Signup failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4" aria-labelledby="step-1-heading">
            <div className="space-y-2">
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="studentId" className="text-sm font-medium">
                  Student ID
                </Label>
              </div>
              <Input
                id="studentId"
                type="text"
                placeholder="22BC8010"
                value={formData.studentId}
                onChange={handleChange}
                aria-describedby={
                  formErrors.studentId ? "studentId-error" : undefined
                }
                className={formErrors.studentId ? "border-red-500" : ""}
              />
              {formErrors.studentId && (
                <p id="studentId-error" className="text-sm text-red-500 mt-1">
                  {formErrors.studentId}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
              </div>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                aria-describedby={formErrors.name ? "name-error" : undefined}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p id="name-error" className="text-sm text-red-500 mt-1">
                  {formErrors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                aria-describedby={formErrors.email ? "email-error" : undefined}
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && (
                <p id="email-error" className="text-sm text-red-500 mt-1">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </Label>
              </div>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="1234567890"
                value={formData.phoneNumber}
                onChange={handleChange}
                aria-describedby={
                  formErrors.phoneNumber ? "phoneNumber-error" : undefined
                }
                className={formErrors.phoneNumber ? "border-red-500" : ""}
              />
              {formErrors.phoneNumber && (
                <p id="phoneNumber-error" className="text-sm text-red-500 mt-1">
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4" aria-labelledby="step-2-heading">
            <div className="space-y-2">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                aria-describedby={
                  formErrors.password ? "password-error" : undefined
                }
                className={formErrors.password ? "border-red-500" : ""}
              />
              {formErrors.password && (
                <p id="password-error" className="text-sm text-red-500 mt-1">
                  {formErrors.password}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium"
                >
                  Confirm Password
                </Label>
              </div>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-describedby={
                  formErrors.confirmPassword
                    ? "confirmPassword-error"
                    : undefined
                }
                className={formErrors.confirmPassword ? "border-red-500" : ""}
              />
              {formErrors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-sm text-red-500 mt-1"
                >
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="dateOfBirth" className="text-sm font-medium">
                  Date of Birth
                </Label>
              </div>
              <Input
                id="dateOfBirth"
                type="date"
                value={
                  formData.dateOfBirth ? formData.dateOfBirth.slice(0, 10) : ""
                }
                onChange={handleChange}
                aria-describedby={
                  formErrors.dateOfBirth ? "dateOfBirth-error" : undefined
                }
                className={formErrors.dateOfBirth ? "border-red-500" : ""}
              />
              {formErrors.dateOfBirth && (
                <p id="dateOfBirth-error" className="text-sm text-red-500 mt-1">
                  {formErrors.dateOfBirth}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Home className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="address" className="text-sm font-medium">
                  Address
                </Label>
              </div>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                aria-describedby={
                  formErrors.address ? "address-error" : undefined
                }
                className={formErrors.address ? "border-red-500" : ""}
              />
              {formErrors.address && (
                <p id="address-error" className="text-sm text-red-500 mt-1">
                  {formErrors.address}
                </p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4" aria-labelledby="step-3-heading">
            <div className="space-y-2">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="course" className="text-sm font-medium">
                  Course
                </Label>
              </div>
              <Input
                id="course"
                type="text"
                placeholder="B.Tech, BBA, etc."
                value={formData.course}
                onChange={handleChange}
                aria-describedby={
                  formErrors.course ? "course-error" : undefined
                }
                className={formErrors.course ? "border-red-500" : ""}
              />
              {formErrors.course && (
                <p id="course-error" className="text-sm text-red-500 mt-1">
                  {formErrors.course}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-primary" />
                <Label htmlFor="department" className="text-sm font-medium">
                  Department
                </Label>
              </div>
              <Input
                id="department"
                type="text"
                placeholder="Computer Science, Mechanical, etc."
                value={formData.department}
                onChange={handleChange}
                aria-describedby={
                  formErrors.department ? "department-error" : undefined
                }
                className={formErrors.department ? "border-red-500" : ""}
              />
              {formErrors.department && (
                <p id="department-error" className="text-sm text-red-500 mt-1">
                  {formErrors.department}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
                <Label htmlFor="yearOfStudy" className="text-sm font-medium">
                  Year of Study
                </Label>
              </div>
              <Input
                id="yearOfStudy"
                type="number"
                min="1"
                max="5"
                value={formData.yearOfStudy}
                onChange={handleChange}
                aria-describedby={
                  formErrors.yearOfStudy ? "yearOfStudy-error" : undefined
                }
                className={formErrors.yearOfStudy ? "border-red-500" : ""}
              />
              {formErrors.yearOfStudy && (
                <p id="yearOfStudy-error" className="text-sm text-red-500 mt-1">
                  {formErrors.yearOfStudy}
                </p>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4" aria-labelledby="step-4-heading">
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Parent Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="fatherName" className="text-sm font-medium">
                  Father&apos;s Name
                </Label>
                <Input
                  id="fatherName"
                  type="text"
                  value={formData.fatherName}
                  onChange={handleChange}
                  aria-describedby={
                    formErrors.fatherName ? "fatherName-error" : undefined
                  }
                  className={formErrors.fatherName ? "border-red-500" : ""}
                />
                {formErrors.fatherName && (
                  <p
                    id="fatherName-error"
                    className="text-sm text-red-500 mt-1"
                  >
                    {formErrors.fatherName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="fatherPhoneNumber"
                  className="text-sm font-medium"
                >
                  Father&apos;s Phone Number
                </Label>
                <Input
                  id="fatherPhoneNumber"
                  type="tel"
                  value={formData.fatherPhoneNumber}
                  onChange={handleChange}
                  aria-describedby={
                    formErrors.fatherPhoneNumber
                      ? "fatherPhoneNumber-error"
                      : undefined
                  }
                  className={
                    formErrors.fatherPhoneNumber ? "border-red-500" : ""
                  }
                />
                {formErrors.fatherPhoneNumber && (
                  <p
                    id="fatherPhoneNumber-error"
                    className="text-sm text-red-500 mt-1"
                  >
                    {formErrors.fatherPhoneNumber}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName" className="text-sm font-medium">
                  Mother&apos;s Name
                </Label>
                <Input
                  id="motherName"
                  type="text"
                  value={formData.motherName}
                  onChange={handleChange}
                  aria-describedby={
                    formErrors.motherName ? "motherName-error" : undefined
                  }
                  className={formErrors.motherName ? "border-red-500" : ""}
                />
                {formErrors.motherName && (
                  <p
                    id="motherName-error"
                    className="text-sm text-red-500 mt-1"
                  >
                    {formErrors.motherName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="motherPhoneNumber"
                  className="text-sm font-medium"
                >
                  Mother&apos;s Phone Number
                </Label>
                <Input
                  id="motherPhoneNumber"
                  type="tel"
                  value={formData.motherPhoneNumber}
                  onChange={handleChange}
                  aria-describedby={
                    formErrors.motherPhoneNumber
                      ? "motherPhoneNumber-error"
                      : undefined
                  }
                  className={
                    formErrors.motherPhoneNumber ? "border-red-500" : ""
                  }
                />
                {formErrors.motherPhoneNumber && (
                  <p
                    id="motherPhoneNumber-error"
                    className="text-sm text-red-500 mt-1"
                  >
                    {formErrors.motherPhoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-medium flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                Emergency Contact
              </h3>

              <div className="space-y-2">
                <Label
                  htmlFor="emergencyContactName"
                  className="text-sm font-medium"
                >
                  Emergency Contact Name
                </Label>
                <Input
                  id="emergencyContactName"
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  aria-describedby={
                    formErrors.emergencyContactName
                      ? "emergencyContactName-error"
                      : undefined
                  }
                  className={
                    formErrors.emergencyContactName ? "border-red-500" : ""
                  }
                />
                {formErrors.emergencyContactName && (
                  <p
                    id="emergencyContactName-error"
                    className="text-sm text-red-500 mt-1"
                  >
                    {formErrors.emergencyContactName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="emergencyContactPhone"
                  className="text-sm font-medium"
                >
                  Emergency Contact Phone
                </Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  aria-describedby={
                    formErrors.emergencyContactPhone
                      ? "emergencyContactPhone-error"
                      : undefined
                  }
                  className={
                    formErrors.emergencyContactPhone ? "border-red-500" : ""
                  }
                />
                {formErrors.emergencyContactPhone && (
                  <p
                    id="emergencyContactPhone-error"
                    className="text-sm text-red-500 mt-1"
                  >
                    {formErrors.emergencyContactPhone}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={handleCheckboxChange}
                  aria-describedby={
                    formErrors.agreedToTerms ? "terms-error" : undefined
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    terms and conditions
                  </a>
                </Label>
              </div>
              {formErrors.agreedToTerms && (
                <p id="terms-error" className="text-sm text-red-500 mt-1">
                  {formErrors.agreedToTerms}
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Personal Information";
      case 2:
        return "Account Security & Details";
      case 3:
        return "Academic Information";
      case 4:
        return "Family & Emergency Contacts";
      default:
        return "";
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1:
        return <User className="w-5 h-5 mr-2" />;
      case 2:
        return <Home className="w-5 h-5 mr-2" />;
      case 3:
        return <GraduationCap className="w-5 h-5 mr-2" />;
      case 4:
        return <Users className="w-5 h-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <FpjsProvider
      loadOptions={{ apiKey: process.env.NEXT_PUBLIC_FP_PUBLIC_KEY ?? "" }}
    >
      <div className={cn("w-full max-w-2xl mx-auto", className)} {...props}>
        <Card className="shadow-lg border-opacity-50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create your student account
            </CardTitle>
            <CardDescription className="text-center">
              Complete the form below to register as a student
            </CardDescription>
            <div className="pt-2">
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert
                variant="destructive"
                className="mb-4 animate-in fade-in-50 duration-300"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 bg-green-50 text-green-800 border-green-200 animate-in fade-in-50 duration-300">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2
                  id={`step-${currentStep}-heading`}
                  className="text-lg font-medium flex items-center"
                >
                  {getStepIcon()}
                  {getStepTitle()}
                </h2>
              </div>

              {renderStepContent()}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between border-t p-6 bg-muted/20">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto ml-auto"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.agreedToTerms}
                className="w-full sm:w-auto ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            )}
          </CardFooter>

          <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-medium hover:underline underline-offset-4 transition-colors"
            >
              Log in
            </a>
          </div>
        </Card>
      </div>
    </FpjsProvider>
  );
}
