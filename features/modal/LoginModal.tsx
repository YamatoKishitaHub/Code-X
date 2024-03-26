"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { loginModalClose, isLoginModalOpen, setHrefAfterLogin, hrefAfterLoginValue, openPostModalAfterLoginValue, setOpenPostModalAfterLogin } from "./loginModalSlice";
import { registerModalOpen } from "./registerModalSlice";
import Modal from "@/components/modals/Modal";
import Input from "@/components/elements/Input";
import { useAppContext } from "@/context/AppContext";
import { postModalOpen } from "./postModalSlice";

export function LoginModal() {
  const isOpen = useAppSelector(isLoginModalOpen);
  const hrefAfterLogin = useAppSelector(hrefAfterLoginValue);
  const openModalAfterLogin = useAppSelector(openPostModalAfterLoginValue);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { setCurrentUser } = useAppContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInError, setSignInError] = useState<boolean>(false);

  const handleToggleModal = () => {
    dispatch(loginModalClose());
    dispatch(registerModalOpen());
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div>
        If you want to login without user registration,<br />please login with email as test@gmail.com and password as test.
      </div>
      <Input type="email" placeholder="email" value={email} error={signInError} errorMessage="Email or password is incorrect" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
      <Input type="password" placeholder="password" value={password} error={signInError} errorMessage="Email or password is incorrect" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
    </div>
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const signInResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResponse?.ok) {
        const currentUserResponse = await fetch(`/api/user/current?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const currentUserData = await currentUserResponse.json();

        setCurrentUser(currentUserData);

        dispatch(loginModalClose());

        if (hrefAfterLogin) {
          router.push(hrefAfterLogin + "/" + currentUserData.id);
        }
        if (openModalAfterLogin) {
          dispatch(postModalOpen());
        }

        dispatch(setHrefAfterLogin(null));
        dispatch(setOpenPostModalAfterLogin(false));

        toast.success("Welcome back.");
      } else {
        setSignInError(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [email, password, hrefAfterLogin, openModalAfterLogin]);

  const footerContent = (
    <div>
      {/* TODO パスワードを忘れたときの処理 */}
      {/* <div className="flex justify-center gap-4">
        <div>
          Forget your password?
        </div>
        <div className="text-blue-500 cursor-pointer">
          Reset your password
        </div>
      </div> */}
      <div className="flex justify-center gap-4">
        <div>
          Don't have an account?
        </div>
        <div onClick={handleToggleModal} className="text-blue-500 cursor-pointer">
          Create an account
        </div>
      </div>
    </div>
  );

  const handleClose = () => {
    dispatch(loginModalClose());
    dispatch(setHrefAfterLogin(null));
    dispatch(setOpenPostModalAfterLogin(false));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="Login to Code X" bodyContent={bodyContent} buttonLabel="Login" disabled={email === "" || password === ""} loading={loading} handleSubmit={handleSubmit} footerContent={footerContent} handleClose={handleClose} />
  );
}
