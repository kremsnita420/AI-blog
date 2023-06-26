import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import AppLayout from '../../components/AppLayout/AppLayout';
import { useState } from 'react';

export default function NewPost(props) {
	const [postContent, setPostContent] = useState('');
	const handlePost = async () => {
		const response = await fetch(`/api/generatePost`, {
			method: 'POST',
		});

		const json = await response.json();
		console.log(json.post.postContent);
		setPostContent(json.post.postContent);
	};
	return (
		<div>
			<h1>This is new post page.</h1>
			<button className='btn-green' onClick={handlePost}>
				{postContent ? 'Fetching' : 'Generate'}
			</button>

			<div
				dangerouslySetInnerHTML={{ __html: postContent }}
				className='max-w-screen-sm p-10'
			/>
		</div>
	);
}

NewPost.getLayout = function getLayout(page, pageProps) {
	return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
	return {
		props: {},
	};
});
