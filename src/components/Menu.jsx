import { useState } from 'react';

export function Menu(props) {
    const [doShowMenuModal, setDoShowMenuModal] = useState(false);

    const showMenu = () => {
        setDoShowMenuModal(true);
    }

    const hideMenu = () => {
        setDoShowMenuModal(false);
    }

    const handleModeBtnClick = (mode) => {
        props.handleChangeMode(mode);
        hideMenu();
    }

    return (
        <>
        <div id="menu-icons" className="row fixed-top">
            <div className='btn' onClick={() => console.log("open info page")}>
                <i class="bi bi-info-circle icon-white"></i>
            </div>
            <div className='btn' onClick={() => showMenu()}>
                <i className={`bi bi-gear-fill ${doShowMenuModal ? "icon-green" : "icon-white"}`}></i>
            </div>
        </div>
        <div className={`modal ${doShowMenuModal ? 'd-block' : 'd-none'}`}>
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
                    <div className="btn btn-primary" onClick={() => hideMenu()}>
                        Close Menu
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}