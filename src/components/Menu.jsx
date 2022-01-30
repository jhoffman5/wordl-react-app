export function Menu(props) {
    return (
        <div className="container-fluid fixed-top">
            <div className="row menu">
                <div className="col-4 d-flex">
                    <button className="card menu-option col" onClick={() => props.handleChangeMode(5)}>
                        5
                    </button>
                </div>
                <div className="col-4 d-flex">
                    <button className="card menu-option col" onClick={() => props.handleChangeMode(6)}>
                        6
                    </button>
                </div>
                <div className="col-4 d-flex">
                    <button className="card menu-option col" onClick={() => props.handleChangeMode(7)}>
                        7
                    </button>
                </div>
            </div>
        </div>
    )
}