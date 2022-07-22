import React from "react";
import { BsGithub } from "react-icons/bs";

export default function Header() {
    return (
        <div className="line-center w-full z-50 h-16 bg-gradient-to-t from-slate-800/20 to-slate-900 backdrop-blur text-slate-200 border-b border-slate-200/50 fixed">
            <BsGithub size="2em" />
        </div>
    );
}
