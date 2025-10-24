import FontAwesome from '@expo/vector-icons/FontAwesome';

type IconName = keyof typeof FontAwesome.glyphMap;
interface TabData {
  name: string;
  title: string;
  icon: IconName;
}

export const tabsData: TabData[] = [
  {
    name: 'index',
    title: 'group',
    icon: 'group',
  },
  {
    name: 'solo',
    title: 'Solo',
    icon: 'user',
  },
  {
    name: 'setting',
    title: 'setting',
    icon: 'gear',
  },
];
