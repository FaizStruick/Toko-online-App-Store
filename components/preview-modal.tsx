'use client'

import usePreviewModal from "@/hooks/use-preview-modal"
import Modal from "./ui/modal";
import Galery from "./galery";
import Info from "./info";

const PreviewModal = () => {
    const {isOpen, onClose, data: product} = usePreviewModal();

    if(!product){
        return null;
    }

    return (
        <Modal
        open={isOpen}
        onClose={onClose}
        >
            {product && (
                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12
                lg:gap-x-8 animate-in fade-in zoom-in-95 duration-300">
                    <div className="sm:col-span-4 lg:col-span-5">
                        <Galery images={product.images} />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                        <div className="flex flex-col h-full">
                        <Info data={product}/>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default PreviewModal