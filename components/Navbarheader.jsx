import * as React from 'react';
import { Appbar,PaperProvider } from 'react-native-paper';


const Navbarheader= () => {


  const _handleMore = () => console.log('Shown more');

  return (
    
    <Appbar.Header>
     
      <Appbar.Content title="Hackverse app" />
     
      <Appbar.Action icon="information-outline" onPress={_handleMore} />
    </Appbar.Header>
    
  );
};

export default Navbarheader;