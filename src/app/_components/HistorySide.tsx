"use client";
import { usePathname } from "next/navigation";

const HistorySide = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-[300px] flex-col items-center justify-start space-y-4 border-l bg-gray-100"></div>
  );
};
export default HistorySide;
