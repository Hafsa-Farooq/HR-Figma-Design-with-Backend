"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import AddDesignationModal from "@/components/designation/AddDesignationModal";

const designations = [
  { sno: 1, branch: "Canada", dept: "Technology", designation: "Systems manager" },
  { sno: 2, branch: "Dubai", dept: "Technology", designation: "Systems manager" },
  { sno: 3, branch: "KSA", dept: "Technology", designation: "Systems manager" },
  { sno: 4, branch: "Pakistan", dept: "Technology", designation: "Systems manager" },
  { sno: 5, branch: "USA", dept: "Technology", designation: "Systems manager" },
  { sno: 6, branch: "UAE", dept: "Technology", designation: "Systems manager" },
  { sno: 7, branch: "Shariah", dept: "Technology", designation: "Systems manager" },
];

const columns = ["S.No", "Branch", "Department", "Designation", "Action"];

export default function DesignationTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_6px_30px_rgba(182,186,203,0.15)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#EAEAEA] px-6 py-5">
        <input
          type="text"
          placeholder="Designation"
          className="h-[34px] w-[220px] rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#00A2CA]"
        />
        <select className="h-[34px] w-[200px] rounded-md border border-gray-200 px-3 text-sm text-gray-500 outline-none">
          <option>Department</option>
        </select>
        <select className="h-[34px] w-[200px] rounded-md border border-gray-200 px-3 text-sm text-gray-500 outline-none">
          <option>Branch</option>
        </select>

        <div className="ml-auto flex items-center gap-3">
          <button className="h-9 rounded-md bg-emerald-500 px-5 text-sm font-medium text-white hover:bg-emerald-600">
            Filters
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-9 rounded-[6px] bg-[#00A2CA] px-6 text-sm font-medium text-white hover:bg-[#0090b3]"
          >
            Add Designation
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8F9FD]">
              {columns.map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap px-6 py-4 text-left text-[15px] font-semibold leading-[22px] text-gray-800"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {designations.map((row, i) => (
              <tr key={row.sno} className={i % 2 === 1 ? "bg-[#FBFBFD]" : "bg-white"}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{row.sno}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.branch}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.dept}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.designation}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ActionIcon color="bg-violet-100 text-violet-500">
                      <Eye size={14} />
                    </ActionIcon>
                    <ActionIcon color="bg-emerald-100 text-emerald-500">
                      <Pencil size={14} />
                    </ActionIcon>
                    <ActionIcon color="bg-red-100 text-red-500">
                      <Trash2 size={14} />
                    </ActionIcon>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 px-6 py-5">
        {[1, 2, 3, 4].map((p) => (
          <button
            key={p}
            className={`flex h-8 w-8 items-center justify-center rounded-md text-sm ${
              p === 2 ? "bg-[#00A2CA] text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}
        <button className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100">
          →
        </button>
      </div>

      {/* Add Designation Modal */}
      <AddDesignationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branches={["Canada", "Dubai", "KSA", "Pakistan", "USA", "UAE", "Shariah"]}
        departments={["Technology", "HR", "Finance"]}
        onAdd={(data) => {
          console.log("New designation:", data);
          // TODO: yahan Prisma/Express API call lagana hai jab backend ready ho
        }}
      />
    </div>
  );
}

function ActionIcon({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className={`flex h-7 w-7 items-center justify-center rounded-md ${color}`}>
      {children}
    </div>
  );
}