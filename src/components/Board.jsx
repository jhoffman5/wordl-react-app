import React, { useEffect, useState } from "react";
import axios from "axios";
import { AvailableLetters } from "./AvailableLetters";
import { Backspace } from "./Backspace";
import { Enter } from "./Enter";

export function Board(props) {
    const [userInput, setUserInput] = useState("");

    const [value, setValue] = useState({
        word: "",
        score: []
    })
  
    const handleSubmit = (evt) => {
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

    const addLetterToInput = (letter) => {
        setUserInput(userInput + letter);
    }

    const handleUserKeyboard = (event) => {
        //event.stopPropagation();
        if(event.key && event.keyCode) {
            if((event.keyCode >= 65 && event.keyCode <= 95)) {
                // letters
                addLetterToInput(event.key);
            } else if (event.keyCode === 13) { 
                // enter
                handleSubmit();
            } else if (event.keyCode === 8) { 
                // backspace
                removeLetterFromInput();
            }
        }
    }

    const removeLetterFromInput = () => {
        setUserInput(userInput.slice(0, -1));
    }
    
    useEffect(() => {
        document.addEventListener("keydown", handleUserKeyboard, false);
        return () => {
            document.removeEventListener("keydown", handleUserKeyboard);
        };
    }, [handleUserKeyboard])

    return (
        <>
            <AvailableLetters addLetter={addLetterToInput} value={value}/>
            <Enter submit={handleSubmit}/>
            <Backspace backspace={removeLetterFromInput}/>
            <div>
                {userInput.toUpperCase()}
            </div>
        </>
    );
}