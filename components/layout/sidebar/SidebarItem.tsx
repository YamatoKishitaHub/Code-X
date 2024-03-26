import { ReactNode } from "react";

type SidebarItemProps = {
  label: string;
  content: ReactNode;
};

const SidebarItem = ({ label, content }: SidebarItemProps) => {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-3xl bg-gray-800">
      <div className="text-xl">
        {label}
      </div>
      <div>
        {content}
      </div>
    </div>
  );
};

export default SidebarItem;
