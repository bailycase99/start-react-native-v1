import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Animated, {
  Value,
  startClock,
  useCode,
  add,
  cond,
  eq,
  interpolate,
  Extrapolate,
  set,
  not,
  proc,
} from 'react-native-reanimated';
import {useClock, useValues} from 'react-native-redash';
import Card, {cards} from '../Card';

const runAnimation = proc(
  (
    startAnimation: Animated.Value<number>,
    clock: Animated.Clock,
    from: Animated.Value<number>,
    to: Animated.Value<number>,
    startTime: Animated.Value<number>,
    opacity: Animated.Node<number>,
  ) =>
    cond(eq(startAnimation, 1), [
      startClock(clock),
      set(from, opacity),
      set(to, not(to)),
      set(startTime, clock),
      set(startAnimation, 0),
    ]),
);

export default function FirstAnimation() {
  const [show, setShow] = React.useState(false);
  const clock = useClock();
  const [startTime, from, to] = useValues(0, 0, 0);
  const startAnimation = new Value(1);
  const duration = 1000;
  const endTime = add(startTime, duration);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP,
  });
  useCode(
    () => runAnimation(startAnimation, clock, from, to, startTime, opacity),
    [clock, from, opacity, startAnimation, startTime, to],
  );
  return (
    <View style={styles.container}>
      <Animated.View style={{opacity}}>
        <Card card={cards[0]} />
      </Animated.View>
      <Button
        title={show ? 'Show' : 'Hide'}
        onPress={() => setShow((prev) => !prev)}
        color="blue"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
