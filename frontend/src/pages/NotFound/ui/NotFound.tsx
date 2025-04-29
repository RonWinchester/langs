import { memo } from "react";

import { classNames } from "../../../lib/classNames/classNames";

import style from "./NotFound.module.scss";

interface NotFoundProps {
    className?: string;
}

export const NotFound = memo(
    ({ className, ...otherProps }: NotFoundProps) => {
        return (
            <div
                className={classNames(style.NotFound, {}, [className])}
                {...otherProps}
            >
                Страница не найдена
            </div>
        );
    },
);
