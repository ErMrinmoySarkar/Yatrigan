import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8  flex justify-between flex-col w-full">
                <img className="w-16 ml-8" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyktxT_RExUPuXSxgWp8k2-hjJLpWf5Md8gcmCjbaUg&s=10" alt="Yatrigan" />
                <div className="bg-white py-6 px-6">
                    <h2 className="text-2xl font-bold">Get Started with Yatrigan</h2>
                    <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-2 rounded-lg mt-6">Continue</Link>
                </div>
            </div>
        </div>
    );
}