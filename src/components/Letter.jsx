import React, { useState, useEffect } from "react";

export function Letter(props) {
    const [availability, setAvailability] = useState(0);
    const [letterClass, setLetterClass] = useState("");

    useEffect(() => {
        if(props.availability !== availability) {
            setAvailability(props.availability);
            
            if(props.availability === -1) {
                setLetterClass("unavailable");
            } else if(props.availability === 1) {
                setLetterClass("present");
            } else if(props.availability === 2) {
                setLetterClass("correct");
            } else {
                setLetterClass("");
            }
        }
    }, [props.availability, props.letter, availability])

    return (
        <button
            className={`btn btn-dark keyboard-button letter ${letterClass}`}
            onClick={() => props.addLetter(props.letter)}
        >
            {props.letter}
        </button>
    );
}