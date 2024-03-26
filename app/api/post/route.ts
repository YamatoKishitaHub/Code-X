import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { textContent, codeLanguage, codeContent, userId } = await request.json();

    const post = await prisma.post.create({
      data: {
        textContent,
        codeLanguage,
        codeContent,
        userId,
      },
    });

    return new Response(`${post}`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url as string);

    const id = searchParams.get("id");

    await prisma.comment.deleteMany({
      where: {
        postId: id as string,
      },
    });

    const post = await prisma.post.delete({
      where: {
        id: id as string,
      },
    });

    return new Response(`${post}`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
