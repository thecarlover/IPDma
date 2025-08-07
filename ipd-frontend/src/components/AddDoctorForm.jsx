import { useState } from "react";
import usePostDoctor from "../hooks/usePostDoctor";

export default function AddDoctorForm({ onSuccess }) {
  const { postDoctor, loading, error } = usePostDoctor();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    experience: 0,
    specialization: "",
    languages: ["Hindi", "English"],
    availableDays: [],
    photoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await postDoctor(formData);
    if (success && onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" className="input" />
      <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="input" />
      <input name="contact" value={formData.contact} onChange={handleChange} required placeholder="Contact" className="input" />
      <input name="specialization" value={formData.specialization} onChange={handleChange} required placeholder="Specialization" className="input" />
      <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="Experience in Years" className="input" />
      <input name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="Photo URL (optional)" className="input" />
      
      <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
        {loading ? "Creating..." : "Add Doctor"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
