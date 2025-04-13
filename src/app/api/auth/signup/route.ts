import bcrypt from 'bcrypt';
import { prisma } from '@/db';
import { NextResponse } from 'next/server'; // Import NextResponse from next/server

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
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
      agreedToTerms 
    }: {
      name: string;
      email: string; 
      phoneNumber: string;
      studentId: string;
      password: string;
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
      agreedToTerms: boolean
    } = body;


    if (!name || !email || !phoneNumber || !studentId || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    const existingEmailUser = await prisma.user.findUnique({ where: { email } });
    if (existingEmailUser) {
      return NextResponse.json({ error: 'Email address already in use.' }, { status: 409 });
    }

    const existingPhoneUser = await prisma.user.findUnique({ where: { phoneNumber } });
    if (existingPhoneUser) {
      return NextResponse.json({ error: 'Phone number already in use.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        student: {
          create: {
            studentId,
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
            agreedToTerms
          },
        },
      },
    });

    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (error: any) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'Failed to create user.' }, { status: 500 });
  }
}

// You can also add handlers for other HTTP methods (GET, PUT, DELETE, etc.)
// export async function GET(req: Request) {
//   // Handle GET requests
// }