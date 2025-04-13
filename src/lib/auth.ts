import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/db";
import { User } from "@/generated/prisma";

// Define a custom user type that extends the built-in NextAuth User
type CustomUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: "STUDENT" | "ADMIN" | "SUPER_ADMIN";
};

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "me@example.com",
          optional: true,
        },
        studentId: {
          label: "Student ID",
          type: "text",
          placeholder: "22bc8010",
          optional: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      // In your auth.ts, within the authorize function:
      async authorize(credentials: any) {
        try {

          if (!credentials || !credentials.password) {
            throw new Error("Password is required");
          }

          const { studentId, password, email } = credentials;

          // Check if we have either email or studentId
          if (
            (!email || email === "undefined") &&
            (!studentId || studentId === "undefined")
          ) {
            throw new Error("Email or Student ID is required");
          }

          let existingUser: User | null = null;

          if (email && email !== "undefined") {
            existingUser = await prisma.user.findFirst({
              where: {
                email: email,
                role: { in: ["ADMIN", "SUPER_ADMIN"] },
              },
            });
          } else if (studentId && studentId !== "undefined") {
            existingUser = await prisma.user.findFirst({
              where: {
                student: {
                  studentId: studentId,
                },
              },
              include: {
                student: true,
              },
            });
          }

          if (!existingUser) {
            return null;
          } else if (!existingUser.password) {
            throw new Error("User has no password set");
          }

          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              role: existingUser.role,
            } as CustomUser;
          } else {
            throw new Error("Invalid password");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Failed to authorize user");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token when a user signs in
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as
          | "STUDENT"
          | "ADMIN"
          | "SUPER_ADMIN"
          | undefined;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
