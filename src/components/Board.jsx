import React, { useState } from "react";
import axios from "axios";
import { AvailableLetters } from "./AvailableLetters";

export function Board(props) {
    const [guess, setGuess] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Guess: ${guess}`);
        axios.get(`https://0kvvec0kt8.execute-api.us-east-1.amazonaws.com/word/${guess}`).then((response) => {
            console.log(response.data);
            console.log(response.data.scoring)
        })
    }
    return (
        <>
            <AvailableLetters/>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter 5 Letter Guess:
                <input
                    type="text"
                    value={guess}
                    onChange={e => setGuess(e.target.value)}
                />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}