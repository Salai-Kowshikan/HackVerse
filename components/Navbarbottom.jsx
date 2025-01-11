import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Camerascreen from '@/components/Camerascreen';
import Savednotes from '@/components/Savednotes'
import { View } from 'react-native';

const MusicRoute = () => <View><Savednotes/> </View>;

const AlbumsRoute = () =>  <Camerascreen/> ;


const NotificationsRoute = () => <Text>Theme customization</Text>;

const Navbarbottom = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Saved Notes', focusedIcon: 'content-save-all', unfocusedIcon: 'content-save-all-outline'},
    { key: 'albums', title: 'Take Picture', focusedIcon: 'camera-plus',unfocusedIcon: 'camera-plus-outline' },

    { key: 'notifications', title: 'Customize Theme', focusedIcon: 'format-font', unfocusedIcon: 'format-font' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    notifications: NotificationsRoute,
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