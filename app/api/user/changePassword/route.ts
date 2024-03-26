import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";

export async function PATCH(request: Request) {
  try {
    const { id, currentPassword, newPassword } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!await bcrypt.compare(currentPassword, user?.hashedPassword as string)) {
      throw new Error("Invalid Password");
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    return new Response(`${updatedUser}`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
