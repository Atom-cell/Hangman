import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(<div className='flex flex-col items-center justify-center text-white h-screen'><App /></div>);
