import { memo } from "react";

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
                className={
                    "p-3 rounded-lg mt-2" +
                    " " +
                    className +
                    " " +
                    (color === "red"
                        ? "bg-red-50 text-red-700"
                        : "bg-green-50 text-green-700")
                }
                {...otherProps}
            >
                {children}
            </div>
        );
    },
);
