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
        const pos = ratings.filter(x => x.rating > 0).length;
        const neg = ratings.filter(x => x.rating < 0).length;

        return (
            <div className="app">
                <div className="score" />
                <div>{pos} + {pos / ratings.length}</div>
                <div>{neg} - {neg / ratings.length}</div>
                <div className="progress right half">
                    <div className="negative" style={{width: `${(neg / (pos + neg)) * 100}%`}}>{Math.round(neg / (pos + neg) * 10000) / 100}%</div>
                </div>
                <div className="progress half">
                    <div className="positive" style={{width: `${(pos / (pos + neg)) * 100}%`}}>{Math.round(pos / (pos + neg) * 10000) / 100}%</div>
                </div>
                <div className="progress">
                    <div className="bar" style={{marginLeft: `${(pos / (pos + neg)) * 100}%`}}/>
                </div>
                <textarea className="input" value={input} onChange={changeInput} />
                {/* <pre>{JSON.stringify(ratings, undefined, 4)}</pre> */}
            </div>
        );
    }
}

export default App;
