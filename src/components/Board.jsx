import React, { useState } from "react";
import axios from "axios";
import { AvailableLetters } from "./AvailableLetters";

export function Board(props) {
    const [userInput, setUserInput] = useState("");

    const [value, setValue] = useState({
        word: "",
        score: []
    })
  
    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Guess: ${userInput}`);
        axios.get(`https://0kvvec0kt8.execute-api.us-east-1.amazonaws.com/word/${userInput}`).then((response) => {
            console.log(response.data);
            console.log(response.data.scoring);

            var newState = {
                word: userInput,
                score: response.data.scoring
            };

            setValue(newState);
        })
    }
    return (
        <>
            <AvailableLetters value={value}/>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter 5 Letter Guess:
                <input
                    type="text"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}