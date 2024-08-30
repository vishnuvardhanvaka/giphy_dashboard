import image from '@/assets/notFound.svg';
import { useNavigate } from 'react-router-dom';

export default function NotFound({ overlay }) {
	const navigate = useNavigate();

	function handleClick() {
		navigate('/');
	}

	return (
		<div className={`notfound ${overlay}`}>
			<img src={image} alt='404 Error' />
			<button onClick={handleClick}>Back to Home</button>
		</div>
	);
}
