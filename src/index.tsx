import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(<div className='text-white m-0 h-screen w-screen bg-gray-900 flex flex-col justify-center items-center'><App /></div>);
