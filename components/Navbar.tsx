'use client';
import { House, Mail, Package, User } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='w-full'>
      <div className='bg-white w-full shadow-md px-4 sm:px-6 lg:px-8 fixed top-0 z-40'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <span className='text-2xl font-bold text-gray-800'>Logo</span>
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <Link href='/' className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'>
                  Home
                </Link>
                <Link
                  href='/about'
                  className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                >
                  About
                </Link>
                <Link href='#' className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'>
                  Services
                </Link>
                <Link href='#' className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-14 w-full bg-white bottom-0 md:hidden fixed z-40 shadow-2xl border-t'>
        <div className='w-full h-full grid grid-cols-4'>
          <div className='flex justify-center items-center cursor-pointer'>
            <House />
          </div>
          <div className='flex justify-center items-center cursor-pointer'>
            <Package />
          </div>
          <div className='flex justify-center items-center cursor-pointer'>
            <Mail />
          </div>
          <div className='flex justify-center items-center cursor-pointer'>
            <User />
          </div>
        </div>
      </div>
    </nav>
  );
}
