import { Appbar } from 'react-native-paper';
import { useRouter, usePathname } from 'expo-router';
import { StatusBar, StyleSheet, View } from 'react-native';

const Navbarheader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleMore = () => {
    router.push('/information');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Appbar.Header style={[styles.appbar,]}>
        {pathname !== '/' && <Appbar.BackAction icon="camera-plus" onPress={() => router.back()} />}
        <Appbar.Content title="Mithran" titleStyle={styles.title} />
        {pathname !== '/information' && (
          <Appbar.Action icon="information-outline" onPress={handleMore} color="rgb(30, 27, 22)" />
        )}
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255, 204, 0)',
  },
  appbar: {
    backgroundColor: 'rgb(255, 204, 0)',
  },
  title: {
    color: 'rgb(30, 27, 22)',
    fontWeight: 'bold',
  },
});

export default Navbarheader;