import React, { useEffect, useState} from "react";
import axios from "axios";
import { Keyboard } from "./Keyboard";
import { Backspace } from "./Backspace";
import { Enter } from "./Enter";
import { GuessResultsBoard } from "./GuessResultsBoard";
import { Menu } from "./Menu";

export function Board(props) {
    const [userInput, setUserInput] = useState("");
    const [userLength, setUserLength] = useState(7);
    const [guesses, setGuesses] = useState([]);

    const [score, setScore] = useState();

    //const [doResetBoard, setDoResetBoard] = useState(false);
  
    //submit guess to the backend lambda
    const handleSubmit = (evt) => {
        //check if userInput has already been guessed
        if(!(guesses.filter(e => e.word === userInput).length > 0) && userInput && userInput.length === userLength)
        {
            axios.get(`https://0kvvec0kt8.execute-api.us-east-1.amazonaws.com/length/${userLength}/word/${userInput}`).then((response) => {
                if(response.status >= 200 && response.status < 400) {
                    var newScore = {
                        word: userInput,
                        score: response.data.scoring
                    };

                    // console.log("changing Board score")
                    setScore(newScore);
                    setGuesses([...guesses, newScore]);
                    setUserInput("");
                }
            })
        }
    }

    //add letters to the user's input, only up to 5 chars
    const addLetterToInput = (letter) => {
        if(userInput.length < userLength) {
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

    const handleChangeMode = (length) => {
        console.log("changing mode", length)
        setUserLength(length);
        setGuesses([]);
        setScore({});

        //save the current board state to storage
        //clear the keyboard of any "availablility" and get guesses from some cookie/local storage
        // then run the data back through to set the board to their previous state  
    }

    return (
        <>
            <Menu handleChangeMode={(test) => handleChangeMode(test)}/>
            <GuessResultsBoard guesses={guesses}/>
            <Keyboard addLetter={() => addLetterToInput} score={score}/>
            <Enter submit={() => handleSubmit}/>
            <Backspace backspace={() => removeLetterFromInput}/>
            <div>
                {userInput.toUpperCase()}
            </div>
        </>
    );
}