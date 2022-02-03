import React, { useState, useEffect } from "react";
import { GuessResult } from './GuessResult';

export function GuessResultsBoard(props) {
    const [guesses, setGuesses] = useState(props.guesses);
    const [guessRows, setGuessRows] = useState();
    
    useEffect(() => {
        if(props.guesses !== guesses)
        {
            setGuesses(props.guesses);
        }
    }, [props.guesses])

    useEffect(() => {
        let rows = [];
        //add rows
        for (let i = 0; i < props.length + 1; i++) {
            //get real rows
            if(i < guesses.length)
            {
                const guessVal = guesses[i];
                if (typeof guessVal !== "undefined")
                {
                    guessVal.word = guessVal.word + (" ".repeat(props.length - guessVal.word.length)); //expand word to include spaces for remaining blank squares
                    rows.push(<GuessResult key={guessVal.word + i} guess={guessVal} rowNum={i} length={props.length}/>);
                }
            }
            else
            {
                //fill in blank rows just to fake empty squares
                let blankRowGuess = {
                    word: " ".repeat(props.length),
                    score: Array(props.length).fill(3)
                }
                rows.push(<GuessResult key={i} guess={blankRowGuess} rowNum={i} length={props.length}/>)
            }
        }
        setGuessRows(rows);
    }, [guesses])

    return (
        <div className="guess-board">
        {guessRows}
        </div>
    );
}