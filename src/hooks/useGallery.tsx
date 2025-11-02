import { useState } from 'react';

export function useGallery() {
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);

  const openGallery = () => setIsGalleryVisible(true);
  const closeGallery = () => setIsGalleryVisible(false);

  return {
    isGalleryVisible,
    openGallery,
    closeGallery,
  };
}
