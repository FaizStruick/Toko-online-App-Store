'use client'

import usePreviewModal from "@/hooks/use-preview-modal"
import Modal from "./ui/modal";
import Galery from "./galery";
import Info from "./info";

const PreviewModal = () => {
    const previewModal = usePreviewModal();
    const {isOpen, onClose} = usePreviewModal();
    const product = usePreviewModal((state) => state.data)

    if(!product){
        return null;
    }

    return (
        <Modal
        open={previewModal.isOpen}
        onClose={previewModal.onClose}
        >
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12
            lg:gap-x-8 animate-in fade-in zoom-in duration-300">
                <div className="sm:col-span-4 lg:col-span-5">
                    <Galery images={product.images} />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                    <div className="flex flex-col h-full">
                    <Info data={product}/>

                    <p className="mt-auto text-xs text-gray-400 italic"></p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PreviewModal