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

    const [showMenu, setShowMenu] = useState(false);

    const [date, setDate] = useState(new Date());

    function refreshClock() {
        var actualDate = new Date();

        var userDate = new Date();
        var userObj = getUserFromCookie();

        const startingOffset = userDate.getTimezoneOffset();
        userDate = new Date(userDate.getTime() - (startingOffset*60*1000));
        var userDateString = userDate.toISOString().split('T')[0];

        if(date.getDate() !== actualDate.getDate() || (userObj["date"] !== userDateString))//if the clock ticks over or the user's stored date is off, reset game
        {
            userObj["date"] = userDateString
            Cookies.set("user", JSON.stringify(userObj), { expires: 7 });
        } 

        setDate(actualDate);
    }


    function getUserDateString(){
        const offset = date.getTimezoneOffset();
        var userDate = new Date(date.getTime() - (offset*60*1000));
        var userDateString = userDate.toISOString().split('T')[0];
        return userDateString;
    }

    //submit guess to the backend lambda
    const handleSubmit = (evt) => {
        //check if userInput has already been guessed
        if(!(guesses.filter(e => e.word === userInput).length > 0) && userInput && userInput.length === userLength)
        {
            axios.get(`https://0kvvec0kt8.execute-api.us-east-1.amazonaws.com/date/${getUserDateString()}/length/${userLength}/word/${userInput}`).then((response) => {  
                if(response.status >= 200 && response.status < 400) {
                    try{
                        var newScore = {
                            word: userInput,
                            score: response.data.scoring
                        };

                        var saveGuesses = [...guesses, newScore];

                        Cookies.set(userLength.toString() + getUserDateString(), JSON.stringify(saveGuesses), { expires: 2 });

                        //reset state
                        setUserInput("");
                        setGuesses(saveGuesses);
                        setTempGuesses(saveGuesses);

                        var playerDidWin = newScore.score.every(val => val === 2)

                        if(saveGuesses.length === userLength + 1 || playerDidWin)
                        {
                            var userObj = getUserFromCookie();

                            if(playerDidWin)
                            {
                                if(!(userLength in userObj))
                                {
                                    userObj[userLength] = {
                                        "wins": 1,
                                        "streak": 1,
                                        "maxStreak": 1,
                                        "played": 1,
                                        "winsOnAttempt": Array(userLength + 1).fill(0)
                                    }

                                    userObj[userLength]["winsOnAttempt"][saveGuesses.length - 1] = !isNaN(parseInt(userObj[userLength]["winsOnAttempt"][saveGuesses.length - 1])) ? userObj[userLength]["winsOnAttempt"][saveGuesses.length - 1] + 1 : 1;
                                } else {
                                    if(!('wins' in userObj[userLength]))
                                    {
                                        userObj[userLength]["wins"] = 0;                                   
                                    }
                                    if(!('streak' in userObj[userLength]))
                                    {
                                        userObj[userLength]["wins"] = 0;
                                    }
                                    if(!('played' in userObj[userLength]))
                                    {
                                        userObj[userLength]["wins"] = 0;
                                    }
                                    if(!('winsOnAttempt' in userObj[userLength]))
                                    {
                                        userObj[userLength]["wins"] = Array(userLength + 1).fill(0);                                  
                                    }
                                    if(!('maxStreak' in userObj[userLength]))
                                    {
                                        userObj[userLength]["wins"] = 0;
                                    }

                                    userObj[userLength]["wins"] = !isNaN(parseInt(userObj[userLength]["wins"])) ? userObj[userLength]["wins"] + 1 : 1;
                                    userObj[userLength]["streak"] = !isNaN(parseInt(userObj[userLength]["streak"])) ? userObj[userLength]["streak"] + 1 : 1;
                                    userObj[userLength]["played"] = !isNaN(parseInt(userObj[userLength]["played"])) ? userObj[userLength]["played"] + 1 : 1;

                                    userObj[userLength]["winsOnAttempt"][saveGuesses.length - 1] = !isNaN(parseInt(userObj[userLength]["winsOnAttempt"][saveGuesses.length - 1])) ? userObj[userLength]["winsOnAttempt"][saveGuesses.length - 1] + 1 : 1;

                                    if(userObj[userLength]["streak"] > userObj[userLength]["maxStreak"])
                                    {
                                        userObj[userLength]["maxStreak"] = userObj[userLength]["streak"];
                                    }
                                }
                            } else
                            {
                                if(!(userLength in userObj))
                                {
                                    userObj[userLength] = {
                                        "wins": 0,
                                        "streak": 0,
                                        "maxStreak": 0,
                                        "played": 0,
                                        "winsOnAttempt": Array(userLength + 1).fill(0)
                                    }
                                } else {
                                    if(!('played' in userObj[userLength]))
                                    {
                                        userObj[userLength]["wins"] = 0;
                                    }
                                    if(!('streak' in userObj[userLength]))
                                    {
                                        userObj[userLength]["wins"] = 0;
                                    } 
                                }
                                userObj[userLength]["played"] += 1;
                                userObj[userLength]["streak"] = 0;

                                getActualWord();
                            }
                            
                            Cookies.set("user", JSON.stringify(userObj), { expires: 7 });
                        }
                    } catch (err) {
                        alert("There was an error processing the response.\nTry again.");
                    }
                }
            }).catch((err) => {
                alert(`Sorry, but ${userInput} is not a word\nOr at least I don't think it is...`)
            })
        }
    }

    const getActualWord = () => {
        axios.get(`https://0kvvec0kt8.execute-api.us-east-1.amazonaws.com/date/${getUserDateString()}/length/${userLength}`)
            .then(response => {
                alert(`The word of the day was: ${response.data.word}`)
            })
            .catch(err => {
                alert(`There was an error getting the word of the day.`)
            });
    }

    //add letters to the user's input, only up to 5 chars
    const addLetterToInput = (letter) => {
        if(userInput.length < userLength && guesses.length < maxGuesses) {
            var longerWord = userInput + letter
            setUserInput(longerWord);    
            updateTemporaryGuessesWithTempWord(longerWord); 
        }
    }

    function getUserFromCookie() {
        var userObj = {};
        try{
            var userString = Cookies.get("user");

            if(typeof userObj === "undefined")
            {
                userObj = {    
                    "date": getUserDateString(),
                    "5": {
                        "wins": 0,
                        "streak": 0,
                        "maxStreak": 0,
                        "played": 0,
                        "winsOnAttempt": Array(6).fill(0)
                    },
                    "6": {
                        "wins": 0,
                        "streak": 0,
                        "maxStreak": 0,
                        "played": 0,
                        "winsOnAttempt": Array(7).fill(0)
                    },
                    "7": {
                        "wins": 0,
                        "streak": 0,
                        "maxStreak": 0,
                        "played": 0,
                        "winsOnAttempt": Array(8).fill(0)
                    }
                }
            } else if(isJsonString(userString)) {
                userObj = JSON.parse(userString);
            }
        } catch (e) {
            console.error(e);

            userObj = {       
                "date": getUserDateString(),
                "5": {
                    "wins": 0,
                    "streak": 0,
                    "maxStreak": 0,
                    "played": 0,
                    "winsOnAttempt": Array(6).fill(0)
                },
                "6": {
                    "wins": 0,
                    "streak": 0,
                    "maxStreak": 0,
                    "played": 0,
                    "winsOnAttempt": Array(7).fill(0)
                },
                "7": {
                    "wins": 0,
                    "streak": 0,
                    "maxStreak": 0,
                    "played": 0,
                    "winsOnAttempt": Array(8).fill(0)
                }
            }

            Cookies.set("user", JSON.stringify(userObj))
        }

        return userObj;
    }

    useEffect(() => {
        handleChangeMode(userLength)
        setMaxGuesses(userLength + 1);
    }, [userLength])

    //handle letters, backspace and enter
    const handleUserKeyboard = (event) => {
        var didPlayerWin = (typeof guesses !== "undefined" && guesses.length > 0) ? guesses[guesses.length - 1].score.every(val => val === 2) : false;
        var isBoardFull = (typeof guesses !== "undefined" && guesses.length > 0) ? (guesses.length >= userLength + 1) : false;

        // check if board is full of guesses, or the player has won
        if(!(didPlayerWin || isBoardFull))
            if(event.key && event.keyCode) {
                var key = event.key.toLowerCase();
                if(key.length === 1)
                {
                    if(/^[a-z]$/i.test(key))
                    {
                        //letters
                        addLetterToInput(key)
                    }
                }
                else if(key === "enter")
                {
                    // enter
                    handleSubmit(); 
                }
                else if(key === "backspace")
                {
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

    const isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }


    /* START - Menu methods */
    const handleChangeMode = (length) => {
        // update to the new gamemode
        setUserLength(length);

        setUserInput("");
        
        // get past guesses
        var cookie = Cookies.get(length.toString() + getUserDateString());
        if(cookie && typeof cookie !== "undefined" && isJsonString(cookie))
        {
            var pastGuessesForLength = [];
            try{
                var pastGuessesForLength = JSON.parse(cookie);
            } catch (e) {
                console.error(e);
                Cookies.set(length.toString() + getUserDateString(), []);
            }

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
    
    const toggleShowMenu = () => setShowMenu(x => !x);

    /* END - Menu methods */

    useEffect(() => {
        var isGameDone = guesses.filter(guess => guess.score.every(val => val === 2)).length > 0;
        if(isGameDone)
        {
            setShowMenu(isGameDone);
        }
    }, [guesses])

    const updateTemporaryGuessesWithTempWord = (tempWord) => {
        // Fill with 3's to give 'not-guessed' class to each letter's div
        setTempGuesses([...guesses, { word: tempWord, score: Array(tempWord.length).fill(3)}]);    
    }

    //add event listener to handle keyboard inputs
    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyboard, false);
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
            clearInterval(timerId);
            window.removeEventListener("keydown", handleUserKeyboard)
        };
    }, [refreshClock, handleUserKeyboard]);


    return (
        <>
        <div className="game-container">
            <Menu dateString={getUserDateString()} guesses={guesses} handleChangeMode={handleChangeMode} mode={userLength} toggleShowMenu={toggleShowMenu} showMenu={showMenu}/>
            <div className="board-container">
                <GuessResultsBoard guesses={tempGuesses} length={userLength}/>
            </div>
            <div className="keyboard-container">
                <Keyboard addLetter={addLetterToInput} guesses={tempGuesses} submit={handleSubmit} backspace={removeLetterFromInput}/>
            </div>
        </div>
        </>
    );
}