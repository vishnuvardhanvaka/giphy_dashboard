export default function compactNumber(number) {
	return Intl.NumberFormat('en-US', { notation: 'compact' }).format(number);
}
