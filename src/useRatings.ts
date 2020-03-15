import useWords, { IWord } from "./useWords";

interface IRating extends IWord {
    readonly suggestion?: string;
}

export default function useRatings(input: string) {
    const words = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").split(/ |\n/);
    const ratings = useWords();

    if (ratings === undefined) {
        return;
    }
    const output: IRating[] = [];
    for (const word of words) {
        const weight = ratings.find((value) => value.word === word);
        output.push({
            word,
            rating: weight?.rating ?? 0,
            suggestion: weight?.rating ?? 0 < 0 ? ratings.find((value) => value.rating > 0)?.word : undefined
        });
    }

    return [output, output.map(x => x.rating).reduce((a, b) => a + b) / output.length];
}