import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url as string);

    const postId = searchParams.get("postId");

    const comment = await prisma.comment.findMany({
      where: {
        postId: postId as string,
      },
      include: {
        user: true,
        post: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return Response.json(comment);
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { textContent, codeLanguage, codeContent, userId, postId } = await request.json();

    const comment = await prisma.comment.create({
      data: {
        textContent,
        codeLanguage,
        codeContent,
        userId,
        postId,
      },
    });

    return Response.json(comment);
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

    const comment = await prisma.comment.delete({
      where: {
        id: id as string,
      },
    });

    return new Response(`${comment}`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
