import logo from '@/assets/logo.png';
import { TailSpin } from 'react-loader-spinner';

export default function Loader() {
	return (
		<div className='loader'>
			<div className='content'>
				<TailSpin height='100' width='100' color='#ff283c' visible={true} />
				<img src={logo} alt='Giphy' />
			</div>
		</div>
	);
}
