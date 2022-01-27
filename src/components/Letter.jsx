import React, { useState } from "react";

export function Letter(props) {
    const [availability, setAvailability] = useState("");

    const handleClick = event => {
        event.preventDefault();
        console.log("Event triggered in Letter! Passing back to parent AvailableLetters");
        props.addLetter(props.letter);
    }

    return (
        <>
            <button
                className="btn btn-dark"
                onClick={handleClick}
            >
                {props.letter}
            </button>
        </>
    );
}