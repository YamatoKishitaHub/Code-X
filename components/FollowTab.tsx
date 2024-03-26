import Link from "next/link";

type FollowTabProps = {
  profileUserId: string;
  state: "following" | "followers";
};

const FollowTab = ({ profileUserId, state }: FollowTabProps) => {
  return (
    <div className="flex justify-center gap-4 p-2 text-xl border-b border-gray-500">
      <Link href={`/profile/${profileUserId}/following`} className={`${state === "following" && "underline"} decoration-4 decoration-blue-500`}>
        following
      </Link>
      <Link href={`/profile/${profileUserId}/followers`} className={`${state === "followers" && "underline"} decoration-4 decoration-blue-500`}>
        followers
      </Link>
    </div>
  );
}

export default FollowTab;