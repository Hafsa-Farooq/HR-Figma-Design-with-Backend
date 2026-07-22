"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfJoining: string | null;
  department: { name: string };
  designation: { name: string };
}

const columns = ["Employee ID", "Name", "Email", "Department", "Designation", "Mobile No", "Date Of Joining", "Action"];

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadEmployees() {
    try {
      setLoading(true);
      const res = await fetch(`/api/employees`);
      const data = res.ok ? await res.json() : [];
      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Ye employee delete karna hai?")) return;
    try {
      await fetch(`/api/employees/${id}`, { method: "DELETE" });
      await loadEmployees();
    } catch (error) {
      console.error(error);
    }
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_6px_30px_rgba(182,186,203,0.15)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#CECECE] px-6 py-5">
        <input
          type="text"
          placeholder="Employee Name"
          className="h-[34px] w-[220px] rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#00A2CA]"
        />
        <input
          type="text"
          placeholder="Employee ID"
          className="h-[34px] w-[180px] rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#00A2CA]"
        />
        <select className="h-[34px] w-[200px] rounded-md border border-gray-200 px-3 text-sm text-gray-500 outline-none">
          <option>Employee Designation</option>
        </select>

        <div className="ml-auto flex items-center gap-3">
          <button className="h-9 rounded-md bg-emerald-500 px-5 text-sm font-medium text-white hover:bg-emerald-600">
            Filters
          </button>
          <Link
            href="/employees/add"
            className="flex h-9 items-center rounded-[6px] bg-[#00A2CA] px-6 text-sm font-medium text-white hover:bg-[#0090b3]"
          >
            Add Employee
          </Link>
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
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-sm text-gray-400">
                  Koi employee nahi mila. "Add Employee" se naya banao.
                </td>
              </tr>
            ) : (
              employees.map((emp, i) => (
                <tr key={emp.id} className={i % 2 === 1 ? "bg-[#FBFBFD]" : "bg-white"}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{emp.employeeCode}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                        {emp.firstName[0]}
                        {emp.lastName[0]}
                      </div>
                      <span className="text-sm text-gray-800">
                        {emp.firstName} {emp.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.email}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.department?.name ?? "-"}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.designation?.name ?? "-"}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.mobile}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(emp.dateOfJoining)}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ActionIcon color="bg-violet-100 text-violet-500">
                        <Eye size={14} />
                      </ActionIcon>
                      <Link href={`/employees/edit/${emp.id}`}>
                        <ActionIcon color="bg-emerald-100 text-emerald-500">
                          <Pencil size={14} />
                        </ActionIcon>
                      </Link>
                      <button onClick={() => handleDelete(emp.id)}>
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