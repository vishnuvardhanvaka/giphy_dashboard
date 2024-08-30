import api from '../api';

export default api.injectEndpoints({
	endpoints: builder => ({
		getContents: builder.query({
			query: () => `/contents`,
		}),
		getContent: builder.query({
			query: id => `https://api.giphy.com/v1/gifs/${id}?api_key=89tyh5sZFW1zc4ErAh3I5qr41jF6qSSa`,
		}),
	}),
});
