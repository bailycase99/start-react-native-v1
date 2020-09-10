import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import views from '../views';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      {views.map(view => (
      <Button
        title={view.name}
        onPress={() => navigation.navigate(view.name)}
      />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default HomeScreen;
