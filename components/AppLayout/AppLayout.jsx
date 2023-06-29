import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';

function AppLayout({ children, availableTokens, posts, postId }) {
	const { user } = useUser();

	return (
		<div className='grid grid-cols-[300px_1fr] h-screen max-h-screen'>
			<div className='flex flex-col overflow-hidden text-white'>
				<div className='px-2 bg-slate-800'>
					<Logo />
					<Link href='/post/new' className='btn-green'>
						New Post
					</Link>
					<Link href='/token-topup' className='block mt-2 text-center '>
						<FontAwesomeIcon icon={faCoins} className='text-yellow-500' />
						<span className='pl-1'>{availableTokens}</span> tokens available
					</Link>
				</div>
				<div className='flex-1 px-4 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800'>
					{posts &&
						posts.map((post) => (
							<Link
								key={post._id}
								href={`/post/${post._id}`}
								className={`border first-letter:uppercase border-white/0 block py-1 px-2 my-1 overflow-hidden rounded-sm cursor-pointer whitespace-nowrap bg-white/10 
							${postId === post._id ? 'bg-white/20 border-white/100' : ''}`}>
								{post.topic}
							</Link>
						))}
				</div>
				<div className='flex items-center h-20 gap-2 px-2 border-t bg-cyan-800 border-t-black/50'>
					{user ? (
						<>
							<div className='min-w-[50px] rounded-full overflow-hidden'>
								<Image
									src={user.picture}
									alt={user.name}
									width={50}
									height={50}
								/>
							</div>
							<div className='flex flex-col flex-1'>
								<Link className='font-bold' href='/profile'>
									{user.email}
								</Link>
								<br />
								<Link className='text-small' href='/api/auth/logout'>
									Logout
								</Link>
							</div>
						</>
					) : (
						<Link href='/api/auth/login'>Login</Link>
					)}
				</div>
			</div>
			{children}
		</div>
	);
}
export default AppLayout;
