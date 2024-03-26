import prisma from "@/libs/prismadb";

export async function PATCH(request: Request) {
  try {
    const { profileUserId, userId } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid ID");
    }

    let updatedFollowingIds: string[] = [...user.followingIds];

    if (!user.followingIds.includes(profileUserId)) {
      // follow
      updatedFollowingIds.push(profileUserId);
    } else {
      // unFollow
      updatedFollowingIds = updatedFollowingIds.filter((followingId: string) => followingId !== profileUserId);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followingIds: updatedFollowingIds,
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
