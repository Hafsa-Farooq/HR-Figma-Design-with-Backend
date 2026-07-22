import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import DesignationTable from "@/components/designation/DesignationTable";

export default function DesignationPage() {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="px-8 pb-10">
          <p className="mb-6 text-sm text-gray-400">
            <span className="text-[#00A2CA]">Home</span> &gt; <span className="text-gray-900">Designation</span>
          </p>

          <DesignationTable />
        </main>
      </div>
    </div>
  );
}