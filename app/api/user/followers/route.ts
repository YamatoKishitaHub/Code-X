import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url as string);

    const profileUserId = searchParams.get("profileUserId");

    const user = await prisma.user.count({
      where: {
        followingIds: {
          has: profileUserId,
        },
      },
    });

    return Response.json(user);
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
