import useWords from "./useWords";

export default function useWeight(input: string) {
    const words = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/ |\n/);
    const weights = useWords();

    for (const word of words) {
        weights?.find
    }
}