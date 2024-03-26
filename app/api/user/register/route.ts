import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      },
    });

    return new Response(`${user}`, {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
