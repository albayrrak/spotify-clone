"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import Button from '../button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUsers';
import { FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface IProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<IProps> = ({ children, className }) => {

    const authModal = useAuthModal()
    const router = useRouter()
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut()

        router.refresh()

        if (error) {
            toast.error(error.message)

        } else {
            toast.success("Logged out!")
        }
    }

    console.log(user);

    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
            <div className='w-full mb-4 flex items-center justify-between '>
                <div className='hidden md:flex gap-x-2 items-center'>
                    <button className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                        <RxCaretLeft onClick={() => router.back()} className='text-white' size={35} />
                    </button>
                    <button className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                        <RxCaretRight onClick={() => router.forward()} className='text-white' size={35} />
                    </button>
                </div>
                <div className='flex md:hidden gap-x-2 items-center'>
                    <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition' >
                        <HiHome className='text-black' size={20} />
                    </button>
                    <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition' >
                        <BiSearch className='text-black' size={20} />
                    </button>
                </div>
                <div className='flex justify-between items-center gap-x-4'>
                    {user
                        ? <div className='flex gap-x-4'>
                            <Button className='bg-white px-6 py-2' onClick={handleLogout}>
                                Logout
                            </Button>
                            <Button className='bg-white' onClick={() => router.push("/account")}>
                                <FaUserAlt />
                            </Button>
                        </div>
                        : <>
                            <div >
                                <Button
                                    onClick={authModal.onOpen}
                                    className='bg-transparent text-neutral-300 font-medium'
                                >
                                    Signup
                                </Button>
                            </div>
                            <div >
                                <Button
                                    onClick={authModal.onOpen}
                                    className='bg-white px-6 py-2'
                                >
                                    Log in
                                </Button>
                            </div>
                        </>

                    }

                </div>
            </div>
            {children}
        </div>
    )
}

export default Header