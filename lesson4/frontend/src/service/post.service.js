import { axiosService } from './axios.service';
import { urls } from '../config';

export const postService = {
    create: (post) => axiosService.post(`${urls.posts}`, post)
        .then(value => value.data),
    getAll: () => axiosService.get(`${urls.posts}`)
        .then(value => value.data),
};
