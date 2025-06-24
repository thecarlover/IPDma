import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await axios.get(`http://localhost:8000${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchData };
}
