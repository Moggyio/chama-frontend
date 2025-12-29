import { useEffect, useState } from "react";
import api from "../services/api";
import LogoutButton from "../components/LogoutButton";

export default function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState([]);

  const fetchMembers = async () => {
    const res = await api.get("/admin/members");
    setMembers(res.data);
  };

  const fetchContributions = async () => {
    const res = await api.get("/admin/contributions");
    setContributions(res.data);
  };

  const fetchMonthlySummary = async () => {
    const res = await api.get("/admin/summary/monthly");
    setMonthlySummary(res.data);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/contributions/${id}/status`, { status });
      fetchContributions();
      fetchMonthlySummary();
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchContributions();
    fetchMonthlySummary();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            Admin Dashboard
          </h1>
          <LogoutButton />
        </div>

        {/* MONTHLY SUMMARY */}
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-lg font-bold mb-3">Monthly Summary</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Month</th>
                <th className="p-2 border">Total Collected ($)</th>
              </tr>
            </thead>
            <tbody>
              {monthlySummary.map((m, i) => (
                <tr key={i}>
                  <td className="p-2 border">{m.month}</td>
                  <td className="p-2 border">${m.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MEMBERS */}
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-lg font-bold mb-3">Members</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td className="p-2 border">{m.full_name}</td>
                  <td className="p-2 border">{m.email}</td>
                  <td className="p-2 border">{m.phone}</td>
                  <td className="p-2 border">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CONTRIBUTIONS */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-3">Contributions</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Member</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Amount ($)</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((c) => (
                <tr key={c.id}>
                  <td className="p-2 border">{c.full_name}</td>
                  <td className="p-2 border">{c.email}</td>
                  <td className="p-2 border">${c.amount}</td>
                  <td className="p-2 border">{c.contribution_date}</td>
                  <td className="p-2 border">{c.status}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                      disabled={c.status === "confirmed"}
                      onClick={() => updateStatus(c.id, "confirmed")}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                      disabled={c.status === "rejected"}
                      onClick={() => updateStatus(c.id, "rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
