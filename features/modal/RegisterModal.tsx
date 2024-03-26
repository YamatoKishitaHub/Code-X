"use client";

import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { registerModalClose, isRegisterModalOpen } from "./registerModalSlice";
import { loginModalOpen } from "./loginModalSlice";
import Modal from "@/components/modals/Modal";
import Input from "@/components/elements/Input";
import { useAppContext } from "@/context/AppContext";

export function RegisterModal() {
  const isOpen = useAppSelector(isRegisterModalOpen);
  const dispatch = useAppDispatch();

  const { users, setCurrentUser } = useAppContext();

  const [name, setName] = useState<string>("");
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isUsernameError, setIsUsernameError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleSetName = useCallback((newName: string) => {
    setName(newName);

    if (users?.some((user) => user.name === newName)) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }
  }, [users]);

  const handleSetUserName = useCallback((newUsername: string) => {
    setUsername(newUsername);

    if (users?.some((user) => user.username === newUsername)) {
      setIsUsernameError(true);
    } else {
      setIsUsernameError(false);
    }
  }, [users]);

  const handleSetEmail = useCallback((newEmail: string) => {
    setEmail(newEmail);

    if (users?.some((user) => user.email === newEmail)) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
  }, [users]);

  const handleToggleModal = () => {
    dispatch(registerModalClose());
    dispatch(loginModalOpen());
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input type="text" placeholder="name" value={name} error={isNameError} errorMessage="This name is already used." onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetName(e.target.value)} />
      <Input type="text" placeholder="username" value={username} error={isUsernameError} errorMessage="This username is already used." onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetUserName(e.target.value)} />
      <Input type="email" placeholder="email" value={email} error={isEmailError} errorMessage="This email is already used." onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetEmail(e.target.value)}
      />
      <Input type="password" placeholder="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
    </div>
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const registerResponse = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });
      const registerData = await registerResponse.json();

      if (registerResponse.ok) {
        toast.success("Welcome to Code X.");
        dispatch(registerModalClose());

        const signInResponse = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (signInResponse?.ok) {
          const currentUserResponse = await fetch(`/api/user/current?&email=${email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const currentUserData = await currentUserResponse.json();

          setCurrentUser(currentUserData);

          setName("");
          setUsername("");
          setEmail("");
          setIsEmailError(false);
          setPassword("");
        } else {
          toast.error("Email or password is incorrect.");
        }
      } else {
        setIsEmailError(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [name, username, email, password]);

  const footerContent = (
    <div className="flex justify-center gap-4">
      <div>
        Already have an account?
      </div>
      <div onClick={handleToggleModal} className="text-blue-500 cursor-pointer">
        Login
      </div>
    </div>
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="Create an account" bodyContent={bodyContent} buttonLabel="Register" disabled={name === "" || isNameError || username === "" || isUsernameError || email === "" || isEmailError || password === ""} loading={loading} handleSubmit={handleSubmit} footerContent={footerContent} handleClose={() => dispatch(registerModalClose())} />
  );
}
