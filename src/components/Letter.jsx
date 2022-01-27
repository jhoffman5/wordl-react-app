import React, { useState, useEffect } from "react";

export function Letter(props) {
    const [availability, setAvailability] = useState("");
    const [letterClass, setLetterClass] = useState("");

    const handleClick = event => {
        event.preventDefault();
        console.log("Event triggered in Letter! Passing back to parent AvailableLetters");
        props.addLetter(props.letter);
    }

    useEffect(() => {
        if(props.availability != availability) {
            console.log(props.letter, props.availability)
            setAvailability(props.availability);
            if(props.availability === -1) {
                setLetterClass("unavailable");
            } else if(props.availability === 1) {
                setLetterClass("present");
            } else if(props.availability === 2) {
                setLetterClass("correct");
            }
        }
    }, [props.availability])

    return (
        <>
            <button
                className={`btn btn-dark keyboard-button ${letterClass} col`}
                onClick={handleClick}
            >
                {props.letter}
            </button>
        </>
    );
}