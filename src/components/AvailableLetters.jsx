import React, { useState, useEffect } from "react";
import { Letter } from "./Letter";

const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

export function AvailableLetters(props) {

    const [values, setValues] = useState(props.value)

    useEffect(() => {
        setValues(props.value);
        console.log(props.value)
    }, [props.value]);

    const lettersDivs = [];

    letters.forEach(letter => {
        lettersDivs.push(<Letter key={letter} letter={letter}/>)
    })

    return (
        <>
            {lettersDivs}
        </>
    );
}