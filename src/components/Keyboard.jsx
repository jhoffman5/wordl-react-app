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
            //console.log("received Board score in child: AvailableLetters")
            //console.log(props.score)
            setScoring(props.score)
            //console.log("setting AvailableLetters score", props.score)
        }
    }, [scoring, props.score])

    useEffect(() => {
            //console.log("calculating availability!")
            //console.log(scoring)
            if(typeof scoring !== 'undefined' && typeof scoring.score !== 'undefined') {
                if(scoring.score.length === scoring.word.length) {
                    scoring.score.forEach((score, index) => {
                        var letterObj = letterObjs.find(({ letter }) => letter === scoring.word.charAt(index))
                        
                        if(score === 0) {
                            letterObj.availability = -1
                        } else if (score === 1 && letterObj.availability === 0) {
                            letterObj.availability = 1
                        } else if (score === 2) {
                            letterObj.availability = 2;
                        }

                    });

                    setLetterObjs([...letterObjs]);
                }
            }
            //console.log(letterObjs)
            //console.log("Score changed!!!")
    }, [scoring]);


    return (
        <>
                <div className="row">
                {
                    letterObjs.slice(0,10).map((object, i) => {
                        return <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={props.addLetter}/>;
                    })
                }
                </div>
                <div className="row">
                {
                letterObjs.slice(10,19).map((object, i) => {
                    return <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={props.addLetter}/>;
                })
                }
                </div>
                <div className="row">
                {
                    letterObjs.slice(18,26).map((object, i) => {
                        return <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={props.addLetter}/>;
                    })
                }
            </div>
        </>
    );
}