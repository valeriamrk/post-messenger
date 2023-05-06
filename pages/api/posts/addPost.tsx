import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Please sign in to make a post" });

    console.log(req.body);
    const title: string = req.body.title;
    console.log(title, "titleee");

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    // Check the title
    if (title.length > 300) {
      return res.status(403).json({ message: "Please write a shorter post" });
    }
    if (!title.length) {
      return res
        .status(403)
        .json({ message: "Please do not leave this empty" });
    }
    // Create post
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ message: "Error has occured whilst making a post" });
    }
  }
}
