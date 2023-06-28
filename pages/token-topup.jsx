import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AppLayout from '../components/AppLayout/AppLayout';
import getAppProps from '../utils/getAppProps';

export default function TokenTopup() {
	const handleClick = async () => {
		const result = await fetch(`/api/db/addTokens`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await result.json();
		console.log('RESULT: ', json);
		window.location.href = json.session.url;
	};
	return (
		<div>
			<h1>This is token top up page.</h1>
			<button onClick={handleClick} className='btn-green'>
				Add tokens
			</button>
		</div>
	);
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
	return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const props = await getAppProps(ctx);
		return {
			props,
		};
	},
});
