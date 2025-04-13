import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
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
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      id: "Credentials",
      name: "Credentials",
      type: "credentials",
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
          console.log("Credentials received:", credentials); // Log the credentials

          if (!credentials || !credentials.password) {
            console.log("Password is required");
            throw new Error("Password is required");
          }

          const { studentId, password, email } = credentials;

          if (!email && !studentId) {
            console.log("Email or Student ID is required");
            throw new Error("Email or Student ID is required");
          }

          let existingUser: User | null = null;

          if (email) {
            console.log("Searching for user with email:", email);
            existingUser = await prisma.user.findFirst({
              where: {
                email: email,
                role: { in: ["ADMIN", "SUPER_ADMIN"] },
              },
            });
          } else if (studentId) {
            console.log("Searching for user with studentId:", studentId);
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

          console.log("User found:", existingUser); // Log the user object (or null)

          if (!existingUser) {
            console.log("User not found");
            return null;
          }

          if (!existingUser.password) {
            console.log("User has no password set");
            throw new Error("User has no password set");
          }

          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );
          console.log("Password match:", passwordValidation); // Log the result of password comparison

          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              role: existingUser.role,
            } as CustomUser;
          } else {
            console.log("Invalid password");
            throw new Error("Invalid password");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Failed to authorize user");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as
          | "STUDENT"
          | "ADMIN"
          | "SUPER_ADMIN"
          | undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as CustomUser).role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
