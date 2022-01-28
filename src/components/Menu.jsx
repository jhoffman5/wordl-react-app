export function Menu(props) {
    return (
        <>
        <div className="row">
            <button className="card" onClick={() => {console.log("hellos");
            props.handleChangeMode(5)}}>
                5
            </button>
            <button className="card" onClick={() => props.handleChangeMode(6)}>
                6
            </button>
            <button className="card" onClick={() => props.handleChangeMode(7)}>
                7
            </button>
        </div>
        </>
    )
}