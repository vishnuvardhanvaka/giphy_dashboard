import endpoints from './endpoints';
import { toast } from 'react-toastify';

const enhancedAuth = endpoints.enhanceEndpoints({
	endpoints: {
		signin: {
			onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
				try {
					const { data: result } = await queryFulfilled;
					sessionStorage.setItem('token', result?.data?.token);
					dispatch(endpoints.endpoints.getMe.initiate());
					window.location.href = '/';
				} catch (error) {
					toast.error(error.message || error.error.error || error.error.data.error);
				}
			},
		},
		signup: {
			onQueryStarted: async (data, { queryFulfilled }) => {
				const tId = toast.loading('Requesting... It can take upto 60 seconds!');
				try {
					await queryFulfilled;
					toast.update(tId, {
						type: 'success',
						isLoading: false,
						autoClose: 3000,
						render: 'Successfully created an account',
					});
					window.location.href = '/';
				} catch (error) {
					toast.update(tId, {
						type: 'error',
						isLoading: false,
						autoClose: 3000,
						render: error.message || error.error.error || error.error.data.error,
					});
				}
			},
		},
		getMe: {
			onQueryStarted: async (data, { queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (error) {
					console.log(error.message || error.error.error || error.error.data.error);
				}
			},
		},
	},
});

export const { useSigninMutation, useSignupMutation, useGetMeQuery } = enhancedAuth;
