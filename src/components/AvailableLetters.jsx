import React, { useState } from "react";
import axios from "axios";

const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

export function AvailableLetters(props) {
    const [guess, setGuess] = useState("");

    return (
        <>
            {letters.forEach(letter => {
                return <div>${letter}</div>
            })}
        </>
    );
}