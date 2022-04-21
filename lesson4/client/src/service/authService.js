import { axiosService } from './axios.service';
import { urls } from '../constants';

export const authService ={
    registration: (user)=>axiosService.post(`${urls.auth}${urls.registration}`,user),
}
