import React, { useEffect, useState } from "react";

export function GuessResult(props) {
    const [guess, setGuess] = useState(props.guess);

    useEffect(() => {
        if(props.guess !== guess)
        {
            setGuess(props.guess)
        }
    }, [props.guess, guess])

    return (
        <>
        <div className="guess-row">
        {
            guess.word.split('').map((char, i) => {   
                return (
                <div key={props.rowNum.toString() + char + i.toString()} className={`guessletter ${guess.score[i] === 0 ? '' : guess.score[i] === 2 ? 'correct' : guess.score[i] === 1 ? 'present' : 'not-submitted'}`}>
                    {char}
                </div>
                );
            })
        }
        </div>
        </>
    );
}