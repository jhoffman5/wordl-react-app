import React, { useState, useEffect } from "react";
import { GuessResult } from './GuessResult';

export function GuessResultsBoard(props) {
    const [guesses, setGuesses] = useState(props.guesses);

    useEffect(() => {
        if(typeof props.guesses !== "undefined" && props.guesses !== guesses)
        {
            var newGuesses = props.guesses;

            var newGuessObjs = Array(15).fill({
                word: "     ",
                score: [0,0,0,0,0]
            })

            newGuesses.push(...newGuessObjs);

            setGuesses(newGuesses);
        }
    }, [props.guesses, guesses])

    return (
        <div className="container-fluid guess-board">
        {
            guesses.map((guess, i) => {
                return <GuessResult key={guess.word + i} guess={guess} rowNum={i}/>;
            })
        }
        </div>
    );
}