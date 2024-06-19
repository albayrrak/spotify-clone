import getSongsByTitle from '@/actions/getSongsByTtitle'
import Header from '@/views/components/header'
import SearchContent from '@/views/components/search-content'
import SearchInput from '@/views/components/search-input'
import React from 'react'

interface IProps {
    searchParams: {
        title: string
    }
}

const SearchPage: React.FC<IProps> = async ({ searchParams }) => {
    const songs = await getSongsByTitle(searchParams.title)
    console.log(songs);

    return (
        <div
            className='
                bg-neutral-900
                rounded-lg
                h-full
                w-full
                overflow-hiden
                overflow-y-auto
            '
        >
            <Header className='from-bg-neutral-900'>
                <div className='mb-2 flex flex-col gap-y-6'>
                    <h1 className='text-white text-3xl font-semibold'>

                        Search
                    </h1>
                    <SearchInput />
                </div>
            </Header>

            <SearchContent songs={songs} />
        </div>
    )
}

export default SearchPage