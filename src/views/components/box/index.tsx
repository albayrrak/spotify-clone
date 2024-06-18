import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    children: React.ReactNode;
    className?: string
}
const Box: React.FC<IProps> = ({ children, className }) => {
    return (
        <div className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}>{children}</div>
    )
}

export default Box