import Image from 'next/image';
import HeroImage from '../public/hero.webp';
import Logo from '../components/Logo/Logo';
import Link from 'next/link';
export default function Home() {
	return (
		<div className='relative flex items-center justify-center w-screen h-screen overflow-hidden'>
			<Image src={HeroImage} alt='Hero background' fill className='absolute' />
			<div className='relative z-10 max-w-screen-sm px-10 py-5 text-center text-white rounded-md bg-slate-900/90 backdrop-blur-sm'>
				<Logo />
				<p>
					The AI-powered SASS solution to generate SEO-optimized blog posts in
					minutes. Get high-quality content, without sacrificing your time.
				</p>
				<Link href='/post/new' className='btn-green'>
					Begin
				</Link>
			</div>
		</div>
	);
}
