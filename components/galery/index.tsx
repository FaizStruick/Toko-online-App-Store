'use client'

import { useState } from "react"; // Tambahkan useState
import { Image as ImageType } from "@/types";
import Image from "next/image"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import GalleryTab from "./galery-tab";

interface GaleryProps {
    images: ImageType[]
}

const Galery: React.FC<GaleryProps> = ({
    images = []
}) => {
    // Kita buat state untuk mengatur index yang aktif
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square relative w-full h-full sm:rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400">
                No Image Available
            </div>
        )
    }

    return (
        <TabGroup 
            as="div" 
            className="flex flex-col-reverse"
            selectedIndex={selectedIndex} // Index yang aktif
            onChange={setSelectedIndex}   // Fungsi saat thumbnail diklik
        >
            {/* List Thumbnail */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                    {images.map((image, index) => (
                        <GalleryTab 
                            key={image.id} 
                            image={image}
                        />
                    ))}
                </TabList>
            </div>

            {/* Gambar Utama */}
            <TabPanels className="aspect-square w-full">
                {images.map((image) => (
                    <TabPanel key={image.id}>
                        <div className="aspect-square relative w-full h-full sm:rounded-lg overflow-hidden bg-gray-100">
                            <Image 
                                fill
                                src={image.url}
                                alt="Product Image"
                                className="object-cover object-center"
                                priority={true} // Agar gambar utama di-load lebih cepat
                            />
                        </div>
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    )
}

export default Galery;