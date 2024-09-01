import logo from '@/assets/logo.png';
import { toast } from 'react-toastify';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSigninMutation, useSignupMutation } from '@/redux/auth/enhancers';

export default function Auth({ type, user }) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [name, setName] = useState('');
	// const [image, setImage] = useState({});
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [disabled, setDisabled] = useState(true);

	const [signin, signinApi] = useSigninMutation();
	const [signup, signupApi] = useSignupMutation();

	function handleTabClick(path) {
		if (path !== pathname) navigate(path);
	}

	// function handleChooseFile() {
	// 	const input = document.createElement('input');
	// 	input.type = 'file';
	// 	input.accept = 'image/*';
	// 	input.oninput = e => setImage(e.target.files[0]);
	// 	input.click();
	// }

	// function handleRemoveFile() {
	// 	setImage({});
	// }

	// async function uploadImage() {
	// 	const formData = new FormData();
	// 	formData.append('file', image);
	// 	formData.append('path', 'giphy-studio');
	// 	const res = await fetch('https://s3api.prodemic.org/api/upload/avatar', { method: 'POST', body: formData });
	// 	const data = await res.json();
	// 	return data?.data?.url;
	// }

	function isValid() {
		if (type === 'signup') {
			const nameOk = name.trim().length > 0;
			// const imageOk = image.size > 0;
			const emailOk = email.trim().length > 0;
			const passwordOk = password.length > 0;
			return nameOk && emailOk && passwordOk;
		} else {
			const emailOk = email.trim().length > 0;
			const passwordOk = password.length > 0;
			return emailOk && passwordOk;
		}
	}

	async function handleSignin() {
		setDisabled(true);
		if (isValid()) {
			signin({ email, password });
		} else {
			toast.warning('Please provide Email & Password!');
		}
	}

	async function handleSignup() {
		setDisabled(true);
		if (isValid()) {
			// const url = await uploadImage();
			const url='';
			signup({ name, email, image: url, password }).unwrap();
		} else {
			toast.warning('Please provide required values!');
		}
	}

	useEffect(() => {
		if (isValid()) setDisabled(false);
		else setDisabled(true);
	}, [name, email, password, pathname]);

	useEffect(() => {
		if (user?.email) navigate('/');
	}, [user]);

	return (
		<section className='auth'>
			<main className='auth-container'>
				<div className='auth-tabs'>
					<button className={type === 'signup' ? 'active' : ''} onClick={() => handleTabClick('/signup')}>
						Sign up
					</button>
					<button className={type === 'signin' ? 'active' : ''} onClick={() => handleTabClick('/signin')}>
						Sign in
					</button>
				</div>
				<div className='auth-content'>
					<h1 className='brand-area'>
						<img src={logo} alt='Giphy Studio' />
						Giphy Studio
					</h1>
					<h2 className='heading'>{type === 'signup' ? 'Create an Account' : 'Welcome Back!'}</h2>
					<p className='para-text'>Please provide your info as instructed below.</p>
					<div className='input-area'>
						{type === 'signup' ? (
							<Fragment>
								<input
									className='input'
									type='text'
									placeholder='Full Name'
									value={name}
									onChange={e => setName(e.target.value)}
								/>
								{/* <div className='uploader'>
									<input
										className='input'
										type='text'
										placeholder='No image selected'
										readOnly
										value={image.size ? image.name : ''}
									/>
									<button onClick={image.size ? handleRemoveFile : handleChooseFile}>
										{image.size ? 'Remove' : 'Choose'}
									</button>
								</div> */}
							</Fragment>
						) : null}
						<input
							className='input'
							type='email'
							placeholder='Giphy Email ID'
							value={email}
							onChange={e => setEmail(e.target.value.toLowerCase())}
						/>
						<input
							className='input'
							type='password'
							placeholder='Giphy Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<button
						className='auth-button'
						onClick={type === 'signup' ? handleSignup : handleSignin}
						disabled={!isValid() || signinApi.isLoading || signupApi.isLoading || disabled}>
						{signinApi.isLoading || signupApi.isLoading
							? 'Loading...'
							: `Sign ${type === 'signup' ? 'up' : 'in'}`}
					</button>
					<p className='auth-info'>
						<strong>Note: </strong> By signing {type === 'signup' ? 'up' : 'in'}, you are agreeing to our{' '}
						<a href='#'>Terms & Conditions</a> and <a href='#'>Privacy Policy</a>.
					</p>
				</div>
			</main>
		</section>
	);
}
