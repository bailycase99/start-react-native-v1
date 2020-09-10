import HomeScreen from "./components/Homescreen";
import FirstAnimation from "./components/animations/FirstAnimation";
import Transitions from "./components/animations/Transitions";
import useTransition from "./components/animations/useTransition";
import Animations from "./components/animations/Animations";
import PanGesture from "./components/animations/PanGesture";

const views = [
    {name: 'Home', component: HomeScreen, options: {title: 'Home Screen'}},
    {name: 'Clocks & Timing', component: FirstAnimation, options: {title: 'Clocks and Timing'}},
    {name: 'Transitions', component: Transitions, options: {title: 'Transitions'}},
    {name: 'useTransition', component: useTransition, options: {title: 'useTransitions'}},
    {name: 'Animations', component: Animations, options: {title: 'Animations'}},
    {name: 'Pan Gesture', component: PanGesture, options: {title: 'Pan Gesture'}}
]

export default views