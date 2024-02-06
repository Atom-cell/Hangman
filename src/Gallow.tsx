import React from "react";


const Gallow = ({lives, darkMode}:{lives:number[], darkMode:boolean}) => {
	const headClass = `rounded-full border-4 w-12 h-12 absolute left-12 top-11 ${darkMode ? '' : 'border-gray-800'}`;
	const bodyClass = `border-l-4 h-12 absolute left-[71px] top-[92px] ${darkMode ? '' : 'border-gray-800'}`;
	const leftArm = `border-l-4 h-8 absolute left-[59px] top-[97px] rotate-45 ${darkMode ? '' : 'border-gray-800'}`;
	const rightArm = `border-l-4 h-8 absolute left-[83px] top-[97px] rotate-[313deg] ${darkMode ? '' : 'border-gray-800'}`;
	const leftLeg = `border-l-4 h-8 absolute left-[59px] top-[135px] rotate-45 ${darkMode ? '' : 'border-gray-800'}`;
	const rightLeg = `border-l-4 h-8 absolute left-[83px] top-[135px] rotate-[313deg] ${darkMode ? '' : 'border-gray-800'}`;
	return (
		<div className={`relative w-20 border-t-4 border-l-4 ${darkMode ? '' : 'border-gray-800'} h-52`}>
			<div className={`absolute right-0 h-12 border-r-4 ${darkMode ? '' : 'border-gray-800'}`}></div>
			<div className={lives.length >= 1 ? headClass : ''}></div>
			<div className={lives.length >= 2 ? bodyClass : ''}></div>
			<div className={lives.length >= 3 ? leftArm : ''}></div>
			<div className={lives.length >= 4 ? rightArm : ''}></div>
			<div className={lives.length >= 5 ? leftLeg : ''}></div>
			<div className={lives.length >= 6 ? rightLeg : ''}></div>
			<div className={`absolute bottom-0 w-12 border-t-4 ${darkMode ? '' : 'border-gray-800'}`}></div>
		</div>
	);
};

export default Gallow;
