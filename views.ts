import HomeScreen from "./components/Homescreen";
import FirstAnimation from "./components/animations/FirstAnimation";
import Transitions from "./components/animations/Transitions";
import useTransition from "./components/animations/useTransition";
import Animations from "./components/animations/Animations";
import PanGesture from "./components/animations/PanGesture";
import Decay from './components/animations/Decay'
import Spring from './components/animations/Spring'

const views = [
    {name: 'Home', component: HomeScreen, options: {title: 'Home Screen'}},
    {name: 'Clocks & Timing', component: FirstAnimation, options: {title: 'Clocks and Timing'}},
    {name: 'Transitions', component: Transitions, options: {title: 'Transitions'}},
    {name: 'useTransition', component: useTransition, options: {title: 'useTransitions'}},
    {name: 'Animations', component: Animations, options: {title: 'Animations'}},
    {name: 'Pan Gesture', component: PanGesture, options: {title: 'Pan Gesture'}},
    { name: 'Decay', component: Decay, options: { title: 'Decay' } },
    {name: 'Spring', component: Spring, options: {title: 'Spring'}}
]

export default views