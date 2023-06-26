import { faBrain } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Logo = () => {
	return (
		<h1 className='py-4 text-3xl text-center font-heading'>
			AI Blog{' '}
			<FontAwesomeIcon icon={faBrain} className='text-2xl text-slate-400' />
		</h1>
	);
};
export default Logo;
