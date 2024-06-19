"use client"
import React from 'react'
import { Song } from '../../../../types'
import MediaItem from '../media-item'

interface IProps {
    songs: Song[]
}

const SearchContent: React.FC<IProps> = ({ songs }) => {

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 text-neutral-400 w-full px-6'>
                No songs found
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-y-2 w-full px-6'>
            {songs.map(item =>
                <div className='flex items-center gap-x-4 w-full' key={item.id}>
                    <div className='flex-1'>
                        <MediaItem data={item} onClick={() => { }} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchContent