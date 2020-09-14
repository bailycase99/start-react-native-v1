import React from 'react'
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { Value } from "react-native-reanimated";
import Constants from "expo-constants";
import { onGestureEvent } from "react-native-redash";
import StyleGuide from '../StyleGuide'
import { withSpring } from './Helpers'
import Card, { CARD_HEIGHT, CARD_WIDTH, cards } from "../Card";

const { width, height } = Dimensions.get("window");
const containerWidth = width;
const containerHeight = height - Constants.statusBarHeight - 44;
const snapX = (containerWidth - CARD_WIDTH) / 2;
const snapY = (containerHeight - CARD_HEIGHT) / 2;
const offsetX = new Value(snapX);
const offsetY = new Value(snapY);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleGuide.palette.background,
    },
});
const [card] = cards;

const Spring = () => {
    const state = new Value(State.UNDETERMINED);
    const translationX = new Value(0);
    const translationY = new Value(0);
    const velocityX = new Value(0);
    const velocityY = new Value(0);
    const gestureHandler = onGestureEvent({
        state,
        translationX,
        translationY,
        velocityX,
        velocityY,
    });
    const translateX = withSpring({
        value: translationX,
        velocity: velocityX,
        state,
        offset: offsetX,
        snapPoints: [snapX],
    });
    const translateY = withSpring({
        value: translationY,
        velocity: velocityY,
        state,
        offset: offsetY,
        snapPoints: [snapY],
    });
    return (
        <View style={styles.container}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View
                    style={{
                        transform: [{ translateX }, { translateY }],
                    }}
                >
                    <Card {...{ card }} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default Spring;