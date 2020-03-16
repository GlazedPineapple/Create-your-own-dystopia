import levenshtein from "js-levenshtein";
import useWords, { IWord } from "./useWords";

/** The rating of a word */
interface IRating extends IWord {
    /** A suggested replacement word */
    readonly suggestion?: IWord;
}

export default function useRatings(input: string) {
    const words = input.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").split(/ |\n/).map(x => x.toLowerCase());
    const ratings = useWords();

    if (ratings === undefined) {
        return undefined;
    }
    const output: IRating[] = [];
    for (const word of words) {
        // Get the weight of the current word
        const weight = ratings.find(value => value.word === word);

        // Get the rating if one was found, or just return 0 for sentment
        const rating = weight?.rating ?? 0;

        let suggestion: IWord | undefined;

        if (rating < 0) {
            // Filter out unneded words: words that are not the same as the current and whose rating is > 0
            const filtered = ratings.filter(x => x.word !== word && x.rating > 0);
            // Map the words to their levenshtein distances
            const distances = filtered.map(x => levenshtein(word, x.word));
            // Get the shortest distance of all distances
            const shortestDistance = Math.min(...distances);
            // Get the word that has the distance
            suggestion = filtered[distances.findIndex(x => x === shortestDistance)];
        }

        output.push({
            rating,
            suggestion,
            word
        });
    }

    return output;
}
