import { useEffect, useState } from "react";
import api from "../services/api";
import ContributionForm from "../components/ContributionForm";
import ContributionTable from "../components/ContributionTable";
import LogoutButton from "../components/LogoutButton";

export default function MemberDashboard() {
  const [contributions, setContributions] = useState([]);

  const fetchContributions = async () => {
    const res = await api.get("/contributions/me");
    setContributions(res.data);
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-600">
            Member Dashboard
          </h1>
          <LogoutButton />
        </div>

        <ContributionForm onSuccess={fetchContributions} />
        <ContributionTable contributions={contributions} />
      </div>
    </div>
  );
}
