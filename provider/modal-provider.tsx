'use client'

import PreviewModal from "@/components/preview-modal"
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <>
        <PreviewModal />
        </>
    );
}

export default ModalProvider;