import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prisma } from "@/db";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      id: "Credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        studenId: { label: "Student ID", type: "text", placeholder: "22bc8010" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.studenId || !credentials.password) {
            throw new Error("Student ID and password are required");
          }
          const { studenId, password } = credentials;

          // Find existing user
          const existingUser = await prisma.user.findFirst({
            where: { student: {
              studentId: studenId
            } },
          });

          if (existingUser) {
            // Compare provided password with stored hash
            const passwordValidation = await bcrypt.compare(password, (existingUser.password ?? ""));
            if (passwordValidation) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.email,
              };
            } else {
              throw new Error("Invalid password");
            }
          } else {
            // Hash the provided password
            // const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await prisma.user.create({
              data: {
                name: "",
                email: "",
                phoneNumber: "",
                role: "STUDENT",
                student: {
                  create: {
                    studentId: ""
                  }
                }
              },
            });
            return {
              id: newUser.id.toString(),
              name: newUser.name,
              email: newUser.email,
            };
          }
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Failed to authorize user");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
