import { useEffect, useState } from "react";

/** The word with a weight */
export interface IWord {
    /** The word value */
    readonly word: string;
    /** The rating value */
    readonly rating: number;
}

export default function useWords() {
    const [words, setWords] = useState<IWord[]>();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/cleanSentiment.csv`);

            if (response.ok) {
                const data = await response.text();

                const matcher = /(.*),(.*)/;

                const output: IWord[] = [];
                for (const line of data.split("\n")) {
                    const result = matcher.exec(line);

                    if (result !== null) {
                        output.push({
                            rating: parseFloat(result[2]),
                            word: result[1]
                        });
                    }
                }
                setWords(output);
            } else {
                console.error(response.status, response.statusText);
            }
        })().catch((e) => console.error(e));
    }, []);

    return words;
}
