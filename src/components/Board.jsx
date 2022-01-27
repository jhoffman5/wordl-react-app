import React, { useEffect, useState } from "react";
import axios from "axios";
import { AvailableLetters } from "./AvailableLetters";
import { Backspace } from "./Backspace";
import { Enter } from "./Enter";

export function Board(props) {
    const [userInput, setUserInput] = useState("");

    const [score, setScore] = useState({
        word: "",
        score: []
    })
  
    //submit guess to the backend lambda
    const handleSubmit = (evt) => {
        alert(`Submitting Guess: ${userInput}`);
        axios.get(`https://0kvvec0kt8.execute-api.us-east-1.amazonaws.com/word/${userInput}`).then((response) => {
            if(response.status >= 200 && response.status < 400) {
                var newScore = {
                    word: userInput,
                    score: response.data.scoring
                };

                console.log("changing Board score")
                setScore(newScore);
                setUserInput("");
            }
        })
    }

    //add letters to the user's input, only up to 5 chars
    const addLetterToInput = (letter) => {
        if(userInput.length < 5) {
            setUserInput(userInput + letter);
        }
    }

    //handle letters, backspace and enter
    const handleUserKeyboard = (event) => {
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

    //backspace function
    const removeLetterFromInput = () => {
        setUserInput(userInput.slice(0, -1)); //remove last letter
    }
    
    //add event listener to handle keyboard inputs
    useEffect(() => {
        document.addEventListener("keydown", handleUserKeyboard, false);
        return () => {
            document.removeEventListener("keydown", handleUserKeyboard);
        };
    }, [handleUserKeyboard])

    return (
        <>
            <AvailableLetters addLetter={addLetterToInput} score={score}/>
            <Enter submit={handleSubmit}/>
            <Backspace backspace={removeLetterFromInput}/>
            <div>
                {userInput.toUpperCase()}
            </div>
        </>
    );
}