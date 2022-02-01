import React, { useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Keyboard } from "./Keyboard";
import { GuessResultsBoard } from "./GuessResultsBoard";
import { Menu } from "./Menu";
import { BoardResultModal } from "./BoardResultModal";

export function Board(props) {
    const [userInput, setUserInput] = useState("");
    const [userLength, setUserLength] = useState(5);
    const [maxGuesses, setMaxGuesses] = useState();

    const [guesses, setGuesses] = useState([]);
    const [tempGuesses, setTempGuesses] = useState([]);

    const [isBoardDone, setIsBoardDone] = useState(false);

    const d = new Date();
    const date = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() //yyyy-mm-dd
  
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

                    Cookies.set(userLength.toString() + date, JSON.stringify(saveGuesses), { expires: 2 });

                    //reset state
                    setUserInput("");
                    setGuesses(saveGuesses);
                    setTempGuesses(saveGuesses);

                    var playerDidWin = newScore.score.every(val => val === 2)

                    if(saveGuesses.length == userLength + 1 || playerDidWin)
                    {
                        if(playerDidWin)
                        {
                            // add 
                            var userObj = Cookies.get("user");

                            if(typeof userObj === "undefined")
                            {
                                userObj = {
                                    "5": {
                                        "wins": 0,
                                        "winsOnAttempt": Array(6).fill(0)
                                    },
                                    "6": {
                                        "wins": 0,
                                        "winsOnAttempt": Array(7).fill(0)
                                    },
                                    "7": {
                                        "wins": 0,
                                        "winsOnAttempt": Array(8).fill(0)
                                    }
                                }
                            } else {
                                userObj = JSON.parse(userObj);
                            }
                            
                            userObj[userLength]["wins"] += 1;
                            userObj[userLength]["winsOnAttempt"][saveGuesses.length - 1] += 1;
                            Cookies.set("user", JSON.stringify(userObj));
                        } else
                        {
                            // do nothing to user
                        }

                        setIsBoardDone(true);
                    }
                }
            })
        }
    }

    //add letters to the user's input, only up to 5 chars
    const addLetterToInput = (letter) => {
        if(userInput.length < userLength && guesses.length < maxGuesses) {
            var longerWord = userInput + letter
            setUserInput(longerWord);    
            updateTemporaryGuessesWithTempWord(longerWord); 
        }
    }

    useEffect(() => {
        handleChangeMode(userLength)
        setMaxGuesses(userLength + 1);
    }, [userLength])

    //handle letters, backspace and enter
    const handleUserKeyboard = (event) => {
        if(!isBoardDone)
        {
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
        var cookie = Cookies.get(length.toString() + date);
        if(cookie && typeof cookie !== "undefined")
        {
            var pastGuessesForLength = JSON.parse(cookie);

            setGuesses(pastGuessesForLength);
            setTempGuesses(pastGuessesForLength);
        }
        else
        {
            var pastGuessesForLength = [];

            setGuesses(pastGuessesForLength);
            setTempGuesses(pastGuessesForLength);
        }
    }

    useEffect(() => {
        var isGameDone = guesses.filter(guess => guess.score.every(val => val === 2)).length > 0;
        setIsBoardDone(isGameDone);
    }, [guesses])

    const updateTemporaryGuessesWithTempWord = (tempWord) => {
        // Fill with 3's to give 'not-guessed' class to each letter's div
        setTempGuesses([...guesses, { word: tempWord, score: Array(tempWord.length).fill(3)}]);    
    }

    return (
        <>
            <Menu handleChangeMode={(test) => handleChangeMode(test)}/>
            <GuessResultsBoard guesses={tempGuesses} length={userLength}/>
            <div className="keyboard">
                <Keyboard addLetter={(letter) => addLetterToInput(letter)} guesses={tempGuesses} submit={() => handleSubmit()} backspace={() => removeLetterFromInput()}/>
            </div>
            <BoardResultModal show={isBoardDone}/>
        </>
    );
}