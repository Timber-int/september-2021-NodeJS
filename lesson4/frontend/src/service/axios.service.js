import axios from 'axios';
import { baseURL } from '../config';

export const axiosService = axios.create({ baseURL });
