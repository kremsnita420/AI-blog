import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AppLayout from '../../components/AppLayout/AppLayout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import getAppProps from '../../utils/getAppProps';

export default function NewPost(props) {
	const [topic, setTopic] = useState('');
	const [keywords, setKeywords] = useState('');
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`/api/generatePost`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({ topic, keywords }),
		});

		const json = await response.json();

		console.log('RESULT: ', json);

		if (json?.postId) {
			router.push(`/post/${json.postId}`);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						<strong>Generate a blog post on the topic of:</strong>
					</label>
					<textarea
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
						className='text-area'
					/>
				</div>
				<div>
					<label>
						<strong>Targeting the following keywords:</strong>
					</label>
					<textarea
						value={keywords}
						onChange={(e) => setKeywords(e.target.value)}
						className='text-area'
					/>
				</div>
				<button type='submit' className='btn-green'>
					Generate
				</button>
			</form>
		</div>
	);
}

NewPost.getLayout = function getLayout(page, pageProps) {
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
