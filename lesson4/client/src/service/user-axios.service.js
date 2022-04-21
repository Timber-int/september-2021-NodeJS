import { axiosService } from './axios.service';
import { urls } from '../constants';

const userService = {
    getByEmail: (email) => axiosService.get(`${urls.users}/${email}`),
};

export { userService };
