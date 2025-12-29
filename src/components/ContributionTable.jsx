export default function ContributionTable({ contributions }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-3">My Contributions</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Amount ($)</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((c, index) => (
            <tr key={index}>
              <td className="p-2 border">{c.contribution_date}</td>
              <td className="p-2 border">${c.amount}</td>
              <td className="p-2 border">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
