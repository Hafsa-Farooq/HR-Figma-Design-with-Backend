import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const employees = [
  { id: "#MZ-001", name: "Harry Porter", email: "anjoli@gmail.com", dept: "Technology", designation: "Systems manager", mobile: "0332-963963", date: "1 March, 2023", avatar: "/em1.png" },
  { id: "#MZ-002", name: "Lary go", email: "anjoli@gmail.com", dept: "Technology", designation: "Systems manager", mobile: "0332-963963", date: "1 March, 2023", avatar: "/em2.png" },
  { id: "#MZ-003", name: "Sumona Gang", email: "anjoli@gmail.com", dept: "Technology", designation: "Systems manager", mobile: "0332-963963", date: "1 March, 2023", avatar: "/em3.png" },
  { id: "#MZ-004", name: "David Morph", email: "anjoli@gmail.com", dept: "Technology", designation: "Systems manager", mobile: "0332-963963", date: "1 March, 2023", avatar: "/em4.png" },
  { id: "#MZ-005", name: "Willium Cany", email: "anjoli@gmail.com", dept: "Technology", designation: "Systems manager", mobile: "0332-963963", date: "1 March, 2023", avatar: "/em5.png" },
  { id: "#MZ-006", name: "Keny Dinen", email: "anjoli@gmail.com", dept: "Technology", designation: "Systems manager", mobile: "0332-963963", date: "1 March, 2023", avatar: "/em6.png" },
  { id: "#MZ-007", name: "Frintim Zomata", email: "anjoli@gmail.com", dept: "Technology", designation: "Systems manager", mobile: "0332-963963", date: "1 March, 2023", avatar: "/em7.png" },
];

const columns = ["Employee ID", "Name", "Email", "Department", "Designation", "Mobile No", "Date Of Joining", "Action"];

export default function EmployeeTable() {
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
            {employees.map((emp, i) => (
              <tr key={emp.id} className={i % 2 === 1 ? "bg-[#FBFBFD]" : "bg-white"}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{emp.id}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-200">
                      <Image src={emp.avatar} alt={emp.name} fill className="object-cover" />
                    </div>
                    <span className="text-sm text-gray-800">{emp.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.email}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.dept}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.designation}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.mobile}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{emp.date}</td>
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