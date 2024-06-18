"use client"

import Box from '@/views/components/box';
import Library from '@/views/components/library';
import SidebarItem from '@/views/components/sidebar-item';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';

interface IProps {
    children: React.ReactNode;
}

const Aside: React.FC<IProps> = ({ children }) => {
    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            Icon: HiHome,
            label: "Home",
            active: pathname !== "/search",
            href: "/"
        },
        {
            Icon: BiSearch,
            label: "Search",
            active: pathname === "/search",
            href: "/search"
        }
    ], [pathname])
    return (
        <aside className='flex h-full'>
            <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>
                <Box>
                    <div className='flex flex-col gap-y-4 px-5 py-4'>
                        {routes.map((item) =>
                            <SidebarItem key={item.label} {...item} />

                        )}
                    </div>
                </Box>
                <Box className='overflow-y-auto h-full'>
                    <Library />
                </Box>
            </div>
            <main className='h-full flex-1 overflow-y-auto py-2'>
                {children}
            </main>
        </aside>
    )
}

export default Aside