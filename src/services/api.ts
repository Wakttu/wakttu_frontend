import io from 'socket.io-client';

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const SOCKET = io(`${API_URL}/wakttu`);
