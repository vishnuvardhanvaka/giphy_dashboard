export default function toDayMonth(date) {
	return new Date(date).toLocaleDateString('en-US', { month: 'narrow', day: '2-digit' });
}
