import { useState } from "react";
import api from "../services/api";

export default function ContributionForm({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/contributions", {
        amount,
        contribution_date: date
      });

      setAmount("");
      setDate("");
      onSuccess();
    } catch {
      alert("Failed to add contribution");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-bold mb-3">Add Contribution</h2>

      <input
        type="date"
        className="input mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        className="input mb-3"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleSubmit} className="btn">
        Submit Contribution
      </button>
    </div>
  );
}
