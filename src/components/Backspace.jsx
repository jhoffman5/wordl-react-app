export function Backspace(props) {
    const handleClick = event => {
        event.preventDefault();
        //console.log("Event triggered in Backspace! Passing back to parent");
        props.backspace();
    }

    return (
        <>
            <button
                className="btn btn-dark keyboard-button control"
                onClick={handleClick}
            >
                {"⌫"}
            </button>
        </>
    );
}