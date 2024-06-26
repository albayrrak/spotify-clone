"use client"
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUsers'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import { Song } from '../../../../types'
import MediaItem from '../media-item'


interface IProps {
    songs: Song[]
}

const Library: React.FC<IProps> = ({ songs }) => {
    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const { user } = useUser()

    const onClick = () => {
        if (!user) {
            return authModal.onOpen()
        }

        return uploadModal.onOpen()
    }


    return (
        <div className='flex flex-col '>
            <div className='flex items-center justify-between px-5 pt-4'>
                <div className='inline-flex items-center gap-x-2'>
                    <TbPlaylist size={26} className='text-neutral-400' />
                    <p className='text-neutral-400 font-medium text-md'>Your Library</p>

                </div>
                <AiOutlinePlus className='text-neutral-400 cursor-pointer hover:text-white transition' onClick={onClick} size={20} />
            </div>
            <div className='flex flex-col gap-y-2 mt-4 px-3'>
                {songs.map(item =>
                    <MediaItem
                        onClick={() => { }}
                        key={item.id}
                        data={item}
                    />

                )}
            </div>
        </div>
    )
}

export default Library