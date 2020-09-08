import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Button
        title={'Clocks and Timing Animations'}
        onPress={() => navigation.navigate('FirstAnimation')}
      />
      <Button
        title={'Transitions'}
        onPress={() => navigation.navigate('Transitions')}
      />
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
