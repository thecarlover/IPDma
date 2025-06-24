import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function useFetchReceptionists() {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
   
    
    const fetchReceptionists = async () => {
         
        
      try {
        const token = await getToken();
        const res = await axios.get("http://localhost:8000/api/users/receptionists",
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
        );
    
        setReceptionists(res.data);
      } catch (err) {
        console.error("Error fetching receptionists", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceptionists();
  }, []);

  return { receptionists, loading };
}
