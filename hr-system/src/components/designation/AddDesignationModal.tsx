"use client";

import { useState } from "react";

interface AddDesignationModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches?: string[];
  departments?: string[];
  onAdd?: (data: {
    branchName: string;
    department: string;
    designationName: string;
  }) => void;
}

export default function AddDesignationModal({
  isOpen,
  onClose,
  branches = [],
  departments = [],
  onAdd,
}: AddDesignationModalProps) {
  const [branchName, setBranchName] = useState("");
  const [department, setDepartment] = useState("");
  const [designationName, setDesignationName] = useState("");

  if (!isOpen) return null;

  const resetAndClose = () => {
    setBranchName("");
    setDepartment("");
    setDesignationName("");
    onClose();
  };

  const handleAdd = () => {
    onAdd?.({ branchName, department, designationName });
    resetAndClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* Modal card: 796 x 298, radius 10, white bg, soft blue-tinted shadow */}
      <div
        className="w-[796px] max-w-[92vw] rounded-[10px] bg-white p-4"
        style={{
          boxShadow: "0px 6px 30px 0px rgba(134, 186, 203, 0.3)",
        }}
      >
        {/* Header with left accent bar */}
        <div className="flex items-center gap-2 border-l-4 border-[#00A2CA] pl-3 pb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Add Designation
          </h2>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3 px-1">
          {/* Branch Name */}
          <div className="relative">
            <select
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              className="h-[34px] w-full appearance-none rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-500 focus:border-[#00A2CA] focus:outline-none"
            >
              <option value="" disabled>
                Branch Name
              </option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▾
            </span>
          </div>

          {/* Department */}
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-[34px] w-full appearance-none rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-500 focus:border-[#00A2CA] focus:outline-none"
            >
              <option value="" disabled>
                Department
              </option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              ▾
            </span>
          </div>

          {/* Designation Name */}
          <input
            type="text"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
            placeholder="Designation Name"
            className="h-[34px] w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-500 placeholder:text-gray-400 focus:border-[#00A2CA] focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end gap-3 px-1">
          <button
            onClick={resetAndClose}
            className="h-9 w-[113px] rounded-md bg-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!branchName || !department || !designationName}
            className="h-9 w-[113px] rounded-md bg-[#00A2CA] text-sm font-medium text-white hover:bg-[#0090b3] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}