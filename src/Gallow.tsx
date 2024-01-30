import React from "react";


const Gallow = ({lives}:{lives:number[]}) => {
	return (
		<div className='gallow'>
			<div className='rope'></div>
			<div className={lives.length >= 1 ? 'head' : ''}></div>
			<div className={lives.length >= 2 ? 'body' : ''}></div>
			<div className={lives.length >= 3 ? 'left_arm' : ''}></div>
			<div className={lives.length >= 4 ? 'right_arm' : ''}></div>
			<div className={lives.length >= 5 ? 'left_leg' : ''}></div>
			<div className={lives.length >= 6 ? 'right_leg' : ''}></div>
			<div className='base'></div>
		</div>
	);
};

export default Gallow;
