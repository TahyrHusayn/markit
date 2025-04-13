import { prisma } from "@/db";
import bcrypt from "bcrypt";

async function seed() {
  const superAdminEmail = "yartipawar@jjtu.ac.in";
  const superAdminPassword = "NuBXcmtZ%YBYz%2NqG2c";
  const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (!existingSuperAdmin) {
    const newUser = await prisma.user.create({
      data: {
        email: superAdminEmail,
        password: hashedPassword,
        name: "Super Admin", // You can set a default name
        phoneNumber: "", // Set a default phone number
        role: "SUPER_ADMIN",
        superAdmin: {
          create: {}, // No additional fields in SuperAdmin model currently
        },
      },
    });
    console.log("Initial Super Admin created");
  } else {
    console.log("Initial Super Admin already exists.");
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
