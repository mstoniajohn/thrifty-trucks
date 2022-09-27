// export const API_URL =
// 	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
const dev = process.env.NODE_ENV !== 'production';
export const API_URL = dev
	? 'http://127.0.0.1:8000'
	: process.env.NEXT_PUBLIC_API_URL;
export const NEXT_URL = dev
	? 'http://localhost:3000'
	: process.env.NEXT_PUBLIC_FRONTEND_URL;

export const PER_PAGE = 10;
