import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// Функция baseQuery с авторизацией
const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_SERVER_URL,
	prepareHeaders: (headers) => {
			headers.set('Authorization', `${import.meta.env.VITE_JWT_TOKEN}`);
		return headers;
	},
});

export default baseQuery;