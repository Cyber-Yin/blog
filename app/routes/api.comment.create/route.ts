import { ActionFunction, json } from "@remix-run/node";
import { createHash } from "crypto";

import DatabaseInstance from "@/lib/server/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  try {
    const data: {
      post_id: number;
      nick: string;
      email: string;
      link?: string;
      content: string;
      reply_id?: number;
    } = await request.json();

    if (data.reply_id) {
      const comment = await DatabaseInstance.comments.findUnique({
        select: {
          id: true,
          parent_id: true,
          nick: true,
        },
        where: {
          id: data.reply_id,
          is_hidden: 0,
        },
      });

      if (!comment) {
        return json(
          {
            message: "未找到评论",
            data: null,
          },
          {
            status: 404,
          },
        );
      }

      const emailMD5 = createHash("md5").update(data.email).digest("hex");

      await DatabaseInstance.comments.create({
        data: {
          post_id: data.post_id,
          is_hidden: 0,
          created_at: parseInt((Date.now() / 1000).toFixed(0)),
          nick: data.nick,
          email: data.email,
          email_md5: emailMD5,
          link: data.link,
          content: data.content,
          parent_id: comment.parent_id ? comment.parent_id : comment.id,
          reply_id: comment.id,
          reply_nick: comment.nick,
        },
      });
    } else {
      const emailMD5 = createHash("md5").update(data.email).digest("hex");

      await DatabaseInstance.comments.create({
        data: {
          post_id: data.post_id,
          is_hidden: 0,
          created_at: parseInt((Date.now() / 1000).toFixed(0)),
          nick: data.nick,
          email: data.email,
          email_md5: emailMD5,
          link: data.link,
          content: data.content,
        },
      });
    }

    return json({
      data: "创建成功",
    });
  } catch (e) {
    console.log(e);
    return json(
      {},
      {
        status: 500,
      },
    );
  }
};
