import React from 'react';

const Blobs = () => {
	return (
		<div className=''>
			<div className='absolute top-0 bg-purple-500 rounded-full -left-20 max-sm:right-20 max-sm:w-72 max-sm:h-72 sm:w-96 sm:h-96 mix-blend-multiply filter opacity-70 animate-blob'></div>
			<div className='absolute bg-yellow-300 rounded-full max-sm:bottom-16 max-sm:right-20 max-sm:w-72 max-sm:h-72 sm:w-96 sm:h-96 mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000'></div>
			<div className='absolute bg-pink-700 rounded-full top-28 left-20 max-sm:w-64 max-sm:h-64 sm:w-96 sm:h-96 mix-blend-multiply filter opacity-70 animate-blob animation-delay-4000'></div>
		</div>
	);
};

export default Blobs;
