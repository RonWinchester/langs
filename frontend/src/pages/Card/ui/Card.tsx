import { useParams } from "react-router-dom";

import { classNames } from "../../../lib/classNames/classNames";
import { trpc } from "../../../lib/trpc";

import style from "./Card.module.scss";

const Card = () => {
    const { id } = useParams();

    const { data, isError, isLoading } = trpc.getCard.useQuery({
        id: Number(id),
    });

    if (!data) {
        return <div>Card not found</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>Loading</div>;
    }
    return (
        <div>
            <h1>{data.theme}</h1>
            <div className={style.wrapper}>
                <div className={classNames(style.words, {}, [style.left])}>
                    {data.leftWords.map((word) => (
                        <div className={style.word} key={word.id}>{word.text}</div>
                    ))}
                </div>
                <div className={classNames(style.words, {}, [style.right])}>
                    {data.rightWords.map((word) => (
                        <div className={style.word} key={word.id}>{word.text}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
