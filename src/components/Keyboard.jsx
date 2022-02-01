import React, { useState, useEffect } from "react";
import { Letter } from "./Letter";
import { Enter } from "./Enter";
import { Backspace } from "./Backspace";

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
    }
]

export function Keyboard(props) {

    const [letterObjs, setLetterObjs] = useState(letters);

    useEffect(() => {
        if(typeof props.guesses !== "undefined")
        {
            // reset all 'availabilites' to 0
            letterObjs.forEach((obj, i) => {
                obj.availability = 0;
            })

            props.guesses.forEach(guess => {
                guess.score.forEach((score, index) => {
                    var letterObj = letterObjs.find(({ letter }) => letter === guess.word.charAt(index))
                    if(letterObj){
                        if(score === 0) {
                            letterObj.availability = -1
                        } else if (score === 1) {
                            if(letterObj.availability < 1) {
                                letterObj.availability = 1
                            }
                        } else if (score === 2) {
                            letterObj.availability = 2;
                        }
                    }

                    setLetterObjs([...letterObjs]);
                });
            });
        }
    }, [props.guesses])

    return (
        <>
                <div className="keyboard-row">
                {
                    letterObjs.slice(0,10).map((object, i) => {
                        return <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={() => props.addLetter(object.letter)}/>
                    })
                }
                </div>
                <div className="keyboard-row">
                {
                    letterObjs.slice(10,19).map((object, i) => {
                        return (
                            <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={() => props.addLetter(object.letter)}/>
                        );
                    })
                }
                </div>
                <div className="keyboard-row">
                <Enter submit={() => props.submit()}/>
                {
                    letterObjs.slice(19,26).map((object, i) => {
                        return <Letter key={object.letter} availability={object.availability} letter={object.letter} addLetter={() => props.addLetter(object.letter)}/>
                    })
                }
                <Backspace backspace={() => props.backspace()}/>
                </div>
        </>
    );
}