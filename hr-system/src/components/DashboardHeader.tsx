import { Menu, Search, Globe, SlidersHorizontal, Mail, Bell } from "lucide-react";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <div className="flex h-[86px] items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <Menu size={20} className="text-gray-600" />
        <h1 className="text-xl font-semibold text-gray-900">
          Hello Thomas <span>👋</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Search - pill shaped */}
        <div className="flex h-[40px] w-[255px] items-center gap-2 rounded-[54px] border border-[#EAEAEA] px-4">
          <input
            type="text"
            placeholder="Search Here . . ."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          <Search size={16} className="text-gray-400" />
        </div>

        <div className="flex items-center gap-4 text-gray-500">
          <button className="flex items-center gap-1 text-sm">
            <Globe size={18} />
            English
          </button>
          <SlidersHorizontal size={18} />
          <Mail size={18} />
          <Bell size={18} />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image src="/header-profile-img.png" alt="Jhon Smith" fill className="object-cover" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">Jhon Smith</p>
            <p className="flex items-center gap-1 text-xs text-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}