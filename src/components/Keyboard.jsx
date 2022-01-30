import React, { useState, useEffect } from "react";
import { Letter } from "./Letter";

const letters = [ 
    {
        letter: "q",
        availability: 0
    },
    {
        letter: "w",
        availability: 0
    },
    {
        letter: "e",
        availability: 0
    },
    {
        letter: "r",
        availability: 0
    },
    {
        letter: "t",
        availability: 0
    },
    {
        letter: "y",
        availability: 0
    },
    {
        letter: "u",
        availability: 0
    },
    {
        letter: "i",
        availability: 0
    },
    {
        letter: "o",
        availability: 0
    },
    {
        letter: "p",
        availability: 0
    },
    {
        letter: "a",
        availability: 0
    },
    {
        letter: "s",
        availability: 0
    },
    {
        letter: "d",
        availability: 0
    },
    {
        letter: "f",
        availability: 0
    },
    {
        letter: "g",
        availability: 0
    },
    {
        letter: "h",
        availability: 0
    },
    {
        letter: "j",
        availability: 0
    },
    {
        letter: "k",
        availability: 0
    },
    {
        letter: "l",
        availability: 0
    },
    {
        letter: "z",
        availability: 0
    },
    {
        letter: "x",
        availability: 0
    },
    {
        letter: "c",
        availability: 0
    },
    {
        letter: "v",
        availability: 0
    },
    {
        letter: "b",
        availability: 0
    },
    {
        letter: "n",
        availability: 0
    },
    {
        letter: "m",
        availability: 0
    }]

export function Keyboard(props) {

    const [letterObjs, setLetterObjs] = useState(letters);

    const [scoring, setScoring] = useState(props.score);

    useEffect(() => {
        if(props.score !== scoring){
            setScoring(props.score)
        }
        
        if(props.resetBoard)
        {
            letterObjs.forEach((obj, i) => {
                obj.availability = 0;
            })
            props.didReset();
        }
    }, [scoring, props.score, props.resetBoard])

    useEffect(() => {
        if(typeof scoring !== 'undefined' && typeof scoring.score !== 'undefined') {
            if(scoring.score.length === scoring.word.length) {
                scoring.score.forEach((score, index) => {
                    var letterObj = letterObjs.find(({ letter }) => letter === scoring.word.charAt(index))

                    if(score === 0) {
                        letterObj.availability = -1
                    } else if (score === 1) {
                        if(letterObj.availability < 1) {
                            letterObj.availability = 1
                        }
                    } else if (score === 2) {
                        letterObj.availability = 2;
                    } else {
                        letterObj.availability = 0
                    }

                });

                setLetterObjs([...letterObjs]);
            }
        }
    }, [scoring])

    return (
        <>
                <div className="row">
                {
                    letterObjs.slice(0,10).map((object, i) => {
                        return <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={() => props.addLetter(object.letter)}/>
                    })
                }
                </div>
                <div className="row">
                {
                    letterObjs.slice(10,19).map((object, i) => {
                        return (
                            <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={() => props.addLetter(object.letter)}/>
                        );
                    })
                }
                </div>
                <div className="row">
                {
                    letterObjs.slice(19,26).map((object, i) => {
                        return <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={() => props.addLetter(object.letter)}/>
                    })
                }
            </div>
        </>
    );
}