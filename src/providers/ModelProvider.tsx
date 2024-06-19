"use client"

import AuthModal from "@/views/components/auth-modal"
import Modal from "@/views/components/modal"
import UploadModal from "@/views/components/uplod-modal"
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [mounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)

    }, [])

    if (!mounted) {
        return null;
    }
    return (
        <>
            <UploadModal />
            <AuthModal />
        </>
    )
}

export default ModalProvider