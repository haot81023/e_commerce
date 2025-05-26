import React from 'react';
import Link from 'next/link';
import { Home, ShoppingBag, Info, Phone, User } from 'lucide-react';

const SideBar = () => {
    return (
        <aside className="h-full w-full bg-gradient-to-b from-blue-100 to-blue-300 rounded-xl shadow-lg p-6 flex flex-col gap-6">
            <nav className="flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-200 font-semibold text-lg transition">
                    <Home size={22} /> Home
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-200 font-semibold text-lg transition">
                    <ShoppingBag size={22} /> Products
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-200 font-semibold text-lg transition">
                    <Info size={22} /> About
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-200 font-semibold text-lg transition">
                    <Phone size={22} /> Contact
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-200 font-semibold text-lg transition">
                    <User size={22} /> Login
                </Link>
            </nav>
        </aside>
    );
};
export default SideBar;