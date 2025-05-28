import { memo } from "react";

import { classNames } from "../../../lib/classNames/classNames";

import style from "./Alert.module.scss";

export interface AlertProps {
    color: "red" | "green";
    className?: string;
    hidden?: boolean;
    children?: React.ReactNode;
}

export const Alert = memo(
    ({ className, children, color, hidden, ...otherProps }: AlertProps) => {
        if (hidden) return null;
        return (
            <div
                className="bg-red-50 text-red-700 p-3 rounded-lg mt-2"
                {...otherProps}
            >
                {children}
            </div>
        );
    },
);
