"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { editProfileModalClose, isEditProfileModalOpen } from "./editProfileModalSlice";
import Modal from "@/components/modals/Modal";
import Input from "@/components/elements/Input";
import ImageDropZone from "@/components/ImageDropZone";
import { useAppContext } from "@/context/AppContext";
import { UserType } from "@/type/user.type";

export function EditProfileModal() {
  const isOpen = useAppSelector(isEditProfileModalOpen);
  const dispatch = useAppDispatch();

  const { users, setUsers, currentUser, setCurrentUser } = useAppContext();

  const [name, setName] = useState<string>("");
  const [isNameError, setIsNameError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [isUsernameError, setIsUsernameError] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [iconImage, setIconImage] = useState<string>("");
  const [headerImage, setHeaderImage] = useState<string>("");

  const handleSetName = useCallback((newName: string) => {
    setName(newName);

    if (users?.some((user) => user.name === newName && currentUser?.name !== newName)) {
      setIsNameError(true);
    } else {
      setIsNameError(false);
    }
  }, [users]);

  const handleSetUserName = useCallback((newUsername: string) => {
    setUsername(newUsername);

    if (users?.some((user) => user.username === newUsername && currentUser?.username !== newUsername)) {
      setIsUsernameError(true);
    } else {
      setIsUsernameError(false);
    }
  }, [users]);

  useEffect(() => {
    setName(currentUser?.name as string);
    setUsername(currentUser?.username as string);
    setBio(currentUser?.bio as string);
    setLocation(currentUser?.location as string);
    setWebsite(currentUser?.website as string);
    setIconImage(currentUser?.iconImage as string);
    setHeaderImage(currentUser?.headerImage as string);
  }, [currentUser?.name, currentUser?.username, currentUser?.email, currentUser?.bio, currentUser?.location, currentUser?.website, currentUser?.iconImage, currentUser?.headerImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="relative h-72">
        <div className="h-52 max-h-52 bg-gray-800">
          <ImageDropZone value={headerImage} onChange={(image: string) => setHeaderImage(image)} />
        </div>
        <div className="absolute w-40 h-40 bottom-2 left-6 rounded-full bg-gray-600">
          <ImageDropZone value={iconImage} onChange={(image: string) => setIconImage(image)} isRoundedFull />
        </div>
      </div>
      <Input type="text" placeholder="name" value={name} error={isNameError} errorMessage="This name is already used." onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetName(e.target.value)} />
      <Input type="text" placeholder="username" value={username} error={isUsernameError} errorMessage="This username is already used." onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetUserName(e.target.value)} />
      <textarea placeholder="bio" value={bio} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)} className="h-40 p-4 rounded-lg text-xl border border-gray-600 resize-none bg-black"></textarea>
      <Input type="location" placeholder="location" value={location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
      <Input type="website" placeholder="website" value={website} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)} />
    </div>
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const editResponse = await fetch("/api/user/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser?.id,
          name,
          username,
          bio,
          location,
          website,
          iconImage,
          headerImage,
        }),
      });

      if (editResponse.ok) {
        const currentUserResponse = await fetch(`/api/user?&id=${currentUser?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const currentUserData = await currentUserResponse.json();

        setCurrentUser(currentUserData);

        setUsers(users?.map((user: UserType) => {
          if (user.id === currentUserData.id) {
            return currentUserData;
          } else {
            return user;
          }
        }) as UserType[]);

        dispatch(editProfileModalClose());
        toast.success("Successfully edited.");
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id, name, username, bio, location, website, iconImage, headerImage]);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title="Edit Profile" bodyContent={bodyContent} buttonLabel="Save" disabled={name === "" || isNameError || username === "" || isUsernameError} loading={loading} handleSubmit={handleSubmit} handleClose={() => dispatch(editProfileModalClose())} confirmBeforeClose={true} />
  );
}
