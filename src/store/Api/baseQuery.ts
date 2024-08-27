import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// JWT токен
const jwtToken = 'a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed';

// Функция baseQuery с авторизацией
const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_SERVER_URL,
	prepareHeaders: (headers) => {
		if (jwtToken) {
			headers.set('Authorization', `${import.meta.env.VITE_JWT_TOKEN}`);
		}
		return headers;
	},
});

export default baseQuery;