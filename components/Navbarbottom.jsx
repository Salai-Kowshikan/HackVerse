import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import CameraScreen from '@/components/CameraScreen'
import Savednotes from '@/components/Savednotes'
import CustomizeFont from '@/components/CustomizeFont'
import { View } from 'react-native';


const MusicRoute = () => <Savednotes/>;
const CameraRoute = () => <View><CameraScreen /></View>;
const NotificationsRoute = () => <CustomizeFont/>;

const Navbarbottom = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'notes', title: 'Saved Notes', focusedIcon: 'content-save-all', unfocusedIcon: 'content-save-all-outline'},
    { key: 'camera', title: 'Take Picture', focusedIcon: 'camera-plus',unfocusedIcon: 'camera-plus-outline' },

    { key: 'theme', title: 'Customize Theme', focusedIcon: 'format-font', unfocusedIcon: 'format-font' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    notes: MusicRoute,
    camera: CameraRoute,
    theme: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Navbarbottom;