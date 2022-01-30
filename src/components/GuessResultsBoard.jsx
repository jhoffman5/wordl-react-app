import React, { useState, useEffect } from "react";
import { GuessResult } from './GuessResult';

export function GuessResultsBoard(props) {
    const [guesses, setGuesses] = useState(props.guesses);

    useEffect(() => {
        if(typeof props.guesses !== "undefined" && props.guesses !== guesses)
        {
            setGuesses(props.guesses);
        }
    }, [props.guesses, guesses])

    return (
        <div className="container-fluid">
        {
            guesses.map((guess, i) => {
                return <GuessResult key={guess.word + i} guess={guess} rowNum={i}/>;
            })
        }
        </div>
    );
}