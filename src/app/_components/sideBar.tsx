"use client";
import {
  ChartArea,
  Folder,
  FolderArchive,
  Library,
  PanelRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SideBarLeft = () => {
  const pathname = usePathname();
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={`flex h-screen flex-col items-center justify-start space-y-4 border-r bg-gray-100 ${collapse ? "w-[80px]" : "w-[300px]"} transition-all duration-300 ease-in-out`}
    >
      <div
        className={`flex w-full cursor-pointer ${
          collapse ? "justify-center" : "justify-end pr-4"
        } pt-4`}
        onClick={() => setCollapse(!collapse)}
      >
        <PanelRight
          className={`transition-transform duration-300 ${collapse ? "rotate-180" : ""}`}
        />
      </div>

      <div className="w-full px-2">
        <button className="flex w-full items-center justify-center gap-2 rounded border bg-white py-2 text-slate-600">
          <Folder size={20} />
          <span
            className={`overflow-hidden transition-all duration-300 ${
              collapse ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            New project
          </span>
        </button>
      </div>

      <div className="w-full flex-1 rounded-t-3xl bg-white px-2 pt-8">
        {[
          { href: "/aichat", icon: <ChartArea size={20} />, text: "Ai Chat" },
          {
            href: "/projects",
            icon: <FolderArchive size={20} />,
            text: "Projects",
          },
          {
            href: "/collection",
            icon: <Library size={20} />,
            text: "Collection",
          },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-start gap-2 px-4 py-2 ${
              pathname === item.href
                ? "rounded-lg bg-orange-500 text-white"
                : ""
            }`}
          >
            {item.icon}
            <span
              className={`overflow-hidden transition-all duration-300 ${
                collapse ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              {item.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBarLeft;
