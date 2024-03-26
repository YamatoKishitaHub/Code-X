import prisma from "@/libs/prismadb";

export async function PATCH(request: Request) {
  try {
    const { id, email } = await request.json();

    const sameEmailUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (sameEmailUser) {
      throw new Error("Invalid email");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
      },
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
