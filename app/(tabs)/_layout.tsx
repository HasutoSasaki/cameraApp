import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'group',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="group" color={color} />,
                }}
            />
            <Tabs.Screen
                name="solo"
                options={{
                    title: 'Solo',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'setting',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
                }}
            />
        </Tabs>
    );
}
