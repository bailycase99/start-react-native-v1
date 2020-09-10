import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import StyleGuide from '../StyleGuide'
import Card, { cards, CARD_WIDTH, CARD_HEIGHT } from '../Card'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { onGestureEvent, clamp } from 'react-native-redash'
import Animated, { event, Value, block, cond, eq, set, add, diffClamp } from 'react-native-reanimated'

interface Props {

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleGuide.palette.background
    }
})

const [card] = cards

const withOffset = (value: Animated.Value<number>, state: Animated.Value<State>, offset: Animated.Value<Number>) => {
    return(
        cond(eq(state, State.END), [set(offset, add(offset, value)), offset], add(offset, value))
    )
}

const containerHeight = Dimensions.get('window').height 
const containerWidth = Dimensions.get('window').width

const PanGesture = (props: Props) => {
    const state = new Value(State.UNDETERMINED)
    const translationX = new Value(0)
    const translationY = new Value(0)
    const offsetX = new Value((containerWidth - CARD_WIDTH) / 2)
    const offsetY = new Value((containerHeight - CARD_HEIGHT) / 2)
    const gestureHandler = onGestureEvent({
        state,
        translationX,
        translationY
    })
    const translateX = diffClamp(withOffset(translationX, state, offsetX), 0, containerWidth - CARD_WIDTH)
    const translateY = diffClamp(withOffset(translationY, state, offsetY), 0, containerHeight - CARD_HEIGHT)
    return (
        <View style={styles.container}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={{ transform: [{ translateX }, { translateY }] }}>
                    <Card {...{ card }} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

export default PanGesture
