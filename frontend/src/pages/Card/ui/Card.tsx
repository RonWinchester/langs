import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { classNames } from "../../../lib/classNames/classNames";
import { useAuth } from "../../../lib/context/AppContext";
import { getEditRoute } from "../../../lib/router/routes";
import { trpc } from "../../../lib/trpc";

import style from "./Card.module.scss";

const Card = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { data, isError, isLoading } = trpc.getCard.useQuery({
        id: Number(id),
    });

    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [selectedRight, setSelectedRight] = useState<number | null>(null);
    const [pairs, setPairs] = useState<{ left: number; right: number }[]>([]);
    const [matchSuccess, setMatchSuccess] = useState(false);
    const [matchError, setMatchError] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    useEffect(() => {
        if (selectedLeft !== null && selectedRight !== null) {
            const isMatch = selectedLeft === selectedRight;

            if (isMatch) {
                setMatchSuccess(true);
                setTimeout(() => {
                    setPairs((prev) => [
                        ...prev,
                        { left: selectedLeft, right: selectedRight },
                    ]);
                    setMatchSuccess(false);
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

    if (!data) return <div>Card not found</div>;
    if (isError) return <div>Error</div>;
    if (isLoading) return <div>Loading...</div>;

    const handleRestart = () => {
        setPairs([]);
        setSelectedLeft(null);
        setSelectedRight(null);
        setGameCompleted(false);
    };

    return (
        <div
            className={classNames(style.container, {
                [style.flashGreen]: matchSuccess,
                [style.flashRed]: matchError,
            })}
        >
            <div>
                <h1>{data.theme}</h1>
                {data.author.id === user?.id && id && <Link to={getEditRoute(id)}>edit</Link>}
            </div>
            {data.createdAt && (
                <span>
                    created: {format(new Date(data.createdAt), "yyyy-mm-dd")}
                </span>
            )}
            <span>Author: {data.author.name}</span>
            {gameCompleted ? (
                <div className={style.congrats}>
                    <h2>Поздравляю!</h2>
                    <button onClick={handleRestart}>Заново</button>
                </div>
            ) : (
                <div className={style.wrapper}>
                    <div className={classNames(style.words, {}, [style.left])}>
                        {data.leftWords
                            .sort((a) =>
                                pairs.some((p) => p.left === a.id) ? -1 : 1,
                            )
                            .map((word) => (
                                <div
                                    key={word.id}
                                    className={classNames(style.word, {
                                        [style.selected]:
                                            selectedLeft === word.id,
                                        [style.matched]: pairs.some(
                                            (p) => p.left === word.id,
                                        ),
                                        [style.error]:
                                            matchError &&
                                            selectedLeft === word.id,
                                    })}
                                    onClick={() =>
                                        !pairs.some(
                                            (p) => p.left === word.id,
                                        ) && setSelectedLeft(word.id)
                                    }
                                >
                                    {word.text}
                                </div>
                            ))}
                    </div>
                    <div className={classNames(style.words, {}, [style.right])}>
                        {data.rightWords
                            .sort((a) =>
                                pairs.some((p) => p.right === a.id) ? -1 : 1,
                            )
                            .map((word) => (
                                <div
                                    key={word.id}
                                    className={classNames(style.word, {
                                        [style.selected]:
                                            selectedRight === word.id,
                                        [style.matched]: pairs.some(
                                            (p) => p.right === word.id,
                                        ),
                                        [style.error]:
                                            matchError &&
                                            selectedRight === word.id,
                                    })}
                                    onClick={() =>
                                        !pairs.some(
                                            (p) => p.right === word.id,
                                        ) && setSelectedRight(word.id)
                                    }
                                >
                                    {word.text}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;
