"use client";
import {useEffect, useState} from "react";

export default function Input() {
    const [inputValue, setInputValue] = useState("");
    const backendUrl = process.env.NEXT_BACKEND_URL;

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`${backendUrl}/api/send_link`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: inputValue})
            });
            const data = await result.json();
            console.log("prediction: ", data.Prediction);
        }

        try {
            new URL(inputValue);
            fetchData();
        } catch (err) {
            console.log("Invalid URL");
        }
    }, [inputValue])
    return <input
        type={"text"}
        className="input"
        placeholder="Input link to article here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
    />;
}