
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const useModifyReceptionist()=>{
    const navigate = useNavigate();
    const [receptionist, setReceptionist] = useState({
        name: '',
        email: '',
       
}