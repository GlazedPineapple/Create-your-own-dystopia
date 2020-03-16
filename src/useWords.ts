import {
    useEffect,
    useState
}

from "react";

/** The word with a weight */
export interface IWord {
    /** The word value */
    readonly word: string;
    /** The rating value */
    readonly rating: number;
}

export default function useWords() {
    const [words,
    setWords]=useState<IWord[]>();

    useEffect(()=> {
            (async ()=> {
                    let output=await parseCSV(`$ {
                            process.env.PUBLIC_URL
                        }

                        /cleanSentiment.csv`);
                    output=output.concat(await parseCSV(`$ {
                                process.env.PUBLIC_URL
                            }

                            /positive-words.txt`, 1));
                    output=output.concat(await parseCSV(`$ {
                                process.env.PUBLIC_URL
                            }

                            /negitive-words.txt`, -1));

                    console.dir(output);

                    setWords(output);
                }

            )().catch((e)=> console.error(e));
        }

        , []);

    return words;
}

async function parseCSV(url: string, def=0) {
    const response=await fetch(url);

    if (response.ok) {
        const data=await response.text();

        const matcher=/(.*)(?:, (.*))+?/;

        const output: IWord[]=[];

        for (const line of data.split("\n")) {
            const result=matcher.exec(line);

            if (result !==null) {
                output.push( {
                        rating: parseFloat(result[2] ?? def),
                        word: result[1]
                    }

                );
            }
        }

        return output;
    }

    else {
        console.error(response.status, response.statusText);
        return [];
    }
}