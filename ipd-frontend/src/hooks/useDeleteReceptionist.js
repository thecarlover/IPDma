import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';


export const useDeleteReciptionist=()=>{
    const {getToken}=useAuth();

    const deleteReciptionist=async(id,onSuccess)=>{
        try{
            const token= await getToken();
            await axios.delete(`http://localhost:8000/api/users/receptionists/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                },
            }
            );
            console.log("Deleting receptionist with ID:", id);
            toast.success("receptionist deleted");
            if (onSuccess) onSuccess();
            // window.location.reload();
            window.reload();

        }
        catch(error){
            console.error("deletiong error",error);
            toast.error("error deleting receptionist");
            }
        };

        return deleteReciptionist;
    
}