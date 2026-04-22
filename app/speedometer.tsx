"use client";
import ReactSpeedometer from "react-d3-speedometer";


export default function Speedometer() {
    return (
        <ReactSpeedometer maxSegmentLabels={0} minValue={0} maxValue={100} value={50}/>
    )
}
