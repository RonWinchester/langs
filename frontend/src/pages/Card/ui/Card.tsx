import { TrpcRouterOutput } from "@langs/backend/src/router";
import { ArrowLeft, Award, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PageWrapper from "../../../components/PageWrapper";
import { useAuth } from "../../../lib/context/AppContext";
import { getEditRoute } from "../../../lib/router/routes";
import { trpc } from "../../../lib/trpc";

const Card: React.FC<{
    data: NonNullable<TrpcRouterOutput["getCard"]>;
    id: number;
    refetch?: () => void;
}> = ({ data, id, refetch }) => {
    const { user } = useAuth();

    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [selectedRight, setSelectedRight] = useState<number | null>(null);
    const [pairs, setPairs] = useState<{ left: number; right: number }[]>([]);
    const [matchError, setMatchError] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedLeft !== null && selectedRight !== null) {
            const isMatch = selectedLeft === selectedRight;

            if (isMatch) {
                setTimeout(() => {
                    setPairs((prev) => [
                        ...prev,
                        { left: selectedLeft, right: selectedRight },
                    ]);
                    setSelectedLeft(null);
                    setSelectedRight(null);
                }, 500);
            } else {
                setMatchError(true);
                setTimeout(() => {
                    setMatchError(false);
                    setSelectedLeft(null);
                    setSelectedRight(null);
                }, 500);
            }
        }
    }, [selectedLeft, selectedRight]);

    useEffect(() => {
        if (data && pairs.length === data.leftWords.length) {
            setGameCompleted(true);
        }
    }, [pairs, data]);

    const handleRestart = () => {
        setPairs([]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setGameCompleted(false);
        refetch?.();
    };

    const goBack = () => {
        navigate("/");
    };

    if (!data) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600">Набор слов не найден</p>
                <button
                    onClick={goBack}
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                    Вернуться на главную
                </button>
            </div>
        );
    }

    if (gameCompleted) {
        return (
            <div className="fade-in flex flex-col items-center justify-center py-10 text-center">
                <div className="text-yellow-500 mb-4">
                    <Award size={80} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Поздравляем!</h2>
                <p className="text-lg mb-6">
                    Вы успешно завершили игру "{data.theme}"
                </p>
                <div className="space-y-4">
                    <button
                        onClick={handleRestart}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                        Играть снова
                    </button>
                    <button
                        onClick={goBack}
                        className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition-colors"
                    >
                        Вернуться к списку игр
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div className="flex items-center mb-6">
                <button
                    onClick={goBack}
                    className="p-2 mr-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{data.theme}</h2>
                        {data.author.id === user?.id && id && (
                            <Link
                                to={getEditRoute(id)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Редактировать"
                            >
                                <Edit2 size={18} />
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>Автор: {data.author.name}</span>
                        {data.createdAt && (
                            <span className="ml-4">
                                Создано:{" "}
                                {new Date(data.createdAt).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Английский:
                    </h3>
                    <div className="space-y-2">
                        {data.leftWords
                            .sort((a) =>
                                pairs.some((p) => p.left === a.id) ? -1 : 1,
                            )
                            .map((word) => (
                                <button
                                    key={word.id}
                                    className={`w-full py-3 px-4 rounded-lg text-left no-select transition-colors ${
                                        pairs.some((p) => p.left === word.id)
                                            ? "bg-green-100 text-green-800 cursor-default"
                                            : selectedLeft === word.id
                                              ? "bg-blue-100 border-2 border-blue-500"
                                              : "bg-white border border-gray-200 hover:border-blue-300"
                                    } ${
                                        matchError && selectedLeft === word.id
                                            ? "bg-red-100 border-2 border-red-500"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        !pairs.some(
                                            (p) => p.left === word.id,
                                        ) && setSelectedLeft(word.id)
                                    }
                                    disabled={pairs.some(
                                        (p) => p.left === word.id,
                                    )}
                                >
                                    {word.text}
                                </button>
                            ))}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Русский:
                    </h3>
                    <div className="space-y-2">
                        {data.rightWords
                            .sort((a) =>
                                pairs.some((p) => p.right === a.id) ? -1 : 1,
                            )
                            .map((word) => (
                                <button
                                    key={word.id}
                                    className={`w-full py-3 px-4 rounded-lg text-left no-select transition-colors ${
                                        pairs.some((p) => p.right === word.id)
                                            ? "bg-green-100 text-green-800 cursor-default"
                                            : selectedRight === word.id
                                              ? "bg-blue-100 border-2 border-blue-500"
                                              : "bg-white border border-gray-200 hover:border-blue-300"
                                    } ${
                                        matchError && selectedRight === word.id
                                            ? "bg-red-100 border-2 border-red-500"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        !pairs.some(
                                            (p) => p.right === word.id,
                                        ) && setSelectedRight(word.id)
                                    }
                                    disabled={pairs.some(
                                        (p) => p.right === word.id,
                                    )}
                                >
                                    {word.text}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-600">
                Выберите слово на английском, затем соответствующее слово на
                русском
            </div>
        </div>
    );
};

const WrappedCard = PageWrapper(Card);

const CardView = () => {
    const { id } = useParams();
    return (
        <WrappedCard
            useQuery={() => trpc.getCard.useQuery({ id: Number(id) })}
            id={Number(id)}
        />
    );
};

export default CardView;
