import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { tabsData } from '@/assets/data/tab';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
            {tabsData.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name={tab.icon} color={color} />,
                    }}
                />
            ))}
        </Tabs>
    );
}
