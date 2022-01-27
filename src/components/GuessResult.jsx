import React from "react";

export function GuessResult(props) {
    return (
        <>
        <div className="row">
        {
            props.guess.score.map((charScore, i) => {   
                return (
                <div key={props.rowNum.toString() + props.guess.word.charAt(i) + i.toString()} className={`col guessletter ${charScore === 2 ? 'correct' : charScore === 1 ? 'present' : ''}`}>
                    {props.guess.word.charAt(i)}
                </div>
                );
            })
        }
        </div>
        </>
    );
}