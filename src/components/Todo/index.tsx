import React from "react";
import { BsCheck2 } from "react-icons/bs";

interface TodoProps {
    content: string;
    state: boolean;
    changeState: Function;
}

export default function Todo({ content, state, changeState }: TodoProps) {
    return (
        <>
            <div className="w-4 mr-4 ">
                <div
                    className={`w-4 h-4 min-w-4 min-h-4 cursor-pointer rounded border border-sky-800 translate-y-[4px]
                    ${state ? "bg-sky-800" : ""}`}
                    onClick={() => changeState()}
                />
            </div>
            <div
                className={`min-h-4 ${state ? "line-through opacity-80" : ""}`}
            >
                {content}
            </div>
        </>
    );
}
