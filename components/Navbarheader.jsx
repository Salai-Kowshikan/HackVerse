import * as React from 'react';
import { Appbar} from 'react-native-paper';
import { useRouter,usePathname  } from 'expo-router';

const Navbarheader= () => {
  const pathname= usePathname();
  const router = useRouter();

  const handleMore = () => {
    router.push('/information'); 
  };

  return (
    
    <Appbar.Header>
         {pathname !== '/'&& <Appbar.BackAction icon="camera-plus" onPress={() => router.back()} />}

      <Appbar.Content title="Hackverse app" />
      {pathname!=='/information' && <Appbar.Action icon="information-outline" onPress={handleMore} />}
    </Appbar.Header>
    
  );
};

export default Navbarheader;