import SidebarItem from "./SidebarItem";
import SidebarPosts from "./SidebarPosts";
import SidebarUsers from "./SidebarUsers";

const Sidebar = () => {
  const sidebarItems = [
    {
      label: "Popular posts",
      content: (<SidebarPosts />),
    },
    {
      label: "Who to follow",
      content: (<SidebarUsers />),
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-2 pt-8">
      {sidebarItems.map((sidebar) => (
        <SidebarItem key={sidebar.label} label={sidebar.label} content={sidebar.content} />
      ))}
    </div>
  );
};

export default Sidebar;
