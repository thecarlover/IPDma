import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePatientForm from "./UpdatePatientForm";
import { Link } from "react-router-dom";

export default function AllPatientsTable({ data, refetch }) {
  const [editingPatient, setEditingPatient] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Age</th>
              <th className="px-4 py-3 border-b">Contact</th>
              <th className="px-4 py-3 border-b">Department</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Date Added</th>
              <th className="px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p._id} className="hover:bg-green-50 transition">
                <td className="px-4 py-2 border-b">{p.name}</td>
                <td className="px-4 py-2 border-b">{p.age}</td>
                <td className="px-4 py-2 border-b">{p.contact}</td>
                <td className="px-4 py-2 border-b">{p.department}</td>
                <td className="px-4 py-2 border-b">{p.status}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button
                    onClick={() => setEditingPatient(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm">
                    🗑️ Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = `/admin/patient/${p._id}`;
                      console.log("Opening new tab for:", url);
                      window.open(url, "_blank");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
                  >
                    🩺 Full IPD View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPatient && (
        <UpdatePatientForm
          patient={editingPatient}
          onCancel={() => setEditingPatient(null)}
          onSuccess={() => {
            setEditingPatient(null);
            if (refetch) refetch();
          }}
        />
      )}
    </>
  );
}
