import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

export function Menu(props) {
    const {showMenu, toggleShowMenu, mode, guesses} = props;
    const [userData, setUserData] = useState({});

    const handleModeBtnClick = (mode) => {
        props.handleChangeMode(mode);
    }

    function getUserFromCookie() {
        var userObj = {};
        try{
            userObj = Cookies.get("user");

            if(typeof userObj === "undefined")
            {
                userObj = {
                    "5": {
                        "wins": 0,
                        "streak": 0,
                        "maxStreak": 0,
                        "played": 0,
                        "winsOnAttempt": Array(6).fill(0)
                    },
                    "6": {
                        "wins": 0,
                        "streak": 0,
                        "maxStreak": 0,
                        "played": 0,
                        "winsOnAttempt": Array(7).fill(0)
                    },
                    "7": {
                        "wins": 0,
                        "streak": 0,
                        "maxStreak": 0,
                        "played": 0,
                        "winsOnAttempt": Array(8).fill(0)
                    }
                }
            } else {
                userObj = JSON.parse(userObj);
            }
        } catch (e) {
            console.error(e);
            userObj = {
                "5": {
                    "wins": 0,
                    "streak": 0,
                    "maxStreak": 0,
                    "played": 0,
                    "winsOnAttempt": Array(6).fill(0)
                },
                "6": {
                    "wins": 0,
                    "streak": 0,
                    "maxStreak": 0,
                    "played": 0,
                    "winsOnAttempt": Array(7).fill(0)
                },
                "7": {
                    "wins": 0,
                    "streak": 0,
                    "maxStreak": 0,
                    "played": 0,
                    "winsOnAttempt": Array(8).fill(0)
                }
            }
            Cookies.set("user", JSON.stringify(userObj))
        }

        return userObj;
    }

    useEffect(() => {
        if(showMenu) 
        {
            var userObj = getUserFromCookie();
            if(typeof userObj !== "undefined")
            {
                setUserData(userObj);
            }
        }
    }, [showMenu]);

    const getUserDataForMode = (field) => {
        try
        {
            return userData[mode][field];
        } catch (e) 
        {
            return "";
        }
    }

    const isGameSharable = () => {
        var didPlayerWin = (typeof guesses !== "undefined" && guesses.length > 0) ? guesses.at(-1).score.every(val => val === 2) : false;
        var isBoardFull = (typeof guesses !== "undefined" && guesses.length > 0) ? (guesses.length >= mode + 1) : false;

        // check if board is full of guesses, or the player has won
        if(didPlayerWin || isBoardFull)
        {
            return true;
        }
        return false;
    }

    const getSharableText = () => {
        const greenSquare = "U+1F7E9";
        const yellowSquare = "U+1F7E8";
        const blackSquare = "U+2B1B";

        let modeData = userData[mode];
        let shareString = "";

        if(typeof guesses !== "undefined" && guesses.length > 0)
        {
            guesses.forEach(guess => {
                if(guess.score)
                {
                    guess.score.forEach(val => {
                        if(val === 2) {
                            shareString += String.fromCodePoint(0x1F7E9);
                        }
                        else if(val === 1) {
                            shareString += String.fromCodePoint(0x1F7E8);
                        }
                        else {
                            shareString += String.fromCodePoint(0x2B1B);
                        }
                    })
                    shareString += '\n';
                }
            });
        }

        shareString += "Join the Beta Test:\nhttps://main.d7slqn5vhod10.amplifyapp.com"

        return `${shareString}`;
    }

    return (
        <>
        <div id="menu-icons" className="menu-container">
            <div className='btn-group'>
                <div className='btn' onClick={() => alert("Hey! Thanks for playing :)\nClick on the gear to change modes or view stats.")}>
                    <i className="bi bi-info-circle icon-white"></i>
                </div>
                <div className='btn' onClick={() => toggleShowMenu()}>
                    <i className={`bi bi-gear-fill ${showMenu ? "icon-green" : "icon-white"}`}></i>
                </div>
            </div>
        </div>
        <div className={`modal ${showMenu ? 'd-block' : 'd-none'}`}>
            <div className="modal-main">

                <div className='container'>
                    <div>
                        Set Game Mode
                    </div>
                    <div className='row'>
                        <div className="col-4 d-flex">
                            <button className="card menu-option col" onClick={() => handleModeBtnClick(5)}>
                                5 letters
                            </button>
                        </div>
                        <div className="col-4 d-flex">
                            <button className="card menu-option col" onClick={() => handleModeBtnClick(6)}>
                                6 letters
                            </button>
                        </div>
                        <div className="col-4 d-flex">
                            <button className="card menu-option col" onClick={() => handleModeBtnClick(7)}>
                                7 letters
                            </button>
                        </div>
                    </div>
                    <div className='stats-container'>
                        <h1>
                            Statistics
                        </h1>
                        <div className='statistics'>
                            <div className='statistic'>
                                <div className='val'>{getUserDataForMode("played")}</div>
                                <div className='label'>Played</div>
                            </div>
                            <div className='statistic'>
                                <div className='val'>{isNaN((parseFloat(getUserDataForMode("wins")) / parseFloat(getUserDataForMode("played"))) * 100) ? 0 : Math.ceil((parseFloat(getUserDataForMode("wins")) / parseFloat(getUserDataForMode("played"))) * 100) }</div>
                                <div className='label'>Win %</div>
                            </div>
                            <div className='statistic'>
                                <div className='val'>{getUserDataForMode("streak")}</div>
                                <div className='label'>Current Streak</div>
                            </div>
                            <div className='statistic'>
                                <div className='val'>{getUserDataForMode("maxStreak")}</div>
                                <div className='label'>Max Streak</div>
                            </div>
                        </div>
                    </div>
                    {/*
                    <h1>
                        Guess Distribution
                    </h1>
                    */
                    }
                    <div className={`btn btn-danger ${isGameSharable() ? '' : 'disabled'}`} onClick={() => navigator.clipboard.writeText(getSharableText())}>
                        Share
                    </div>
                    <div className="btn btn-primary" onClick={toggleShowMenu}>
                        Close Menu
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}