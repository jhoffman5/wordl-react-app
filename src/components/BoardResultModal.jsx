import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export function BoardResultModal(props) {
    const [doShowResultModal, setDoShowResultModal] = useState(props.show);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if(props.show != doShowResultModal)
        {
            setDoShowResultModal(props.show)
        }
    }, [props.show]);

    
    useEffect(() => {
        if(doShowResultModal) 
        {
            var userObj = Cookies.get("user");
            if(typeof userObj !== "undefined")
            {
                setUserData(userObj);
            }
        }
    }, [doShowResultModal]);

    const showResult = () => {
        setDoShowResultModal(true);
    }

    const hideResult = () => {
        setDoShowResultModal(false);
    }

    return (
        <>
        <div className={`modal ${doShowResultModal ? 'd-block' : 'd-none'}`}>
            <div className="modal-main">

                <div className='container'>
                    <div>
                        Statistics
                    </div>

                    {JSON.stringify(userData)}
                    
                    <div className="btn btn-primary" onClick={() => hideResult()}>
                        Close Menu
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}