import { Trash2 } from "lucide-react";

type WordPair = {
    original: string;
    translation: string;
    deleted?: boolean;
    id?: number;
};

interface WordPairFormElemenProps {
    index: number;
    pair: WordPair;
    words: WordPair[];
    handleDelete?: boolean;
    setWords: React.Dispatch<
        React.SetStateAction<{ original: string; translation: string }[]>
    >;
}

const WordPairFormElemen = ({
    index,
    pair,
    words,
    setWords,
    handleDelete = false,
}: WordPairFormElemenProps) => {
    const handleWordPairChange = (
        index: number,
        language: "original" | "translation",
        value: string,
    ) => {
        const newWordPairs = [...words];
        newWordPairs[index][language] = value;
        setWords(newWordPairs);
    };

    const handleRemoveWordPair = (index: number) => {
        const newWordPairs = [...words];

        if (handleDelete && pair.id) {
            newWordPairs.forEach((word, i) => {
                if (i === index) {
                    word.deleted = true;
                }
            });
        } else {
            newWordPairs.splice(index, 1);
        }
        setWords(newWordPairs);
    };

    return (
        <div key={index} className="flex mb-3 items-center">
            <div className="flex-1 mr-2">
                <input
                    type="text"
                    value={pair.original}
                    onChange={(e) =>
                        handleWordPairChange(index, "original", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Английский"
                    required
                />
            </div>
            <div className="flex-1 mr-2">
                <input
                    type="text"
                    value={pair.translation}
                    onChange={(e) =>
                        handleWordPairChange(
                            index,
                            "translation",
                            e.target.value,
                        )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Русский"
                    required
                />
            </div>
            <button
                type="button"
                onClick={() => handleRemoveWordPair(index)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Remove word pair"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};

export default WordPairFormElemen;
