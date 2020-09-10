import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import Card, { cards } from '../Card'
import Animated, { not, multiply, interpolate } from 'react-native-reanimated'
import StyleGuide from '../StyleGuide'
import { useTransition } from 'react-native-redash'

interface Props {

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center"
    }
})

const width = Dimensions.get('window').width;
const transformOrigin = -1 * (width / 2 - StyleGuide.spacing * 2)

const UseTransition = (props: Props) => {
    const [toggled, setToggled] = useState<0 | 1>(0)
    const transition = useTransition(toggled, not(toggled), toggled)
    return (
        <View style={styles.container}>
            {cards.map((card, index) => {
                const direction = interpolate(index, {
                    inputRange: [0, 1, 2],
                    outputRange: [-1, 0, 1]
                })
                const rotate = multiply(direction,
                    interpolate(transition,
                        {
                            inputRange: [0, 1],
                            outputRange: [0, Math.PI / 6]
                        }))
                return (
                    <Animated.View style={[styles.overlay, {
                        transform: [
                            { translateX: transformOrigin },
                            { rotate: rotate },
                            { translateX: -transformOrigin }
                        ]
                    }]} key={card.id}>
                        <Card {...{ card }} />
                    </Animated.View>
                )
            })}
            <Button title={toggled ? "Reset" : "Start"} onPress={() => setToggled(toggled ^ 1)} />
        </View>
    )
}

export default UseTransition 
