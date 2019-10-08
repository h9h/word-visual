/// <reference types="node"/>
type stemmer = (word: string) => string;

type wordDistributionType = {
    item: string,
    count: number,
}

export const lollipop: (div: HTMLElement, items: [wordDistributionType]) => void;
export const wordcloud: (div: HTMLElement, items: [wordDistributionType]) => void;
