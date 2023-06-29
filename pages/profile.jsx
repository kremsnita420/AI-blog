import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import AppLayout from '../components/AppLayout/AppLayout';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import getAppProps from '../utils/getAppProps';

export default function Profile() {
	const { user } = useUser();

	return (
		<div className='max-w-screen-sm mx-auto mt-10'>
			{user && (
				<>
					<Image
						src={user.picture}
						alt={user.name}
						width={100}
						height={100}
						className='mx-auto rounded-full'
					/>

					<h2>{user.name}</h2>
				</>
			)}
		</div>
	);
}

Profile.getLayout = function getLayout(page, pageProps) {
	return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const userSession = await getSession(ctx.req, ctx.res);
		const props = await getAppProps(ctx);

		if (!userSession) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			};
		}

		return {
			props: { ...props },
		};
	},
});
