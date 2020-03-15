import React, { ChangeEvent, useState } from "react";
import "./App.scss";
import useRatings from "./useRatings";

function App() {
    const [input, setInput] = useState("");
    const ratings = useRatings(input);

    const changeInput = (e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value);

    if (ratings === undefined) {
        return (
            <div className="loading">Loading&hellip;</div>
        );
    } else {
        return (
            <div className="app">
                <div className="score" />
                <progress className="scoreProgress" />
                <textarea className="input" value={input} onChange={changeInput} />
                <pre>{JSON.stringify(input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").split(/ |\n/), undefined, 4)}</pre>
                <pre>{JSON.stringify(ratings, undefined, 4)}</pre>
            </div>
        );
    }
}

export default App;
