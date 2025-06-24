import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import useFetch from "../hooks/useFetch.js";



export default function UpdatePatientForm({ patient, onCancel, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    contact: "",
    department: "",
    status: "",
  });

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name || "",
        age: patient.age || "",
        contact: patient.contact || "",
        department: patient.department || "",
        status: patient.status || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.put(
      `http://localhost:8000/api/patients/${patient._id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      toast.success("Patient updated successfully");
      window.location.reload();//TODO:reload thik kro
      if (onSuccess) onSuccess(); 
      
      onCancel(); // close modal
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update patient");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Patient</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full border px-3 py-2 rounded"
            value={form.age}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact"
            className="w-full border px-3 py-2 rounded"
            value={form.contact}
            onChange={handleChange}
          />

          {patient?.department === undefined && (
            <>
              <input
                type="text"
                name="department"
                placeholder="Department"
                className="w-full border px-3 py-2 rounded"
                value={form.department}
                onChange={handleChange}
              />

              <select
                name="status"
                className="w-full border px-3 py-2 rounded"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Admitted">Admitted</option>
                <option value="Discharged">Discharged</option>
                <option value="Under Treatment">Under Treatment</option>
              </select>
            </>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
