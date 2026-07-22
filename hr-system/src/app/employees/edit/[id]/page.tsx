"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import FormCard from "@/components/FormCard";
import { FormInput, FormSelect, FileUploadRow } from "@/components/FormInput";

interface Option {
  id: string;
  name: string;
}

interface Designation extends Option {
  branchId: string;
  departmentId: string;
}

const initialForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  mobile: "",
  phone: "",
  email: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
  linkedin: "",
  addressLine1: "",
  addressLine2: "",
  employeeCode: "",
  branchId: "",
  departmentId: "",
  designationId: "",
  dateOfJoining: "",
  bankName: "",
  accountNo: "",
  swiftCode: "",
  passportNo: "",
  passportExpiry: "",
  workPermitNo: "",
  workPermitExpiry: "",
  drivingLicenseNo: "",
  drivingLicenseExpiry: "",
  contractNo: "",
  contractExpiry: "",
};

function toISODate(dateStr: string): string | undefined {
  if (!dateStr) return undefined;
  return new Date(dateStr).toISOString();
}

// Converts a full ISO datetime (from the DB) back to "YYYY-MM-DD" for <input type="date">
function toDateInputValue(isoStr: string | null | undefined): string {
  if (!isoStr) return "";
  return isoStr.slice(0, 10);
}

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState(initialForm);
  const [branches, setBranches] = useState<Option[]>([]);
  const [departments, setDepartments] = useState<Option[]>([]);
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [branchRes, deptRes, desigRes, empRes] = await Promise.all([
          fetch(`/api/branches`),
          fetch(`/api/departments`),
          fetch(`/api/designations`),
          fetch(`/api/employees/${id}`),
        ]);

        setBranches(branchRes.ok ? await branchRes.json() : []);
        setDepartments(deptRes.ok ? await deptRes.json() : []);

        const desigData = desigRes.ok ? await desigRes.json() : [];
        setDesignations(
          Array.isArray(desigData)
            ? desigData.map((d: any) => ({
                id: d.id,
                name: d.name,
                branchId: d.branch.id,
                departmentId: d.department.id,
              }))
            : []
        );

        if (empRes.ok) {
          const emp = await empRes.json();
          setForm({
            firstName: emp.firstName ?? "",
            lastName: emp.lastName ?? "",
            dateOfBirth: toDateInputValue(emp.dateOfBirth),
            mobile: emp.mobile ?? "",
            phone: emp.phone ?? "",
            email: emp.email ?? "",
            country: emp.country ?? "",
            state: emp.state ?? "",
            city: emp.city ?? "",
            zipCode: emp.zipCode ?? "",
            linkedin: emp.linkedin ?? "",
            addressLine1: emp.addressLine1 ?? "",
            addressLine2: emp.addressLine2 ?? "",
            employeeCode: emp.employeeCode ?? "",
            branchId: emp.branchId ?? "",
            departmentId: emp.departmentId ?? "",
            designationId: emp.designationId ?? "",
            dateOfJoining: toDateInputValue(emp.dateOfJoining),
            bankName: emp.bankName ?? "",
            accountNo: emp.accountNo ?? "",
            swiftCode: emp.swiftCode ?? "",
            passportNo: emp.passportNo ?? "",
            passportExpiry: toDateInputValue(emp.passportExpiry),
            workPermitNo: emp.workPermitNo ?? "",
            workPermitExpiry: toDateInputValue(emp.workPermitExpiry),
            drivingLicenseNo: emp.drivingLicenseNo ?? "",
            drivingLicenseExpiry: toDateInputValue(emp.drivingLicenseExpiry),
            contractNo: emp.contractNo ?? "",
            contractExpiry: toDateInputValue(emp.contractExpiry),
          });
        }
      } catch (error) {
        console.error("Failed to load employee:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const filteredDesignations = designations.filter(
    (d) =>
      (!form.branchId || d.branchId === form.branchId) &&
      (!form.departmentId || d.departmentId === form.departmentId)
  );

  async function handleSubmit() {
    if (!form.employeeCode || !form.firstName || !form.lastName || !form.email) {
      alert("Employee ID, First Name, Last Name aur Email zaroori hain.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        dateOfBirth: toISODate(form.dateOfBirth),
        dateOfJoining: toISODate(form.dateOfJoining),
        passportExpiry: toISODate(form.passportExpiry),
        workPermitExpiry: toISODate(form.workPermitExpiry),
        drivingLicenseExpiry: toISODate(form.drivingLicenseExpiry),
        contractExpiry: toISODate(form.contractExpiry),
      };

      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(
          `Save failed (status ${res.status}):\n${resData.message ?? "unknown"}\n${resData.error ?? ""}`
        );
        return;
      }

      router.push("/employees");
    } catch (error) {
      console.error(error);
      alert("Network error: " + String(error));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F5F6FA]">
        <Sidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="px-8 pb-10">
            <p className="text-sm text-gray-400">Loading...</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />

      <div className="flex-1">
        <DashboardHeader />

        <main className="px-8 pb-10">
          <p className="mb-6 flex h-[22px] items-center gap-1 text-sm text-gray-400">
            <span className="text-[#00A2CA]">Home</span>
            <span>&gt;</span>
            <span className="text-gray-900">Edit Employee</span>
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Personal Detail */}
            <FormCard title="Personal Detail">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(v) => updateField("firstName", v)}
                  required
                />
                <FormInput
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(v) => updateField("lastName", v)}
                  required
                />
                <FormInput
                  type="date"
                  placeholder="Date of Birth"
                  value={form.dateOfBirth}
                  onChange={(v) => updateField("dateOfBirth", v)}
                />
                <FormInput
                  placeholder="mobile"
                  value={form.mobile}
                  onChange={(v) => updateField("mobile", v)}
                  required
                />
                <FormInput
                  placeholder="phone"
                  value={form.phone}
                  onChange={(v) => updateField("phone", v)}
                />
                <FormInput
                  placeholder="Email"
                  value={form.email}
                  onChange={(v) => updateField("email", v)}
                  required
                />
                <FormInput
                  placeholder="country"
                  value={form.country}
                  onChange={(v) => updateField("country", v)}
                />
                <FormInput
                  placeholder="state"
                  value={form.state}
                  onChange={(v) => updateField("state", v)}
                />
                <FormInput
                  placeholder="city"
                  value={form.city}
                  onChange={(v) => updateField("city", v)}
                />
                <FormInput
                  placeholder="Zip Code"
                  value={form.zipCode}
                  onChange={(v) => updateField("zipCode", v)}
                />
                <FormInput
                  placeholder="linkedin"
                  value={form.linkedin}
                  onChange={(v) => updateField("linkedin", v)}
                />
                <FileUploadRow label="" />
                <div className="col-span-2">
                  <FormInput
                    placeholder="Address line 1"
                    value={form.addressLine1}
                    onChange={(v) => updateField("addressLine1", v)}
                  />
                </div>
                <div className="col-span-2">
                  <FormInput
                    placeholder="Address line 2"
                    value={form.addressLine2}
                    onChange={(v) => updateField("addressLine2", v)}
                  />
                </div>
              </div>
            </FormCard>

            {/* Right column: Company + Bank */}
            <div className="flex flex-col gap-6">
              <FormCard title="Company Detail">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <FormInput
                      placeholder="Employee ID"
                      value={form.employeeCode}
                      onChange={(v) => updateField("employeeCode", v)}
                      required
                    />
                  </div>
                  <FormSelect
                    placeholder="Select Branch"
                    value={form.branchId}
                    onChange={(v) => updateField("branchId", v)}
                    options={branches.map((b) => ({ value: b.id, label: b.name }))}
                    required
                  />
                  <FormSelect
                    placeholder="Department"
                    value={form.departmentId}
                    onChange={(v) => updateField("departmentId", v)}
                    options={departments.map((d) => ({ value: d.id, label: d.name }))}
                    required
                  />
                  <FormSelect
                    placeholder="Designation"
                    value={form.designationId}
                    onChange={(v) => updateField("designationId", v)}
                    options={filteredDesignations.map((d) => ({ value: d.id, label: d.name }))}
                    required
                  />
                  <FormInput
                    type="date"
                    placeholder="Date Of Joining"
                    value={form.dateOfJoining}
                    onChange={(v) => updateField("dateOfJoining", v)}
                  />
                </div>
              </FormCard>

              <FormCard title="Bank Detail">
                <div className="flex flex-col gap-4">
                  <FormInput
                    placeholder="Bank Name"
                    value={form.bankName}
                    onChange={(v) => updateField("bankName", v)}
                  />
                  <FormInput
                    placeholder="Account No"
                    value={form.accountNo}
                    onChange={(v) => updateField("accountNo", v)}
                  />
                  <FormInput
                    placeholder="Swift Code"
                    value={form.swiftCode}
                    onChange={(v) => updateField("swiftCode", v)}
                  />
                </div>
              </FormCard>
            </div>

            {/* Document Detail - text fields */}
            <FormCard title="Document Detail">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  placeholder="Passport No"
                  value={form.passportNo}
                  onChange={(v) => updateField("passportNo", v)}
                />
                <FormInput
                  type="date"
                  placeholder="Passport Expiry"
                  value={form.passportExpiry}
                  onChange={(v) => updateField("passportExpiry", v)}
                />
                <FormInput
                  placeholder="Work permit No"
                  value={form.workPermitNo}
                  onChange={(v) => updateField("workPermitNo", v)}
                />
                <FormInput
                  type="date"
                  placeholder="Work permit Expiry"
                  value={form.workPermitExpiry}
                  onChange={(v) => updateField("workPermitExpiry", v)}
                />
                <FormInput
                  placeholder="Driving license No"
                  value={form.drivingLicenseNo}
                  onChange={(v) => updateField("drivingLicenseNo", v)}
                />
                <FormInput
                  type="date"
                  placeholder="Driving License Expiry"
                  value={form.drivingLicenseExpiry}
                  onChange={(v) => updateField("drivingLicenseExpiry", v)}
                />
                <FormInput
                  placeholder="Contract No"
                  value={form.contractNo}
                  onChange={(v) => updateField("contractNo", v)}
                />
                <FormInput
                  type="date"
                  placeholder="Contract Expiry"
                  value={form.contractExpiry}
                  onChange={(v) => updateField("contractExpiry", v)}
                />
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

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => router.push("/employees")}
              className="h-10 rounded-md bg-gray-200 px-6 text-sm font-medium text-gray-600 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="h-10 rounded-md bg-[#00A2CA] px-6 text-sm font-medium text-white hover:bg-[#0090b3] disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Update Employee"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}