import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddReceptionistForm({ onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

   const validatePassword = () => {
    const password = formData.password;
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }
    
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/users/receptionists", formData, {
        withCredentials: true,
      });
      toast.success("👩‍💼 Receptionist added successfully!");
      
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.");
      console.error("Error adding receptionist:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-white via-blue-50 to-green-50 p-8 rounded-xl shadow-md border border-blue-100 w-full max-w-lg"
    >
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">
        ➕ Add New Receptionist
      </h2>

      <label className="block mb-2 text-blue-800 font-medium">First Name</label>
      <input
        className="w-full mb-4 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        required
      />

      <label className="block mb-2 text-blue-800 font-medium">Last Name</label>
      <input
        className="w-full mb-4 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />

      <label className="block mb-2 text-blue-800 font-medium">Email</label>
      <input
        className="w-full mb-4 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="email"
        type="email"
        placeholder="Email Address"
        onChange={handleChange}
        required
      />

      <label className="block mb-2 text-blue-800 font-medium">Password</label>
      <input
        className="w-full mb-6 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        name="password"
        type="password"
        placeholder="Create Password"
        onChange={handleChange}
        onBlur={validatePassword}
        required
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          ➕ Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md shadow hover:bg-gray-400 transition"
        >
          ✖ Cancel
        </button>
      </div>
    </form>
  );
}
