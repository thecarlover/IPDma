import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export default function usePostDoctor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  const postDoctor = async (doctorData) => {
    setLoading(true);
    setError("");
    try {
      const token = await getToken();
      await axios.post("http://localhost:8000/api/doctors", doctorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { postDoctor, loading, error };
}
