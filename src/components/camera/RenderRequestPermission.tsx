import { FunctionComponent } from "react";
import { View, Text, Button } from "react-native";
import { glStyles } from '@/assets/style/global'

interface Props {
    requestPermission: () => void;
    requestMediaPermission: () => void;
}

export function RenderRequestPermission({ requestPermission, requestMediaPermission }: Props) {
    return (
        <View style={glStyles.container}>
            <Text style={{ color: "white" }}>
                カメラとメディアライブラリのアクセスを許可してください
            </Text>
            <Button
                title="カメラとメディアライブラリのアクセスを許可"
                onPress={async () => {
                    await requestPermission();
                    await requestMediaPermission();
                }}
            />
        </View>
    );
}
