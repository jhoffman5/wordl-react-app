import { useState, useEffect } from 'react';
import Cookies from "js-cookie";

export function Menu(props) {
    const {showMenu, toggleShowMenu, mode} = props;
    const [userData, setUserData] = useState({});

    const handleModeBtnClick = (mode) => {
        props.handleChangeMode(mode);
    }

    useEffect(() => {
        if(showMenu) 
        {
            var userObj = Cookies.get("user");
            if(typeof userObj !== "undefined")
            {
                setUserData(JSON.parse(userObj));
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
                    <div className="btn btn-primary" onClick={toggleShowMenu}>
                        Close Menu
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}