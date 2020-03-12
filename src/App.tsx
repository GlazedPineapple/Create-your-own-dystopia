import React, { useState } from "react";
import "./App.scss";
import useWords from "./useWords";

function App() {
    const [input, setInput] = useState("");

    if (words === undefined) {
        return (
            <div className="loading">Loading&hellip;</div>
        )
    } else {
        return (
            <div className="app">
                <div className="score"/>
                <progress className="scoreProgress"/>
                <textarea className="input" value={input} onChange={(e) => setInput(e.target.value)}/>
                <pre>{JSON.stringify(input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/ |\n/), undefined, 4)}</pre>
                <pre>{JSON.stringify(words, undefined, 4)}</pre>
            </div>
        );
    }
}

export default App;
