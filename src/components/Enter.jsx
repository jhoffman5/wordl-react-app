export function Enter(props) {
    const handleClick = event => {
        event.preventDefault();
        //console.log("Event triggered in Enter! Passing back to parent");
        props.submit();
    }

    return (
        <>
            <button
                className="btn btn-dark"
                onClick={handleClick}
            >
                {"Enter"}
            </button>
        </>
    );
}