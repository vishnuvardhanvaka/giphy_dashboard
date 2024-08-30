export default function toDate(date) {
	return new Date(date || Date.now()).toLocaleDateString('en-IN', { dateStyle: 'long' });
}
