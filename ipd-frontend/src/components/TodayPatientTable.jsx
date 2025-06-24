import { useState } from "react";
import UpdatePatientForm from "./UpdatePatientForm";
import { useDeletePatient } from "../hooks/useDeletePatient.js"; 





export default function TodayPatientTable({ data, refetch }) {
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);

  const deletePatient = useDeletePatient();

  

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

                <button
                  onClick={() => setDeletingPatient(p)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                >
                  🗑️ Delete
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
      {deletingPatient && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {deletingPatient.name}?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDeletingPatient(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deletePatient(deletingPatient._id, refetch);
                  setDeletingPatient(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}

