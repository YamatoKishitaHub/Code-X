import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url as string);

    const email = searchParams.get("email");

    const currentUser = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    return Response.json(currentUser);
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
