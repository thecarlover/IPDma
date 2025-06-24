import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/useFetch";
import AddPatientForm from "../components/AddPatientForm";
import TodayPatientTable from "../components/TodayPatientTable";

export default function ReceptionDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [section, setSection] = useState("today");
  const { data, loading, fetchData } = useFetch();

  useEffect(() => {
    if (section === "today") fetchData("/api/patients/today");
  }, [section]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} onSelect={setSection} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-2">
            {section === "today" ? "Today’s Patients" : "Add New Patient"}
          </h1>

          {section === "today" ? (
            loading ? (
              <p>Loading...</p>
            ) : (
              <TodayPatientTable data={data} />
            )
          ) : (
            <div className="max-w-xl mb-6">
              <AddPatientForm reFetch={() => fetchData("/api/patients/today")} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
