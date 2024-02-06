import { MdOutlineDarkMode } from 'react-icons/md';
import { MdOutlineLightMode } from 'react-icons/md';

interface IDarkModeToggle {
	darkMode: boolean;
	toggelDarkMode: () => void;
}

const DarkModeToggle = ({ darkMode, toggelDarkMode }: IDarkModeToggle) => {
	return (
		<div onClick={() => toggelDarkMode()} className='absolute top-0 right-0 cursor-pointer'>
			{darkMode ? <MdOutlineLightMode className='text-5xl text-white'/> : <MdOutlineDarkMode className='text-5xl '/>}
		</div>
	);
};

export default DarkModeToggle;
