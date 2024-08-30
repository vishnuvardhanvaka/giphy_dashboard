import api from '../api';

export default api.injectEndpoints({
	endpoints: builder => ({
		signin: builder.mutation({
			query: data => ({
				url: '/auth/signin',
				method: 'POST',
				body: data,
			}),
		}),
		signup: builder.mutation({
			query: data => ({
				url: '/auth/signup',
				method: 'POST',
				body: data,
			}),
		}),
		getMe: builder.query({
			query: () => '/users/me',
		}),
	}),
});
