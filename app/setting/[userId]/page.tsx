"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import TopHeader from "@/components/TopHeader";
import Input from "@/components/elements/Input";
import { useAppContext } from "@/context/AppContext";
import Button from "@/components/elements/Button";
import { deleteAccountModalOpen } from "@/features/modal/deleteAccountModalSlice";

const page = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const params = useParams();

  const { currentUser, setCurrentUser } = useAppContext();

  useEffect(() => {
    document.title = "Setting";
  }, []);

  const [email, setEmail] = useState<string>(currentUser?.email as string);
  const [isEmailError, setIsEmailError] = useState<boolean>(false);

  const handleSetEmail = (newEmail: string) => {
    setEmail(newEmail);
    setIsEmailError(false);
  };

  const [currentPassword, setCurrentPassword] = useState<string>("");
  // DBにあるパスワードとcurrentPasswordが一致するか
  const [isCurrentPasswordMatch, setIsCurrentPasswordMatch] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // newPasswordとconfirmPasswordが一致するか
  const [isPasswordsMatch, setIsPasswordsMatch] = useState<boolean>(false);

  const handleSetCurrentPassword = (newCurrentPassword: string) => {
    setCurrentPassword(newCurrentPassword);
    setIsCurrentPasswordMatch(true);
  };

  const handleSetNewPassword = (newNewPassword: string) => {
    setNewPassword(newNewPassword);
    if (confirmPassword) {
      setIsPasswordsMatch(newNewPassword !== "" && newNewPassword === confirmPassword);
    }
  };

  const handleSetConfirmPassword = (newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
    setIsPasswordsMatch(newConfirmPassword !== "" && newPassword === newConfirmPassword);
  };

  const [changeEmailLoading, setChangeEmailLoading] = useState<boolean>(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState<boolean>(false);

  const handleChangeEmail = useCallback(async () => {
    try {
      setChangeEmailLoading(true);

      const changeEmailResponse = await fetch("/api/user/changeEmail", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser?.id,
          email,
        }),
      });
      const changeEmailData = await changeEmailResponse.json();

      if (changeEmailResponse.ok) {
        setCurrentUser(changeEmailData);
        toast.success("Successfully changed");
      } else {
        setIsEmailError(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setChangeEmailLoading(false);
    }
  }, [currentUser?.id, email]);

  const handleChangePassword = useCallback(async () => {
    try {
      setChangePasswordLoading(true);

      const changePasswordResponse = await fetch("/api/user/changePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser?.id,
          currentPassword,
          newPassword,
        }),
      });

      if (changePasswordResponse.ok) {
        toast.success("Successfully changed");
      } else {
        setIsCurrentPasswordMatch(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setChangePasswordLoading(false);
    }
  }, [currentUser?.id, currentPassword, newPassword]);

  if (params.userId !== currentUser?.id) {
    router.push("/");
  }

  return (
    <div>
      <TopHeader label="Setting" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 p-4">
          <div className="text-xl">
            Change your email
          </div>
          <div className="flex flex-col gap-2">
            <Input type="email" placeholder="New email" value={email} error={isEmailError} errorMessage="This email is already used" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetEmail(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <Button label="Save" textSize="text-xl" bgColor="blue" disabled={email === "" || email === currentUser?.email} loading={changeEmailLoading} onClick={handleChangeEmail} />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="text-xl">
            Change your password
          </div>
          <div className="flex flex-col gap-2">
            <Input type="password" placeholder="Current password" value={currentPassword} error={!isCurrentPasswordMatch} errorMessage="Current Password doesn't match" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetCurrentPassword(e.target.value)} />
            <Input type="password" placeholder="New password" value={newPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetNewPassword(e.target.value)} />
            <Input type="password" placeholder="Confirm password" value={confirmPassword} error={!isPasswordsMatch && newPassword !== "" && confirmPassword !== ""} errorMessage="Passwords don't match" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetConfirmPassword(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <Button label="Save" textSize="text-xl" bgColor="blue" disabled={currentPassword === "" || !isPasswordsMatch} loading={changePasswordLoading} onClick={handleChangePassword} />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="text-xl">
            Delete your account
          </div>
          <div className="flex flex-col gap-2">
            Once an account is deleted, it cannot be restored. 
          </div>
          <div className="flex justify-end">
            <Button label="Delete" textSize="text-xl" bgColor="red" onClick={() => dispatch(deleteAccountModalOpen())} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
