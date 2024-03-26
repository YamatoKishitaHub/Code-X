import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url as string);

    const id = searchParams.get("id");

    let user;

    if (id) {
      // 指定のユーザーを取得
      user = await prisma.user.findUnique({
        where: {
          id: id as string,
        },
        include: {
          posts: true,
          comment: true,
        },
      });
    } else {
      // 全てのユーザーを取得
      user = await prisma.user.findMany();
    }

    return Response.json(user);
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

    // ユーザーの投稿とコメントを削除
    const posts = await prisma.post.findMany({
      where: {
        userId: id as string,
      },
    });

    for (let i = 0; i < posts.length; i++) {
      await prisma.comment.deleteMany({
        where: {
          postId: posts[i].id,
        },
      });
    }

    await prisma.post.deleteMany({
      where: {
        userId: id as string,
      },
    });

    // 削除するユーザーをフォローしているユーザーのフォローを外す
    const users = await prisma.user.findMany({
      where: {
        followingIds: {
          has: id,
        },
      },
    });

    for (let i = 0; i < users.length; i++) {
      await prisma.user.update({
        where: {
          id: users[i].id,
        },
        data: {
          followingIds: users[i].followingIds.filter((followingId) => followingId !== id),
        },
      });
    }

    const user = await prisma.user.delete({
      where: {
        id: id as string,
      },
    });

    return new Response(`${user}`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(`${error}`, {
      status: 400,
    });
  }
}
