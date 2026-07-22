"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import AddDesignationModal from "@/components/designation/AddDesignationModal";

interface Designation {
  id: string;
  name: string;
  branch: { id: string; name: string };
  department: { id: string; name: string };
}

interface Branch {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

const columns = ["S.No", "Branch", "Department", "Designation", "Action"];

export default function DesignationTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState<{
    id: string;
    name: string;
    branchId: string;
    departmentId: string;
  } | null>(null);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      setLoading(true);
      const [desigRes, branchRes, deptRes] = await Promise.all([
        fetch(`/api/designations`),
        fetch(`/api/branches`),
        fetch(`/api/departments`),
      ]);

      const desigData = desigRes.ok ? await desigRes.json() : [];
      const branchData = branchRes.ok ? await branchRes.json() : [];
      const deptData = deptRes.ok ? await deptRes.json() : [];

      setDesignations(Array.isArray(desigData) ? desigData : []);
      setBranches(Array.isArray(branchData) ? branchData : []);
      setDepartments(Array.isArray(deptData) ? deptData : []);

      if (!desigRes.ok) console.error("Designations fetch failed:", desigData);
      if (!branchRes.ok) console.error("Branches fetch failed:", branchData);
      if (!deptRes.ok) console.error("Departments fetch failed:", deptData);
    } catch (error) {
      console.error("Failed to load data:", error);
      setDesignations([]);
      setBranches([]);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function openAddModal() {
    setEditingDesignation(null);
    setIsModalOpen(true);
  }

  function openEditModal(row: Designation) {
    setEditingDesignation({
      id: row.id,
      name: row.name,
      branchId: row.branch.id,
      departmentId: row.department.id,
    });
    setIsModalOpen(true);
  }

  async function handleSubmit(
    data: { branchId: string; departmentId: string; name: string },
    id?: string
  ) {
    try {
      const url = id ? `/api/designations/${id}` : `/api/designations`;
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save designation");

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Designation save nahi ho saki. Dobara try karo.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Ye designation delete karni hai?")) return;
    try {
      await fetch(`/api/designations/${id}`, { method: "DELETE" });
      await loadData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_6px_30px_rgba(182,186,203,0.15)]">
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
            onClick={openAddModal}
            className="h-9 rounded-[6px] bg-[#00A2CA] px-6 text-sm font-medium text-white hover:bg-[#0090b3]"
          >
            Add Designation
          </button>
        </div>
      </div>

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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : designations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-400">
                  Koi designation nahi mili. "Add Designation" se naya banao.
                </td>
              </tr>
            ) : (
              designations.map((row, i) => (
                <tr key={row.id} className={i % 2 === 1 ? "bg-[#FBFBFD]" : "bg-white"}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{i + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.branch.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.department.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{row.name}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ActionIcon color="bg-violet-100 text-violet-500">
                        <Eye size={14} />
                      </ActionIcon>
                      <button onClick={() => openEditModal(row)}>
                        <ActionIcon color="bg-emerald-100 text-emerald-500">
                          <Pencil size={14} />
                        </ActionIcon>
                      </button>
                      <button onClick={() => handleDelete(row.id)}>
                        <ActionIcon color="bg-red-100 text-red-500">
                          <Trash2 size={14} />
                        </ActionIcon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddDesignationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branches={branches}
        departments={departments}
        editingDesignation={editingDesignation}
        onSubmit={handleSubmit}
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