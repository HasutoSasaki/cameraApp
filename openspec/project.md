# Project Context

## Purpose
Awesome Camera App is a React Native mobile application that provides high-quality photo capture capabilities with advanced shooting assistance features. The app focuses on helping users take better photos through intuitive controls, composition aids, and device stabilization guidance.

## Tech Stack
- **Framework**: Expo ~54.0.29 with React Native 0.81.5 and React 19.1.0
- **Language**: TypeScript with strict mode enabled
- **Navigation**: Expo Router with tab-based navigation
- **Camera**: expo-camera for camera functionality
- **Sensors**: expo-sensors for accelerometer-based features
- **Gestures**: react-native-gesture-handler and react-native-reanimated
- **Styling**: StyleSheet with responsive design
- **Testing**: Jest with jest-expo preset

## Project Conventions

### Code Style
- **TypeScript**: Strict mode with comprehensive type definitions
- **Prettier**: 2-space indentation, single quotes, 100-character line width, trailing commas (ES5)
- **ESLint**: Expo + Prettier configuration with error enforcement
- **Naming**: 
  - Components: PascalCase with descriptive names (e.g., `RenderCameraGesture`)
  - Hooks: camelCase with `use` prefix (e.g., `useCamera`, `useDrawingPaths`)
  - Constants: SCREAMING_SNAKE_CASE (e.g., `DEFAULT_ZOOM`, `MIN_ZOOM`)
  - Interfaces: PascalCase with descriptive names, Props suffix for component props

### Architecture Patterns
- **Component Structure**: Feature-based organization with shared UI components
- **Hook Pattern**: Custom hooks for complex state management and business logic
- **Separation of Concerns**: UI components focus on presentation, hooks handle logic
- **Absolute Imports**: `@/` path alias for clean imports from src directory
- **Error Handling**: Try-catch blocks in async operations with console logging
- **Gesture Handling**: Dedicated gesture components for touch interactions

### Testing Strategy
- **Framework**: Jest with Expo preset for unit testing
- **Commands**: `npm run test` for test execution with watch mode
- **Coverage**: Focus on hook logic and utility functions
- **Type Safety**: Comprehensive TypeScript coverage for compile-time validation

### Git Workflow
- **Main Branch**: `main` for production-ready code
- **Feature Branches**: Descriptive branch names for feature development
- **Commit Style**: Conventional commits with feature/fix/chore prefixes
- **Pull Requests**: Required for main branch integration

## Domain Context

### Camera Photography Concepts
- **Aspect Ratios**: 1:1 (square/Instagram), 4:3 (standard), 16:9 (widescreen/cinematic)
- **Zoom Levels**: Discrete (1.0x, 2.0x) and continuous (1.0x-3.0x) zoom control
- **Device Orientation**: Accelerometer-based tilt detection for level shots
- **Composition Aids**: Rule of thirds grid, drawing overlays for scene planning

### Mobile App Patterns
- **Permissions**: Camera, media library, and microphone access management
- **Platform Integration**: Native camera API through Expo managed workflow
- **Gesture Recognition**: Pinch-to-zoom, pan drawing, tap interactions
- **Media Management**: Photo capture, storage, and thumbnail generation

### User Experience Design
- **Professional Photography**: Features inspired by DSLR camera interfaces
- **Shooting Modes**: Different configurations for various photography scenarios
- **Visual Feedback**: Real-time indicators for optimal shooting conditions
- **Accessibility**: Clear visual cues and intuitive touch targets

## Important Constraints

### Technical Constraints
- **Expo Managed Workflow**: Limited to Expo-compatible native modules
- **React Native Performance**: Gesture handling requires careful optimization
- **Device Capabilities**: Camera zoom limits vary by device hardware
- **Memory Management**: High-resolution photo handling requires efficient memory use

### Platform Constraints
- **iOS**: Camera permissions, media library access, accelerometer availability
- **Android**: Similar permission model with platform-specific behaviors
- **Cross-Platform**: Consistent behavior across iOS and Android required

### Business Constraints
- **User Privacy**: No cloud storage, all photos remain on device
- **Performance**: Real-time camera preview with overlay rendering
- **Battery Life**: Continuous sensor usage optimization required

## External Dependencies

### Expo Ecosystem
- **expo-camera**: Camera access and photo capture
- **expo-media-library**: Photo storage and retrieval
- **expo-sensors**: Accelerometer for device orientation
- **expo-haptics**: Tactile feedback for user interactions

### React Native Libraries
- **react-native-gesture-handler**: Touch gesture recognition
- **react-native-reanimated**: Smooth animations and transitions
- **react-native-svg**: Vector graphics for icons and overlays

### Development Tools
- **EAS Build**: Application building and deployment
- **Expo Dev Client**: Development and testing environment
