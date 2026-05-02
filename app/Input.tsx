"use client";
import {useEffect, useState} from "react";
import * as url from "node:url";

export default function Input() {
    const [inputValue, setInputValue] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('http://localhost:5000/send_link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({url: inputValue})
            });
            const data = await result.json();
            console.log(data);
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