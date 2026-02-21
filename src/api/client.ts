import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 15000,
});

api.interceptors.request.use(async (config) => {
    try {
        if (Platform.OS !== 'web') {
            const token = await SecureStore.getItemAsync('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } else {
            // On web, use localStorage (if needed) or skip secure store
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch (error) {
        console.error('Error fetching token', error);
    }
    return config;
});

export default api;
