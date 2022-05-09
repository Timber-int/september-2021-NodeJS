import { axiosService } from './axios.service';
import { urls } from '../config';

export const commentService = {
    getAll: () => axiosService.get(`${urls.comments}`)
        .then(value => value.data),
    create: (comment) => axiosService.post(`${urls.comments}`, comment)
        .then(value => value.data),
    action: (data) => axiosService.post(`${urls.comments}${urls.action}`, data)
        .then(value => value.data),
};


