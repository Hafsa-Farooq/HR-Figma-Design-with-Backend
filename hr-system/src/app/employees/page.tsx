import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import EmployeeTable from "@/components/EmployeeTable";

export default function EmployeesPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="px-8 pb-10">
         <p className="mb-6 flex h-[22px] items-center gap-1 text-sm text-gray-400">
  <span className="text-[#00A2CA]">Home</span>
  <span>&gt;</span>
 <span className="text-gray-900">Add Employee</span>  
</p>

          <EmployeeTable />
        </main>
      </div>
    </div>
  );
}