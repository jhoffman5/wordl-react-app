import React from "react";

export function GuessResult(props) {
    return (
        <>
        <div className="row guess-row">
        {
            props.guess.score.map((charScore, i) => {   
                return (
                <div key={props.rowNum.toString() + props.guess.word.charAt(i) + i.toString()} className={`col guessletter ${charScore === 3 ? 'not-submitted' : charScore === 2 ? 'correct' : charScore === 1 ? 'present' : ''}`}>
                    {props.guess.word.charAt(i)}
                </div>
                );
            })
        }
        </div>
        </>
    );
}