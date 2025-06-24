import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";


export const useDeletePatient = () => {
    const { getToken } = useAuth();
  const deletePatient = async (id, onSuccess) => {
    
    try {
          const token = await getToken();
      await axios.delete(`http://localhost:8000/api/patients/${id}`,
         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
     
      
      toast.success("Patient deleted successfully");
      if (onSuccess) onSuccess();
       window.location.reload();//TODO:reload thik kro
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete patient");
    }
  };

  return deletePatient;
};

