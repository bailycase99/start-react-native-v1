import React, {useState} from 'react';
import {StyleSheet, ViewStyle, ImageStyle, Dimensions} from 'react-native';
import {
  Transitioning,
  Transition,
  TransitioningView,
} from 'react-native-reanimated';
import {cards, FlexibleCard as Card} from '../Card';
import StyleGuide from '../StyleGuide';
import Selection from '../Selection';

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const width = Dimensions.get('window').width;

const column: Layout = {
  id: 'column',
  name: 'Column',
  layout: {
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};
const row: Layout = {
  id: 'row',
  name: 'Row',
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
};

const wrap: Layout = {
  id: 'wrap',
  name: 'Wrap',
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    child: {
      flex: 0,
      width: width / 2 - StyleGuide.spacing * 2,
    },
  },
};

const transition = (
  <Transition.Change durationMs={400} interpolation="easeInOut" />
);
const layouts = [column, row, wrap];

const Transitions = () => {
  const [currentLayout, setCurrentLayout] = useState(layouts[0].layout);
  const ref = React.useRef<TransitioningView>(null);
  return (
    <>
      <Transitioning.View
        style={[styles.container, currentLayout.container]}
        {...{transition, ref}}>
        {cards.map((card) => (
          <Card key={card.id} style={currentLayout.child} {...{card}} />
        ))}
      </Transitioning.View>
      {layouts.map((layout) => (
        <Selection
          key={layout.id}
          name={layout.name}
          isSelected={layout.layout === currentLayout}
          onPress={() => {
            setCurrentLayout(layout.layout);
            if (ref.current) {
              ref.current.animateNextTransition();
            }
          }}
        />
      ))}
    </>
  );
};

export default Transitions;
