import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

export default function AddPatientForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    address: "",
  });
  const { getToken } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();
      await axios.post("http://localhost:8000/api/patients", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      toast.success(`🌿 Patient "${form.name}" added successfully!`);
      setForm({ name: "", age: "", gender: "Male", contact: "" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add patient.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-white via-green-50 to-teal-50 p-8 rounded-xl shadow-lg border border-teal-100 w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold text-teal-700 mb-6">
        ➕ Add New Patient
      </h2>

      <label className="block mb-2 text-teal-800 font-medium">Name</label>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full mb-4 p-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
      />

      <label className="block mb-2 text-teal-800 font-medium">Age</label>
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        required
        className="w-full mb-4 p-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
      />

      <label className="block mb-2 text-teal-800 font-medium">Gender</label>
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        className="w-full mb-4 p-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
      >
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <label className="block mb-2 text-teal-800 font-medium">
        Contact Number
      </label>
      <input
        type="text"
        name="contact"
        placeholder="Phone Number"
        value={form.contact}
        onChange={handleChange}
        required
        className="w-full mb-6 p-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      <label className="block mb-2 text-teal-800 font-medium">Address</label>
      <textarea
        name="address"
        placeholder="Home Address"
        value={form.address}
        onChange={handleChange}
        className="w-full mb-6 p-3 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
        rows="3"
      ></textarea>  

      <button
        type="submit"
        className="w-full bg-teal-600 text-white font-semibold py-3 rounded-md shadow-md hover:bg-teal-700 transition duration-300"
      >
        ➕ Add Patient
      </button>
    </form>
  );
}
