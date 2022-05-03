import { axiosService } from './axios.service';
import { urls } from '../config';

export const authService = {
    registration: (user) => axiosService.post(`${urls.auth}${urls.registration}`,user)
        .then(value => value.data),
};
