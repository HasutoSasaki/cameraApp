import type { ZoomLevel } from '../../assets/types/types';

const MIN_ZOOM = 0.1;
const DEFAULT_ZOOM = 0.2;
const MAX_ZOOM = 0.3;
const ZOOM_LEVELS: ZoomLevel[] = [MIN_ZOOM, DEFAULT_ZOOM];
const DISPLAY_MIN = 1.0;
const DISPLAY_MAX = 3.0;
export { MIN_ZOOM, DEFAULT_ZOOM, MAX_ZOOM, ZOOM_LEVELS, DISPLAY_MIN, DISPLAY_MAX };
