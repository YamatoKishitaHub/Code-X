import prisma from "@/libs/prismadb";

export async function PATCH(request: Request) {
  try {
    const { id, name, username, bio, location, website, iconImage, headerImage } = await request.json();

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        bio,
        location,
        website,
        iconImage,
        headerImage,
      },
    });

    return new Response(`${updateUser}`, {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
