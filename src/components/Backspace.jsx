export function Backspace(props) {
    const handleClick = event => {
        event.preventDefault();
        console.log("Event triggered in Backspace! Passing back to parent");
        props.backspace();
    }

    return (
        <>
            <button
                className="btn btn-dark"
                onClick={handleClick}
            >
                {"⌫"}
            </button>
        </>
    );
}