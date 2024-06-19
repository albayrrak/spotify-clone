"use client"
import React, { useState } from 'react'
import Modal from '../modal'
import useUploadModal from '@/hooks/useUploadModal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '../input'
import Button from '../button'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/useUsers'
import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { title } from 'process'
import { useRouter } from 'next/navigation'

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal()
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            iamge: null
        }
    })

    const handleChange = (open: boolean) => {
        if (!open) {
            reset()
            uploadModal.onClose()
        }

    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)
            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if (!imageFile || !songFile || !user) {
                toast.error("Missing fields")
                return;
            }

            const uniqID = uniqid()
            const { data: songData, error: songError } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqID}`, songFile, { cacheControl: '3600', upsert: false })

            if (songError) {
                setIsLoading(false)
                return toast.error("Failed song upload.")
            }

            const { data: imageData, error: imageError } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqID}`, imageFile, { cacheControl: '3600', upsert: false })
            if (imageError) {
                setIsLoading(false)
                return toast.error("Failed image upload.")
            }

            const { error: supabaseError } = await supabaseClient.from("songs").insert({ user_id: user.id, title: values.title, author: values.author, image_path: imageData.path, song_path: songData.path })

            if (supabaseError) {
                setIsLoading(false)
                return toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false)
            toast.success("Song created!")
            reset()
            uploadModal.onClose()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal title='Add a song' description="Upload an mp3 file" onChange={handleChange} isOpen={uploadModal.isOpen}>
            <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>
                <Input id="title" disabled={isLoading} {...register("title", { required: true })} placeholder="Song title" />
                <Input id="title" disabled={isLoading} {...register("author", { required: true })} placeholder="Song author" />
                <div>
                    <div className='pb-1'>
                        Select a song file
                    </div>
                    <Input id="file" type='file' disabled={isLoading} {...register("song", { required: true })} accept='.mp3' />

                </div>
                <div>
                    <div className='pb-1'>
                        Select an image
                    </div>
                    <Input id="image" type='file' disabled={isLoading} {...register("image", { required: true })} accept='image/*' />
                </div>

                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default UploadModal