import React from "react";


const Gallow = ({lives}:{lives:number[]}) => {
	const headClass = 'rounded-full border-4 w-12 h-12 absolute left-12 top-11';
	const bodyClass = 'border-l-4 h-12 absolute left-[71px] top-[92px]';
	const leftArm = 'border-l-4 h-8 absolute left-[59px] top-[97px] rotate-45';
	const rightArm = 'border-l-4 h-8 absolute left-[83px] top-[97px] rotate-[313deg]';
	const leftLeg = 'border-l-4 h-8 absolute left-[59px] top-[135px] rotate-45';
	const rightLeg = 'border-l-4 h-8 absolute left-[83px] top-[135px] rotate-[313deg]';
	return (
		<div className='border-l-4 border-t-4 h-52 w-20 relative'>
			<div className='border-r-4 h-12 absolute right-0'></div>
			<div className={lives.length >= 1 ? headClass : ''}></div>
			<div className={lives.length >= 2 ? bodyClass : ''}></div>
			<div className={lives.length >= 3 ? leftArm : ''}></div>
			<div className={lives.length >= 4 ? rightArm : ''}></div>
			<div className={lives.length >= 5 ? leftLeg : ''}></div>
			<div className={lives.length >= 6 ? rightLeg : ''}></div>
			<div className='border-t-4 w-12 absolute bottom-0'></div>
		</div>
	);
};

export default Gallow;
