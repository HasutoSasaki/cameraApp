import { useState, useRef, useMemo } from 'react';
import { CameraView, type CameraRatio } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import type { ZoomLevel } from '../assets/types/types';
import { MIN_ZOOM, MAX_ZOOM, DEFAULT_ZOOM } from '../assets/constants/zoom';
import { DEFAULT_RATIO, RATIO_ASPECT_VALUES } from '../assets/constants/ratio';

export function useCamera() {
    const ref = useRef<CameraView>(null);
    const [lastPhoto, setLastPhoto] = useState<string | null>(null);
    const [zoom, setZoom] = useState<ZoomLevel>(MIN_ZOOM);
    const [ratio, setRatio] = useState<CameraRatio>(DEFAULT_RATIO);
    const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);

    const aspectRatio = useMemo(() => {
        return RATIO_ASPECT_VALUES[ratio];
    }, [ratio]);

    const takePicture = async () => {
        try {
            const photo = await ref.current?.takePictureAsync();
            if (!photo) return;

            await MediaLibrary.saveToLibraryAsync(photo.uri);
            setLastPhoto(photo.uri);
            await loadPhotos();
        } catch (error) {
            console.error('Error taking picture:', error);
        }
    };

    const loadPhotos = async () => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync({
                first: 20,
                sortBy: ['creationTime'],
                mediaType: ['photo']
            });
            setPhotos(assets);
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    };

    const handleZoomChange = (newZoom: ZoomLevel) => {
        if (newZoom >= MAX_ZOOM) return;
        setZoom(newZoom);
    };

    const handleCameraReady = () => {
        setZoom(DEFAULT_ZOOM);
    };

    const handleRatioChange = (newRatio: CameraRatio) => {
        setRatio(newRatio);
    };

    return {
        // Camera ref
        ref,

        // States
        lastPhoto,
        zoom,
        ratio,
        photos,
        aspectRatio,

        // Actions
        takePicture,
        loadPhotos,
        handleZoomChange,
        handleCameraReady,
        handleRatioChange,
    };
}