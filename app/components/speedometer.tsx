"use client";
import ReactSpeedometer, {Transition} from "react-d3-speedometer";


export default function Speedometer({ prediction }: { prediction: number }) {
    return (
        <ReactSpeedometer maxSegmentLabels={0} minValue={0} maxValue={100} value={Math.round(prediction*100)} needleTransition={Transition.easeElasticInOut} needleTransitionDuration={1500}/>
    )
}
