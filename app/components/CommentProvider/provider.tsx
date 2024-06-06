import axios from "axios";
import dayjs from "dayjs";
import { createContext, useEffect, useState } from "react";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { CommentType } from "@/lib/types/comment";

import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Dialog, DialogContent, DialogHeader } from "../Dialog";
import { Drawer, DrawerContent, DrawerHeader } from "../Drawer";
import { Input } from "../Input";
import { Textarea } from "../Textarea";

export const CommentContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedComment: CommentType | undefined;
  setSelectedComment: (comment: CommentType) => void;
  postId: number;
  setPostId: (postId: number) => void;
} | null>(null);

const CommentProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentType>();
  const [postId, setPostId] = useState(0);

  return (
    <CommentContext.Provider
      value={{
        open: modalOpen,
        setOpen: setModalOpen,
        selectedComment,
        setSelectedComment,
        postId,
        setPostId,
      }}
    >
      {children}
      <CommentModal
        open={modalOpen}
        setOpen={setModalOpen}
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        postId={postId}
        setPostId={setPostId}
      />
    </CommentContext.Provider>
  );
};

const CommentModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedComment: CommentType | undefined;
  setSelectedComment: (comment: CommentType | undefined) => void;
  postId: number;
  setPostId: (postId: number) => void;
}> = ({
  open,
  setOpen,
  postId,
  setPostId,
  selectedComment,
  setSelectedComment,
}) => {
  const { isMobile } = useMediaQuery();

  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (rememberMe) {
      window.localStorage.setItem(
        "remember-comment-template",
        JSON.stringify({
          nick: nick ? nick : "",
          email: email ? email : "",
          link: link ? link : "",
        }),
      );
    }

    setOpen(false);
    setNick("");
    setEmail("");
    setLink("");
    setComment("");
    setPostId(0);
    setSelectedComment(undefined);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!nick || !email || !comment) {
        return;
      }

      if (selectedComment) {
        await axios.post("/api/comment/create", {
          post_id: postId,
          nick,
          email,
          link: link ? link : undefined,
          content: comment,
          reply_id: selectedComment.id,
        });
      } else {
        await axios.post("/api/comment/create", {
          post_id: postId,
          nick,
          email,
          link: link ? link : undefined,
          content: comment,
        });
      }

      handleClose();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    const rememberSet = window.localStorage.getItem(
      "remember-comment-template",
    );

    if (rememberSet) {
      try {
        const template: {
          nick: string;
          email: string;
          link: string;
        } = JSON.parse(rememberSet);

        setNick(template.nick);
        setEmail(template.email);
        setLink(template.link);

        if (template.nick || template.email || template.link) {
          setRememberMe(true);
        }
      } catch (e) {
        setRememberMe(false);
      }
    }
  }, [open]);

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
      >
        <DrawerContent className="px-4 pb-8">
          <DrawerHeader className="text-lg">发表评论</DrawerHeader>
          {selectedComment && (
            <div className="no-scrollbar flex max-h-[10vh] w-full space-x-3 overflow-y-scroll">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md bg-secondary">
                <img
                  className="h-full w-full"
                  src={`https://cravatar.cn/avatar/${selectedComment.email_md5}`}
                  alt="avatar"
                />
              </div>
              <div className="w-full space-y-4">
                <div className="flex h-8 items-center space-x-3">
                  {selectedComment.link ? (
                    <a
                      href={selectedComment.link}
                      target="_blank"
                      className="transition-colors hover:text-theme"
                    >
                      {selectedComment.nick}
                    </a>
                  ) : (
                    <div>{selectedComment.nick}</div>
                  )}
                  <div className="text-xs text-secondary">
                    {selectedComment.created_at}
                  </div>
                </div>
                <div className="overflow-hidden whitespace-pre rounded-md bg-secondary px-3 py-2 text-sm/8">
                  {selectedComment.content}
                </div>
              </div>
            </div>
          )}
          <div className="no-scrollbar max-h-[50vh] w-full space-y-4 overflow-y-scroll pb-4 pt-2">
            <div className="text-sm">昵称</div>
            <Input
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder="请输入昵称"
            />
            <div className="text-sm">邮箱</div>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="用于邮件通知"
            />
            <div className="text-sm">网站</div>
            <Input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="用于链接到您的网站"
            />
            <div className="text-sm">评论内容</div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="请输入评论内容"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={() => setRememberMe((prev) => !prev)}
              />
              <div className="text-sm/4 text-secondary">记住我的选项</div>
            </div>
            <Button
              disabled={loading}
              onClick={() => handleSubmit()}
            >
              提交
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader className="text-lg">发表评论</DialogHeader>
        {selectedComment && (
          <div className="no-scrollbar flex max-h-[10vh] w-full space-x-3 overflow-y-scroll">
            <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md bg-secondary">
              <img
                className="h-full w-full"
                src={`https://cravatar.cn/avatar/${selectedComment.email_md5}`}
                alt="avatar"
              />
            </div>
            <div className="w-full space-y-4">
              <div className="flex h-8 items-center space-x-3">
                {selectedComment.link ? (
                  <a
                    href={selectedComment.link}
                    target="_blank"
                    className="transition-colors hover:text-theme"
                  >
                    {selectedComment.nick}
                  </a>
                ) : (
                  <div>{selectedComment.nick}</div>
                )}
                <div className="text-xs text-secondary">
                  {dayjs
                    .unix(selectedComment.created_at)
                    .format("YYYY-MM-DD HH:mm:ss")}
                </div>
              </div>
              <div className="overflow-hidden whitespace-pre rounded-md bg-secondary px-3 py-2 text-sm/8">
                {selectedComment.content}
              </div>
            </div>
          </div>
        )}
        <div className="no-scrollbar max-h-[50vh] w-full space-y-4 overflow-y-scroll py-2">
          <div className="text-sm">昵称</div>
          <Input
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            placeholder="请输入昵称"
          />
          <div className="text-sm">邮箱</div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="用于邮件通知"
          />
          <div className="text-sm">网站</div>
          <Input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="用于链接到您的网站"
          />
          <div className="text-sm">评论内容</div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="请输入评论内容"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={rememberMe}
              onCheckedChange={() => setRememberMe((prev) => !prev)}
            />
            <div className="text-sm/4 text-secondary">记住我的选项</div>
          </div>
          <Button
            disabled={loading}
            onClick={() => handleSubmit()}
          >
            提交
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentProvider;
