import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddReceptionistForm from "../components/AddReceptionistForm";
import AddPatientForm from "../components/AddPatientForm";
import useFetch from "../hooks/useFetch";
import TodayPatientTable from "../components/TodayPatientTable";
import AllPatientsTable from "../components/AllPatientsTable";
import ReceptionistList from "../components/ReceptionistList";
import AddDoctorForm from "../components/AddDoctorForm";
import DoctorList from "../components/DoctorList";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [section, setSection] = useState("today");
  const { data, loading, fetchData } = useFetch();

  useEffect(() => {
    const endpoint =
      section === "today"
        ? "/api/patients/today"
        : section === "all"
        ? "/api/patients"
        : null;

    if (endpoint) fetchData(endpoint);
  }, [section]);

  useEffect(() => {
    let endpoint = null;

    if (section === "today") endpoint = "/api/patients/today";
    else if (section === "all") endpoint = "/api/patients";
    else if (section === "adddoctor") endpoint = "/api/doctors";

    if (endpoint) fetchData(endpoint);
  }, [section]);

  return (
    <div className="flex font-sans bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <Sidebar open={sidebarOpen} onSelect={setSection} />

      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="p-6">
          <h1 className="text-3xl font-semibold mb-6 text-green-700">
            {
              {
                today: "🌿 Today’s Healing Journeys",
                all: "📋 All Patients Records",
                add: "➕ Add New Patient",
                receptionist: "👩‍⚕️ Register Receptionist",
                showreceptionist: "👥 All Receptionists",
              }[section]
            }
          </h1>

          {(section === "today" || section === "all") && (
            <>
              {loading ? (
                <p className="text-gray-500 italic">Fetching patient data...</p>
              ) : data.length === 0 ? (
                <p className="text-gray-600 italic">
                  No patient records found.
                </p>
              ) : section === "today" ? (
                <TodayPatientTable data={data} />
              ) : (
                <AllPatientsTable data={data} />
              )}
            </>
          )}

          {section === "add" && (
            <div className="max-w-2xl mt-4 bg-white p-6 rounded-lg shadow-md">
              <AddPatientForm
                onSuccess={() => {
                  setSection("all");
                  fetchData("/api/patients");
                }}
              />
            </div>
          )}

          {section === "receptionist" && (
            <div className="max-w-2xl mt-4 bg-white p-6 rounded-lg shadow-md">
              <AddReceptionistForm />
            </div>
          )}
          {section === "showreceptionist" && (
            <div className="max-w-2xl mt-4 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">
                👥 All Receptionists
              </h2>
              <ReceptionistList />

              <p className="text-gray-600">
                Receptionist list will be displayed here.
              </p>
            </div>
          )}

          {/* {section === "adddoctor" && (
            <div className="max-w-2xl mt-4 bg-white p-6 rounded-lg shadow-md">
              <AddDoctorForm
                onSuccess={() => {
                  setSection("today"); // or redirect wherever needed
                }}
              />
            </div>
          )} */}

          {section === "adddoctor" && (
            <div className="max-w-4xl mt-4 bg-white p-6 rounded-lg shadow-md">
              <AddDoctorForm
                onSuccess={() => {
                  fetchData("http://localhost:8000/api/doctors");
                }}
              />

              <hr className="my-6 border-gray-300" />

              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                👨‍⚕️ All Registered Doctors
              </h2>

              {loading ? (
                <p className="text-gray-500 italic">Fetching doctor data...</p>
              ) : data.length === 0 ? (
                <p className="text-gray-600 italic">No doctor found.</p>
              ) : (
                <DoctorList data={data} />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
