import { useState } from "react";
import UpdatePatientForm from "./UpdatePatientForm";






export default function TodayPatientTable({ data, refetch }) {
  const [editingPatient, setEditingPatient] = useState(null);
  

  

  return (
    <>
      <table className="w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-md overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Contact</th>
            <th className="border px-4 py-2">Date Added</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p._id} className="hover:bg-gray-100 transition">
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.age}</td>
              <td className="border px-4 py-2">{p.contact}</td>
              <td className="border px-4 py-2">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => setEditingPatient(p)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                >
                  ✏️ Edit
                </button>

                
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

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

