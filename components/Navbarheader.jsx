import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter, usePathname } from 'expo-router';

const Navbarheader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleMore = () => {
    router.push('/information');
  };

  return (
    <Appbar.Header style={{ backgroundColor: 'rgb(255, 204, 92)' }}> 
      {pathname !== '/' && <Appbar.BackAction icon="camera-plus" onPress={() => router.back()} />}
      
      <Appbar.Content title="Mithran" titleStyle={{ color: 'rgb(30, 27, 22)' }} /> 
      
      {pathname !== '/information' && (
        <Appbar.Action icon="information-outline" onPress={handleMore} color="rgb(30, 27, 22)" />
      )}
    </Appbar.Header>
  );
};

export default Navbarheader;
