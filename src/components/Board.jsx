import React, { useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Keyboard } from "./Keyboard";
import { GuessResultsBoard } from "./GuessResultsBoard";
import { Menu } from "./Menu";

export function Board(props) {
    const [userInput, setUserInput] = useState("");
    const [userLength, setUserLength] = useState();
    const [guesses, setGuesses] = useState([]);
    const [tempGuesses, setTempGuesses] = useState([]);

    // set default mode to 5
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

                    var saveGuesses = [...guesses, newScore];

                    //setScore(newScore);
                    setUserInput("");
                    
                    Cookies.set(userLength, JSON.stringify(saveGuesses), { expires: 7 });

                    setGuesses(saveGuesses);
                    setTempGuesses(saveGuesses);
                }
            })
        }
    }

    //add letters to the user's input, only up to 5 chars
    const addLetterToInput = (letter) => {
        if(userInput.length < userLength) {
            var longerWord = userInput + letter
            setUserInput(longerWord);    
            updateTemporaryGuessesWithTempWord(longerWord); 
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
        var shortenInput = userInput.slice(0, -1); //remove last letter

        setUserInput(shortenInput);
        updateTemporaryGuessesWithTempWord(shortenInput);
    }
    
    //add event listener to handle keyboard inputs
    useEffect(() => {
        document.addEventListener("keydown", handleUserKeyboard, false);
        return () => {
            document.removeEventListener("keydown", handleUserKeyboard);
        };
    }, [handleUserKeyboard])

    const handleChangeMode = (length) => {
        // update to the new gamemode
        setUserLength(length);

        setUserInput("");
        
        // get past guesses
        var pastGuessesForLength = JSON.parse(Cookies.get(length));

        setGuesses(pastGuessesForLength);
        setTempGuesses(pastGuessesForLength);
    }

    const updateTemporaryGuessesWithTempWord = (tempWord) => {
        // Fill with 3's to give 'not-guessed' class to each letter's div
        setTempGuesses([...guesses, { word: tempWord, score: Array(tempWord.length).fill(3)}]);    
    }

    return (
        <>
            <Menu handleChangeMode={(test) => handleChangeMode(test)}/>
            <GuessResultsBoard guesses={tempGuesses}/>
            <div className="container-fluid fixed-bottom d-flex justify-content-center">
                <div className="row">
                    <Keyboard addLetter={(letter) => addLetterToInput(letter)} guesses={tempGuesses} submit={() => handleSubmit()} backspace={() => removeLetterFromInput()}/>
                </div>
            </div>
        </>
    );
}