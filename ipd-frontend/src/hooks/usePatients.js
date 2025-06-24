// // src/hooks/usePatients.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function usePatients() {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/patients", { withCredentials: true })
//       .then((res) => setPatients(res.data))
//       .catch((err) => console.error("❌ Error fetching patients:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   return { patients, loading };
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export default function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = await getToken();
        const res = await axios.get("http://localhost:8000/api/patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPatients(res.data);
      } catch (err) {
        console.error("❌ Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return { patients, loading };
}
