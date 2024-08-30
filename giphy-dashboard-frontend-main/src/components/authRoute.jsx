import Auth from '@/pages/auth';

export default function AuthRoute({ page, user }) {
	if (!user?.email) return <Auth type='signin' user={user} />;
	return page;
}
