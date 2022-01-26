import React, { useState } from "react";

export function Letter(props) {
    const [availability, setAvailability] = useState("");

    return (
        <>
            <div>{props.letter}</div>
        </>
    );
}