"use client"
import Speedometer from "@/app/components/speedometer";
import {useEffect, useState} from "react";

export default function Home() {
    const [inputValue, setInputValue] = useState("");
    const [predictionValue, setPredictionValue] = useState(0.5);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await fetch('http://localhost:5000/send_link', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({url: inputValue})
                });
                const data = await result.json();
                console.log("prediction: ", data.prediction);
                setPredictionValue(data.prediction);
            } catch (err) {
                console.error("Error occurred: ", err);
            } finally {
                setIsLoading(false);
            }
        }

        try {
            new URL(inputValue);
            fetchData();
        } catch (err) {
            console.log("Invalid URL");
        }
    }, [inputValue])

    return (
        <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0 flex items-center justify-center opacity-25 scale-75 pointer-events-none">
                <img src="/wpi_roundel.png" alt="WPI roundel"/>
            </div>

            <div className="relative flex flex-col items-center gap-24">
                <p className="text-6xl font-bold">Fake News Detector</p>
                <div className={"flex flex-col items-center gap-4"}>
                    <input
                        type={"text"}
                        className="input"
                        placeholder="Paste link to article here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <p className={"text-2xl font-bold"}>This article is most likely:</p>
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <span className="loading loading-spinner loading-lg opacity-0"></span>
                    )}
                    <div className="flex items-center gap-4">
                        <button className="btn btn-xl btn-error bg-[#FF471A] border-[#FF471A]">Fake</button>
                        <div className="flex items-center justify-center">
                            <Speedometer prediction={predictionValue}/>
                        </div>
                        <button className="btn btn-xl btn-success bg-[#6AD72D] border-[#6AD72D]">Real</button>
                    </div>
                </div>
            </div>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-500">
                DISCLAIMER: This machine learning detector is not 100% accurate and was trained on a small dataset.
            </span>
        </div>
    );
}
