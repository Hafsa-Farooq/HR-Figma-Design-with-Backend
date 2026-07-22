"use client";

import { useEffect, useState } from "react";

interface Branch {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

interface EditingDesignation {
  id: string;
  name: string;
  branchId: string;
  departmentId: string;
}

interface AddDesignationModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches?: Branch[];
  departments?: Department[];
  editingDesignation?: EditingDesignation | null;
  onSubmit?: (
    data: { branchId: string; departmentId: string; name: string },
    id?: string
  ) => void;
}

export default function AddDesignationModal({
  isOpen,
  onClose,
  branches = [],
  departments = [],
  editingDesignation = null,
  onSubmit,
}: AddDesignationModalProps) {
  const [branchId, setBranchId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [designationName, setDesignationName] = useState("");

  const isEditMode = !!editingDesignation;

  useEffect(() => {
    if (editingDesignation) {
      setBranchId(editingDesignation.branchId);
      setDepartmentId(editingDesignation.departmentId);
      setDesignationName(editingDesignation.name);
    } else {
      setBranchId("");
      setDepartmentId("");
      setDesignationName("");
    }
  }, [editingDesignation, isOpen]);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setBranchId("");
    setDepartmentId("");
    setDesignationName("");
    onClose();
  };

  const handleSubmit = () => {
    onSubmit?.(
      { branchId, departmentId, name: designationName },
      editingDesignation?.id
    );
    resetAndClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="w-[796px] max-w-[92vw] rounded-[10px] bg-white p-4"
        style={{ boxShadow: "0px 6px 30px 0px rgba(134, 186, 203, 0.3)" }}
      >
        <div className="flex items-center gap-2 border-l-4 border-[#00A2CA] pl-3 pb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditMode ? "Edit Designation" : "Add Designation"}
          </h2>
        </div>

        <div className="flex flex-col gap-3 px-1">
          <div className="relative">
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="h-[34px] w-full appearance-none rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-500 focus:border-[#00A2CA] focus:outline-none"
            >
              <option value="" disabled>
                Branch Name
              </option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>

          <div className="relative">
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="h-[34px] w-full appearance-none rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-500 focus:border-[#00A2CA] focus:outline-none"
            >
              <option value="" disabled>
                Department
              </option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>

          <input
            type="text"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
            placeholder="Designation Name"
            className="h-[34px] w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-500 placeholder:text-gray-400 focus:border-[#00A2CA] focus:outline-none"
          />
        </div>

        <div className="mt-5 flex justify-end gap-3 px-1">
          <button
            onClick={resetAndClose}
            className="h-9 w-[113px] rounded-md bg-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!branchId || !departmentId || !designationName}
            className="h-9 w-[113px] rounded-md bg-[#00A2CA] text-sm font-medium text-white hover:bg-[#0090b3] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEditMode ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}