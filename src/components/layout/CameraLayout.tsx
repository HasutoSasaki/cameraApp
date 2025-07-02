import { CameraView, useCameraPermissions } from 'expo-camera';
import { Image } from "expo-image";
import { useState, useRef } from 'react';
import { Button, StyleSheet, Pressable, Text, View, Modal } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { RenderCamera } from '../camera/RenderCamera';
import { RenderRequestPermission } from '../camera/RenderRequestPermission';
import { RenderTiltIndicator } from '../camera/RenderTiltIndicator';

export function CameraLayout() {
    const [permission, requestPermission] = useCameraPermissions();
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();

    if (!permission || !mediaPermission) return <View />;

    if (!permission.granted || !mediaPermission.granted) {
        return <RenderRequestPermission
            requestPermission={requestPermission}
            requestMediaPermission={requestMediaPermission}
        />;
    }

    return (
        <View style={styles.container}>
            <RenderCamera />
            <RenderTiltIndicator />
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
});