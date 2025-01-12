import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import CameraScreen from '@/components/CameraScreen';
import Savednotes from '@/components/Savednotes';
import CustomizeFont from '@/components/CustomizeFont';

const NotesRoute = () => <Savednotes />;
const CameraRoute = () => <CameraScreen />;
const CustomizationRoute = () => <CustomizeFont />;

const Navbarbottom = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'notes', title: 'Saved Notes', focusedIcon: 'content-save-all', unfocusedIcon: 'content-save-all-outline' },
    { key: 'camera', title: 'Take Notes', focusedIcon: 'camera', unfocusedIcon: 'camera' },
    { key: 'theme', title: 'Customize', focusedIcon: 'format-font', unfocusedIcon: 'format-font' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    notes: NotesRoute,
    camera: CameraRoute,
    theme: CustomizationRoute
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor="rgb(30, 27, 22)" 
      inactiveColor="rgb(116, 91, 0)" 
      barStyle={{ backgroundColor: 'rgb(255, 251, 255)' }}
    />
  );
};

export default Navbarbottom;
