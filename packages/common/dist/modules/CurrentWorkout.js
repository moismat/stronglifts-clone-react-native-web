"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_react_lite_1 = require("mobx-react-lite");
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var RootStore_1 = require("../stores/RootStore");
var WorkoutCard_1 = require("../ui/WorkoutCard");
var WorkoutTimer_1 = require("../ui/WorkoutTimer");
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        padding: 10,
    },
});
exports.CurrentWorkout = mobx_react_lite_1.observer(function () {
    var rootStore = React.useContext(RootStore_1.RootStoreContext);
    // stop timer on unmount
    React.useEffect(function () {
        return function () {
            rootStore.workoutTimerStore.stopTimer();
        };
    }, []);
    return (React.createElement(react_native_1.View, { style: styles.container },
        rootStore.workoutStore.currentExercises.map(function (e) { return (React.createElement(WorkoutCard_1.WorkoutCard, { key: e.exercise, exercise: e.exercise, repsAndWeight: e.numSets + "x" + e.reps + " " + e.weight, sets: e.sets, onSetPress: function (setIndex) {
                // start timer
                rootStore.workoutTimerStore.startTimer();
                // decrement reps
                var v = e.sets[setIndex];
                var newValue;
                if (v === "") {
                    newValue = "" + e.reps;
                }
                else if (v === "0") {
                    rootStore.workoutTimerStore.stopTimer();
                    newValue = "";
                }
                else {
                    newValue = "" + (parseInt(v) - 1);
                }
                e.sets[setIndex] = newValue;
            } })); }),
        rootStore.workoutTimerStore.isRunning ? (React.createElement(WorkoutTimer_1.WorkoutTimer, { percent: rootStore.workoutTimerStore.percent, currentTime: rootStore.workoutTimerStore.display, onXPress: function () { return rootStore.workoutTimerStore.stopTimer(); } })) : null));
});
