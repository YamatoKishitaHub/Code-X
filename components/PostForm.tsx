"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { LanguageSupport } from "@codemirror/language";

import { codeLanguages } from "@/const/codeLanguages";
import Button from "./elements/Button";
import { useAppDispatch } from "@/app/hooks";
import { postModalClose } from "@/features/modal/postModalSlice";
import { loginModalOpen } from "@/features/modal/loginModalSlice";
import { useAppContext } from "@/context/AppContext";

type PostFormProps = {
  isComment?: boolean;
}

const PostForm = ({ isComment }: PostFormProps) => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { currentUser, comments, setComments } = useAppContext();

  const [textContent, setTextContent] = useState<string>("");
  const [codeLanguage, setCodeLanguage] = useState<string>(codeLanguages[0].name);
  const [codeContent, setCodeContent] = useState<string>("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeTextContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      // 改行に合わせてtextareaの高さを変更
      textareaRef.current.style.height = String(28 * ((e.target.value.match(/\n/g) || []).length + 1)) + "px";
    }

    setTextContent(e.target.value);
  };

  const handleChangeCodeContent = useCallback((val: string) => {
    setCodeContent(val);
  }, []);

  const [loading, setLoading] = useState<boolean>(false);

  const handlePostSubmit = useCallback(async () => {
    try {
      setLoading(true);

      await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textContent,
          codeLanguage,
          codeContent,
          userId: currentUser?.id,
        }),
      });

      toast.success("Post sent successfully.");
      dispatch(postModalClose());

      setTextContent("");
      setCodeLanguage(codeLanguages[0].name);
      setCodeContent("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [textContent, codeLanguage, codeContent, currentUser?.id]);

  const handleCommentSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const commentResponse = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          textContent,
          codeLanguage,
          codeContent,
          userId: currentUser?.id,
          postId: params.postId,
        }),
      });
      const commentData = await commentResponse.json();

      comments?.push(commentData);
      setComments(comments);

      toast.success("Comment sent successfully.");
      dispatch(postModalClose());

      setTextContent("");
      setCodeLanguage(codeLanguages[0].name);
      setCodeContent("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [textContent, codeLanguage, codeContent, currentUser?.id, params.postId, comments]);

  return (
    <div className="flex flex-row gap-4 p-4">
      <div>
        {currentUser?.iconImage ? (
          <Image src={currentUser?.iconImage as string} width={50} height={50} alt="Icon Image" />
        ) : (
          <>
            <FaUserCircle size={32} className="lg:hidden" />
            <FaUserCircle size={48} className="hidden lg:block" />
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 w-[calc(100%-60px)] max-w-[calc(100%-60px)] text-left">
        <textarea ref={textareaRef} placeholder="What's your message?" value={textContent} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChangeTextContent(e)} className="w-full min-h-[56px] max-h-[50vh] resize-none outline-none text-xl bg-black"></textarea>
        <div className="w-full max-w-full">
          <select className="p-1 border border-gray-600 bg-gray-900" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCodeLanguage(e.target.value)}>
            {codeLanguages.map((codeLanguage) => (
              <option value={codeLanguage.name} key={codeLanguage.name}>
                {codeLanguage.name}
              </option>
            ))}
          </select>
          <CodeMirror
            placeholder="Let's share your code!"
            value={codeContent}
            height="50vh"
            extensions={[
              codeLanguages.find((codeLanguage_: { name: string, extensions: LanguageSupport }) => codeLanguage_.name === codeLanguage)?.extensions as Extension
            ]}
            theme={"dark"}
            onChange={handleChangeCodeContent}
          />
        </div>
        <div className="flex justify-end">
          <Button
            label={!isComment ? "Post" : "Reply"}
            bgColor="blue"
            disabled={textContent === "" || codeContent === ""}
            loading={loading}
            onClick={currentUser ? (!isComment ? handlePostSubmit : handleCommentSubmit) : () => dispatch(loginModalOpen())}
          />
        </div>
      </div>
    </div>
  );
};

export default PostForm;
