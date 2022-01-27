import React, { useState, useEffect } from "react";
import { GuessResult } from './GuessResult';

export function GuessResultsBoard(props) {
    const [guesses, setGuesses] = useState([]);

    useEffect(() => {
        //console.log("setting guesses", props.guesses)
        setGuesses(props.guesses);
        //console.log(guesses);
    }, [props.guesses])

    return (
        <>
        {
            guesses.map((guess, i) => {
                return <GuessResult key={guess.word} guess={guess} rowNum={i}/>;
            })
        }
        </>
    );
}