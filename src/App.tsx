import React from "react";
import "./App.scss";
import useWords from "./useWords";

function App() {
    const words = useWords();

    if (words === undefined) {
        return (
            <div className="loading">Loading&hellip;</div>
        )
    } else {
        return (
            <div className="app">
                <div className="score"/>
                <progress className="scoreProgress"/>
                <textarea className="input"/>
                <pre>{JSON.stringify(words, undefined, 4)}</pre>
            </div>
        );
    }
}

export default App;
