import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export default createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api',
		prepareHeaders: headers => {
			headers.set('authorization', `Bearer ${sessionStorage.getItem('token')}`);
			return headers;
		},
	}),
	endpoints: () => ({}),
});
