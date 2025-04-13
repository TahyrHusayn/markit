import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">MarkIt</h1>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">For Students</CardTitle>
              <CardDescription>
                Mark your attendance easily with your Qr Code
              </CardDescription>
            </CardHeader>
            <CardContent className="font-[405]">
              <p className="mb-5">
                Students can scan the Qr Code to mark their daily attendance.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Simple attendance marking with Qr Code</li>
                <li>View your attendance history</li>
                <li>Secure login with roll number and password</li>
              </ul>
              <Link href="/signup">
                <Button className="w-full mt-3">Sign Up as Student</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">For Administrators</CardTitle>
              <CardDescription>
                Manage and monitor student attendance records
              </CardDescription>
            </CardHeader>
            <CardContent className="font-[405]">
              <p className="mb-4">
                Administrators can view attendance of all students.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>View daily attendance reports</li>
                <li>Make other temporary admin</li>
                <li>View Student Present or not</li>
                <li>Secure admin dashboard</li>
              </ul>
              <Link href="/login">
                <Button variant="outline" className="w-full mt-3">
                  Login as Admin
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-3xl">
            Welcome to MarkIt
          </p>
        </div>
      </footer>
    </div>
  );
}
