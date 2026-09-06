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
            <div className="aspect-square relative w-full h-full rounded-2xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs text-neutral-400 dark:text-neutral-500">
                Tidak ada gambar
            </div>
        );
    }

    return (
        <TabGroup 
            as="div" 
            className="flex flex-col-reverse"
            selectedIndex={selectedIndex} // Index yang aktif
            onChange={setSelectedIndex}   // Fungsi saat thumbnail diklik
        >
            {images.length > 1 && (
            <div className="mx-auto mt-4 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                    {images.map((image, index) => (
                        <GalleryTab 
                            key={image.id} 
                            image={image}
                        />
                    ))}
                </TabList>
            </div>
            )}

            {/* Gambar Utama */}
            <TabPanels className="aspect-square w-full">
                {images.map((image, index) => (
                    <TabPanel key={image.id}>
                        <div className="aspect-square relative w-full h-full sm:rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-800">
                            <Image 
                                fill
                                src={image.url}
                                alt="Product Image"
                                className="object-cover object-center"
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    );
};

export default Galery;