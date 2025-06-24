import useFetchReceptionists from "../hooks/useFetchReceptionists";

export default function ReceptionistList() {
  const { receptionists, loading } = useFetchReceptionists();

  if (loading) return <p>Loading receptionists...</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Receptionist List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {receptionists.map((r) => (
            <tr key={r._id}>
              <td className="border px-4 py-2">{r.name}</td>
              <td className="border px-4 py-2">{r.email}</td>
              <td className="border px-4 py-2 flex gap-2"><button className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-amber-500 cursor-pointer">Edit</button>
              <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-amber-700 cursor-pointer">Delete</button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
