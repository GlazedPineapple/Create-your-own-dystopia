import useWords, { IWord } from "./useWords";
import levenshtein from "js-levenshtein";

/** The rating of a word */
interface IRating extends IWord {
    /** A suggested replacement word */
    readonly suggestion?: IWord;
}

export default function useRatings(input: string) {
    const words = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").split(/ |\n/);
    const ratings = useWords();

    if (ratings === undefined) {
        return undefined;
    }
    const output: IRating[] = [];
    for (const word of words) {
        const weight = ratings.find(value => value.word === word);

        const rating = weight?.rating ?? 0;
        const nondupe = ratings.filter(x => x.word !== word && x.rating > 0);
        const distances = nondupe.map(x => levenshtein(word, x.word));
        const shortestDistance = Math.min(...distances);

        output.push({
            rating,
            suggestion: rating < 0
                ? nondupe[distances.findIndex(x => x === shortestDistance)]
                : undefined,
            word
        });
    }

    return [
        output,
        output.map(x => x.rating).reduce((a, b) => a + b) / output.length
    ];
}
