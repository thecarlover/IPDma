import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export default function PatientDetailDashboard() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`http://localhost:8000/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatient(res.data);
      } catch (err) {
        setError("Error fetching patient data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />

      <main className="p-6 max-w-3xl mx-auto">
        <button
          className="text-blue-600 hover:underline mb-4"
          onClick={() => navigate(-1)}
        >
          ← Back to Dashboard
        </button>

        {loading ? (
          <p>Loading patient info...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : patient ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">👤 Patient Details</h2>
            <div className="space-y-2 text-gray-800">
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Phone:</strong> {patient.contact}</p>
              <p><strong>Address:</strong> {patient.address}</p>
              <p><strong>Doctor:</strong> {patient.doctor}</p>
              <p><strong>Disease:</strong> {patient.disease}</p>
              <p><strong>Admitted On:</strong> {new Date(patient.admittedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <p>Patient not found.</p>
        )}
      </main>
    </div>
  );
}
