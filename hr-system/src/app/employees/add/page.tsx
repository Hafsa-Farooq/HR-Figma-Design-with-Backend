import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import FormCard from "@/components/FormCard";
import { FormInput, FormSelect, FileUploadRow } from "@/components/FormInput";

export default function AddEmployeePage() {
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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Personal Detail */}
            <FormCard title="Personal Detail">
              <div className="grid grid-cols-2 gap-4">
                <FormInput placeholder="First Name" />
                <FormInput placeholder="Last name" />
                <FormInput placeholder="Date of Birth" />
                <FormInput placeholder="mobile" />
                <FormInput placeholder="phone" />
                <FormInput placeholder="Email" />
                <FormSelect placeholder="country" />
                <FormInput placeholder="state" />
                <FormInput placeholder="city" />
                <FormInput placeholder="Zip Code" />
                <FormInput placeholder="linkedin" />
                <FileUploadRow label="" />
                <div className="col-span-2">
                  <FormInput placeholder="Address line 1" />
                </div>
                <div className="col-span-2">
                  <FormInput placeholder="Address line 2" />
                </div>
              </div>
            </FormCard>

            {/* Right column: Company + Bank */}
            <div className="flex flex-col gap-6">
              <FormCard title="Company Detail">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <FormInput placeholder="Employee ID" />
                  </div>
                  <FormSelect placeholder="Select Branch" />
                  <FormSelect placeholder="Department" />
                  <FormSelect placeholder="Designation" />
                  <FormInput placeholder="Date Of Joining" />
                </div>
              </FormCard>

              <FormCard title="Bank Detail">
                <div className="flex flex-col gap-4">
                  <FormInput placeholder="Bank Name" />
                  <FormInput placeholder="Account No" />
                  <FormInput placeholder="Swift Code" />
                </div>
              </FormCard>
            </div>

            {/* Document Detail - text fields */}
            <FormCard title="Document Detail">
              <div className="grid grid-cols-2 gap-4">
                <FormInput placeholder="Passport No" />
                <FormInput placeholder="Passport Expiry" />
                <FormInput placeholder="Work permit No" />
                <FormInput placeholder="Work permit Expiry" />
                <FormInput placeholder="Driving license No" />
                <FormInput placeholder="Driving License Expiry" />
                <FormInput placeholder="Contract No" />
                <FormInput placeholder="Contract Expiry" />
                <FormInput placeholder="National id" />
                <FormInput placeholder="National id Expiry" />
              </div>
            </FormCard>

            {/* Document Detail - file uploads */}
            <FormCard title="Document Detail">
              <div className="flex flex-col gap-5">
                <FileUploadRow label="Passport" />
                <FileUploadRow label="Work Permit" />
                <FileUploadRow label="Driving License" />
                <FileUploadRow label="National ID" />
              </div>
            </FormCard>
          </div>
        </main>
      </div>
    </div>
  );
}