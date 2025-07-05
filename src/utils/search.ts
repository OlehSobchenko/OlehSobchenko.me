
type Token = string;
type SearchItemId = string;

interface SearchItem {
    id: SearchItemId;
    text: string[];
}

export type InputIndex = Record<Token, SearchItemId[]>;

export type InitializedIndex = Map<
    keyof InputIndex,
    Set<InputIndex[string][number]>
>;

export interface SearchIndexOptions {
    items?: SearchItem[];
    index?: InputIndex;
    initializedIndex?: InitializedIndex;
}

export default class Search {
    private readonly index: InitializedIndex = new Map();

    constructor(options: SearchIndexOptions = {}) {
        if (options.items) {
            this.index = Search.buildIndex(options.items);
        }

        if (options.index) {
            this.index = Search.toInitializedIndex(options.index);
        }

        if (options.initializedIndex) {
            this.index = options.initializedIndex;
        }
    }

    public search(query: string): SearchItemId[] {
        if (!query.trim()) {
            return [];
        }

        const normalizedQuery = query.toLowerCase().trim();
        const tokens = Search.tokenize(normalizedQuery);

        const results = new Map<SearchItemId, number>();

        const exactResults = this.searchExact(tokens);

        exactResults.forEach(id => {
            results.set(id, (results.get(id) || 0) + 100);
        });

        const partialResults = this.searchPartial(tokens);

        partialResults.forEach(id => {
            results.set(id, (results.get(id) || 0) + 50);
        });

        const substringResults = this.searchSubstring(normalizedQuery);

        substringResults.forEach(id => {
            results.set(id, (results.get(id) || 0) + 25);
        });

        const fuzzyResults = this.searchFuzzy(tokens);

        fuzzyResults.forEach(id => {
            results.set(id, (results.get(id) || 0) + 10);
        });

        return Array.from(results.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([id]) => id);
    }

    private searchExact(tokens: Token[]): SearchItemId[] {
        const resultSets: Set<SearchItemId>[] = tokens.map(
            token => this.index.get(token) || new Set(),
        );

        if (resultSets.length === 0) {
            return [];
        }

        const [firstSet, ...restSets] = resultSets;
        return [...firstSet].filter(id => restSets.every(set => set.has(id)));
    }

    private searchPartial(tokens: Token[]): SearchItemId[] {
        const allMatches = new Set<SearchItemId>();

        for (const token of tokens) {
            for (const [indexToken, itemIds] of this.index.entries()) {
                if (indexToken.startsWith(token) && indexToken !== token) {
                    itemIds.forEach(id => allMatches.add(id));
                }
            }
        }

        return Array.from(allMatches);
    }

    private searchSubstring(query: string): SearchItemId[] {
        const matches = new Set<SearchItemId>();

        for (const [indexToken, itemIds] of this.index.entries()) {
            if (indexToken.includes(query) && indexToken !== query) {
                itemIds.forEach(id => matches.add(id));
            }
        }

        return Array.from(matches);
    }

    private searchFuzzy(tokens: Token[]): SearchItemId[] {
        const matches = new Set<SearchItemId>();

        for (const token of tokens) {
            if (token.length < 3) {
                continue;
            }

            for (const [indexToken, itemIds] of this.index.entries()) {
                if (this.isFuzzyMatch(token, indexToken)) {
                    itemIds.forEach(id => matches.add(id));
                }
            }
        }

        return Array.from(matches);
    }

    private isFuzzyMatch(query: string, target: string): boolean {
        if (query === target) return false;
        if (target.startsWith(query)) return false;
        if (target.includes(query)) return false;

        if (Math.abs(query.length - target.length) > 2) {
            return false;
        }

        const maxDistance = query.length > 4 ? 1 : 0;

        return this.levenshteinDistance(query, target) <= maxDistance;
    }

    private levenshteinDistance(a: string, b: string): number {
        const matrix = Array(b.length + 1).fill(null).map(
            () => Array(a.length + 1).fill(null),
        );

        for (let i = 0; i <= a.length; i++) {
            matrix[0][i] = i;
        }

        for (let j = 0; j <= b.length; j++) {
            matrix[j][0] = j;
        }

        for (let j = 1; j <= b.length; j++) {
            for (let i = 1; i <= a.length; i++) {
                const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[j][i] = Math.min(
                    matrix[j][i - 1] + 1,
                    matrix[j - 1][i] + 1,
                    matrix[j - 1][i - 1] + indicator,
                );
            }
        }

        return matrix[b.length][a.length];
    }

    public serialize(): InputIndex {
        return Search.fromInitializedIndex(this.index);
    }

    private static tokenize(text: string): Token[] {
        return text
            .toLowerCase()
            .split(/\s+/)
            .reduce<string[]>((tokens, word) => {
                const cleaned = word.replace(/[^\p{L}\p{N}]/gu, '').trim();

                if (cleaned) {
                    tokens.push(cleaned);
                }

                return tokens;
            }, []);
    }

    private static buildIndex(items: SearchItem[]) {
        const index = new Map();

        for (const item of items) {
            const tokens = item.text.flatMap(Search.tokenize);

            for (const token of tokens) {
                if (!index.has(token)) {
                    index.set(token, new Set());
                }

                index.get(token)?.add(item.id);
            }
        }

        return index;
    }

    private static toInitializedIndex(index: InputIndex) {
        const initializedIndex = new Map();

        for (const [token, ids] of Object.entries(index)) {
            initializedIndex.set(token, new Set(ids));
        }

        return initializedIndex;
    }

    private static fromInitializedIndex(index: InitializedIndex): InputIndex {
        const inputIndex: InputIndex = {};

        for (const [token, ids] of index.entries()) {
            inputIndex[token] = [...ids];
        }

        return inputIndex;
    }
}
