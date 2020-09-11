import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import StyleGuide from '../StyleGuide';
import Card, { cards, CARD_WIDTH, CARD_HEIGHT } from '../Card';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { onGestureEvent, clamp } from 'react-native-redash';
import Animated, {
    event,
    Value,
    block,
    cond,
    eq,
    set,
    add,
    diffClamp,
    Clock,
    clockRunning,
    startClock,
    not,
    and,
    stopClock,
    decay,
    neq,
} from 'react-native-reanimated';

interface Props { }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleGuide.palette.background,
    },
});

const [card] = cards;

interface WithDecayProps {
  value: Animated.Adaptable<number>;
  velocity: Animated.Adaptable<number>;
  state: Animated.Value<State>;
  offset?: Animated.Value<number>;
  deceleration?: number;
}

const withDecay = (config: WithDecayProps) => {
  const { value, velocity, state, offset, deceleration } = {
    offset: new Value(0),
    deceleration: 0.998,
    ...config,
  };
  const clock = new Clock();
  const decayState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const isDecayInterrupted = and(eq(state, State.BEGAN), clockRunning(clock));
  const finishDecay = [set(offset, decayState.position), stopClock(clock)];

  return block([
    cond(isDecayInterrupted, finishDecay),
    cond(neq(state, State.END), [
      set(decayState.finished, 0),
      set(decayState.position, add(offset, value)),
    ]),
    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(decayState.finished)), [
        set(decayState.velocity, velocity),
        set(decayState.time, 0),
        startClock(clock),
      ]),
      decay(clock, decayState, { deceleration }),
      cond(decayState.finished, finishDecay),
    ]),
    decayState.position,
  ]);
};

const containerHeight = Dimensions.get('window').height;
const containerWidth = Dimensions.get('window').width;
const offsetX = new Value((containerWidth - CARD_WIDTH) / 2);
const offsetY = new Value((containerHeight - CARD_HEIGHT) / 2);

const PanGesture = (props: Props) => {
    const state = new Value(State.UNDETERMINED);
    const translationX = new Value(0);
    const translationY = new Value(0);
    const velocityX = new Value(0)
    const velocityY = new Value(0)
    const gestureHandler = onGestureEvent({
        state,
        translationX,
        translationY,
        velocityX,
        velocityY
    });
    const translateX = diffClamp(
        withDecay({state: state, value: translationX, velocity: velocityX, offset: offsetX}),
        0,
        containerWidth - CARD_WIDTH,
    );
    const translateY = diffClamp(
        withDecay({state: state, value: translationY, velocity: velocityY, offset: offsetY}),
        0,
        containerHeight - CARD_HEIGHT,
    );
    return (
        <View style={styles.container}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={{ transform: [{ translateX }, { translateY }] }}>
                    <Card {...{ card }} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default PanGesture;
