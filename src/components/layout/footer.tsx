// 'use client';
import React from 'react';
// import { Facebook } from 'lucide-react';
// import { Twitter } from 'lucide-react';
// import { Instagram } from 'lucide-react';

export default function Footer() {
    return(
        <div className='flex flex-col justify-between items-center bg-white p-4 shadow-md'>
            <div className="w-full flex justify-start">
                <h1 className="text-2xl font-bold">
                    <a href="/page.tsx">MyShopt.com</a>
                </h1>
            </div>
            <div className="w-full flex justify-center">
                <div className="flex gap-12 text-left">
                    <div className=" flex-1 px-15">
                        <h3 className="text-2xl font-bold">MyShopt</h3>
                        <a href="#" className="hover:text-gray-500">What is Myshopt</a><br />
                        <a href="#" className="hover:text-gray-500">Myshopt Edition</a> <br />
                        <a href="#" className="hover:text-gray-500">Careers</a><br />
                        <a href="#" className="hover:text-gray-500">Investors</a><br />
                        <a href="#" className="hover:text-gray-500">Newsroom</a><br />
                        <a href="#" className="hover:text-gray-500">Sustainabiliti</a>
                    </div>
                    <div className=" flex-1 px-15">
                        <h3 className="text-2xl font-bold">Ecosystem</h3>
                        <a href="#" className="hover:text-gray-500">Developer doct</a><br />
                        <a href="#" className="hover:text-gray-500">App store</a><br />
                        <a href="#" className="hover:text-gray-500">Partner</a><br />
                        <a href="#" className="hover:text-gray-500">Affiliates</a>
                    </div>
                    <div className=" flex-1 px-15">
                        <h3 className="text-2xl font-bold">Resource</h3>
                        <a href="#" className="hover:text-gray-500">Blog</a><br />
                        <a href="#" className="hover:text-gray-500">Compare Shopify</a><br />
                        <a href="#" className="hover:text-gray-500">Guides</a><br />
                        <a href="#" className="hover:text-gray-500">Courses</a><br />
                        <a href="#" className="hover:text-gray-500">Free tools</a><br />
                        <a href="#" className="hover:text-gray-500">Changelog</a>
                    </div>
                    <div className=" flex-1 px-15">
                        <h3 className="text-2xl font-bold">Support</h3>
                        <a href="#" className="hover:text-gray-500">MyShopt Help Center</a><br />
                        <a href="#" className="hover:text-gray-500">Community Forum</a><br />
                        <a href="#" className="hover:text-gray-500">Hire a partner</a><br />
                        <a href="#" className="hover:text-gray-500">Service status</a>
                    </div>
                    </div>
            </div>

            <div className="flex flex-row gap-4 text-1xl">
                <div>
                    <hr className="w-full py-2 mt-4"/>
                    <a href="#" className="py-2 flex-1 px-15 hover:text-gray-500">Term of service</a>
                    <a href="#" className="py-2 flex-1 px-15 hover:text-gray-500">Legal</a>
                    <a href="#" className="py-2 flex-1 px-15 hover:text-gray-500">Privacy policy</a>
                    <a href="#" className="py-2 flex-1 px-15 hover:text-gray-500">Sitemap</a>
                    <a href="#" className="py-2 flex-1 px-15 hover:text-gray-500">Cookie settings</a>
                    
                    
                </div>
             </div>
             
        </div>
        
    )
};
