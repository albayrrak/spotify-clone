import { create } from "zustand";

interface IUploadModalStore {
    isOpen: boolean;
    onOpen: () => void
    onClose: () => void
}


const useUploadModal = create<IUploadModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })

}))

export default useUploadModal