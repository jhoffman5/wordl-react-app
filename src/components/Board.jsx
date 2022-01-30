import React, { useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Keyboard } from "./Keyboard";
import { Backspace } from "./Backspace";
import { Enter } from "./Enter";
import { GuessResultsBoard } from "./GuessResultsBoard";
import { Menu } from "./Menu";

export function Board(props) {
    const [userInput, setUserInput] = useState("");
    const [userLength, setUserLength] = useState();
    const [guesses, setGuesses] = useState([]);

    const [score, setScore] = useState();

    const [doResetBoard, setDoResetBoard] = useState(false);

    useEffect(() => {
        handleChangeMode(5)
    },[])
  
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

                    console.log(userLength);
                    Cookies.set(userLength, JSON.stringify(guesses), { expires: 7 });
                    console.log(JSON.parse(Cookies.get(5)));
                    console.log(JSON.parse(Cookies.get(6)));
                    console.log(JSON.parse(Cookies.get(7)))

                }
            })
        }
    }

    //add letters to the user's input, only up to 5 chars
    const addLetterToInput = (letter) => {
        console.log("board", letter);
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
        setUserLength(length);
        
        // reset the board to blank
        setDoResetBoard(true);
        
        // get past guesses
        var pastGuessesForLength = JSON.parse(Cookies.get(length));
        setGuesses(pastGuessesForLength);
        console.log(pastGuessesForLength)

        // format past guesses into a score obj
        var resetScoreObj = {
            word: pastGuessesForLength.map(guess => guess.word).join(""),
            score: pastGuessesForLength.map(guess => guess.score).concat().flat()
        }

        // set the score object that will be passed to the child Keyboard.
        // this will set all of the letters' values for the new current mode
        setScore(resetScoreObj);
    }

    return (
        <>
            <Menu handleChangeMode={(test) => handleChangeMode(test)}/>
            <GuessResultsBoard guesses={guesses}/>
            <Keyboard addLetter={(letter) => addLetterToInput(letter)} score={score} resetBoard={doResetBoard} didReset={() => setDoResetBoard(false)}/>
            <Enter submit={() => handleSubmit()}/>
            <Backspace backspace={() => removeLetterFromInput()}/>
            <div>
                {userInput.toUpperCase()}
            </div>
        </>
    );
}