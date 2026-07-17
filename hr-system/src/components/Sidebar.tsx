"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  PieChart,
  ChevronDown,
  DollarSign,
  Briefcase,
  Clock,
  MessageSquare,
  Users,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [employeeOpen, setEmployeeOpen] = useState(true);
  const [salaryOpen, setSalaryOpen] = useState(false);

  return (
    <aside className="sticky top-0 flex h-screen w-[256px] shrink-0 flex-col overflow-y-auto bg-[#00A2CA] text-white">
      {/* Logo */}
      <div className="px-10 pt-[47px] pb-8">
        <div className="relative h-[33px] w-[150px]">
          <Image src="/em-logo.png" alt="anez" fill className="object-contain" priority />
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4 text-sm">
        <SidebarItem icon={<PieChart size={18} />} label="Dashboard" href="/" active={pathname === "/"} />

        <div>
          <button
            onClick={() => setEmployeeOpen(!employeeOpen)}
            className="flex w-full items-center justify-between rounded-lg bg-white/10 px-4 py-3 font-medium"
          >
            <span className="flex items-center gap-3">
              <Users size={18} />
              Employee
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${employeeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {employeeOpen && (
            <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/20 pl-4">
              <SubItem label="Employee" href="/employees" active={pathname === "/employees"} />
              <SubItem label="Documents" href="/employees/documents" active={pathname === "/employees/documents"} />
              <SubItem label="Assets" href="/employees/assets" active={pathname === "/employees/assets"} />
              <SubItem label="Designation" href="/designation" active={pathname === "/designation"} />
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setSalaryOpen(!salaryOpen)}
            className="flex w-full items-center justify-between rounded-lg px-4 py-3 hover:bg-white/10"
          >
            <span className="flex items-center gap-3">
              <DollarSign size={18} />
              Salary
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${salaryOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <SidebarItem icon={<Briefcase size={18} />} label="Projects" href="/projects" active={pathname === "/projects"} />
        <SidebarItem icon={<Clock size={18} />} label="Time Sheet" href="/time-sheet" active={pathname === "/time-sheet"} />
        <SidebarItem icon={<MessageSquare size={18} />} label="Messages" href="/messages" active={pathname === "/messages"} />
        <SidebarItem icon={<Users size={18} />} label="Users" href="/users" active={pathname === "/users"} />
        <SidebarItem icon={<Shield size={18} />} label="Role" href="/role" active={pathname === "/role"} />
      </nav>
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
        active ? "bg-white/10 font-medium" : "hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function SubItem({ label, href, active }: { label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 py-2 transition-colors ${
        active ? "font-medium text-white" : "text-white/90 hover:text-white"
      }`}
    >
      <ArrowRight size={14} />
      {label}
    </Link>
  );
}