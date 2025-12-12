import { CameraRatio } from 'expo-camera';

export const CAMERA_RATIOS = {
  SQUARE: '1:1' as CameraRatio,
  STANDARD: '4:3' as CameraRatio,
  WIDESCREEN: '16:9' as CameraRatio,
};

export const RATIO_ASPECT_VALUES = {
  [CAMERA_RATIOS.SQUARE]: 1,
  [CAMERA_RATIOS.STANDARD]: 3 / 4,
  [CAMERA_RATIOS.WIDESCREEN]: 9 / 16,
};

export const DEFAULT_RATIO: CameraRatio = CAMERA_RATIOS.WIDESCREEN;

export const RATIO_CONFIGURATIONS = [
  {
    ratio: CAMERA_RATIOS.SQUARE,
    icon: require('@/assets/images/icon/ratio1_1.png'),
    label: '1:1',
    id: 'square',
    aspectRatio: 1, // 1:1 aspect ratio for the icon
  },
  {
    ratio: CAMERA_RATIOS.STANDARD,
    icon: require('@/assets/images/icon/ratio4_3.png'),
    label: '4:3',
    id: 'standard',
    aspectRatio: 4 / 3, // 4:3 aspect ratio for the icon
  },
  {
    ratio: CAMERA_RATIOS.WIDESCREEN,
    icon: require('@/assets/images/icon/ratio16_9.png'),
    label: '16:9',
    id: 'widescreen',
    aspectRatio: 16 / 9, // 16:9 aspect ratio for the icon
  },
] as const;
