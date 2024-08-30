import endpoints from './endpoints';
import { toast } from 'react-toastify';

const enhancedContents = endpoints.enhanceEndpoints({
	endpoints: {
		getContents: {
			onQueryStarted: async (data, { queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (error) {
					toast.error(error.message || error.error.error || error.error.data.error);
				}
			},
		},
		getContent: {
			onQueryStarted: async (data, { queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (error) {
					toast.error(error.message || error.error.error || error.error.data.error);
				}
			},
		},
	},
});

export const { useGetContentsQuery, useGetContentQuery } = enhancedContents;
