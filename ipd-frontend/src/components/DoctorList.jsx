export default function DoctorList({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300 rounded-lg">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Specialization</th>
            <th className="px-4 py-2">Experience</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((doc) => (
            <tr key={doc._id} className="border-t">
              <td className="px-4 py-2">{doc.name}</td>
              <td className="px-4 py-2">{doc.email}</td>
              <td className="px-4 py-2">{doc.contact}</td>
              <td className="px-4 py-2">{doc.specialization}</td>
              <td className="px-4 py-2">{doc.experience} yrs</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => {
                    const url = `/admin/doctor/${doc._id}`;
                    console.log("Opening new tab for:", url);
                    window.open(url, "_blank");
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  🩺 View
                </button>
                <button
                  onClick={() => {
                    console.log("Edit doctor:", doc._id);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => {
                    console.log("Delete doctor:", doc._id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
              </td> {/* ✅ Proper closing added here */}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
