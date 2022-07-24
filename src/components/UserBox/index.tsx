import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

interface userProps {
    id: number;
    name: string;
    company: string;
    email: string;
}

export default function UserBox({ id, name, company, email }: userProps) {
    const router = useRouter();

    return (
        <div
            className={`w-56 h-64 border rounded-md p-4 border-sky-800 text-slate-400 relative cursor-pointer 
            hover:border-sky-500  hover:bg-purple-900/5 hover:text-white with-transition`}
            onClick={() => {
                router.push(`${id}`);
            }}
        >
            <div className="w-full line-center h-32 relative">
                <FaUserCircle size="4em" />
            </div>
            <div className="line-center text-center text-white">{name}</div>
            <div className="text-xs mt-2 text-slate-400 line-center text-center">
                {company}
            </div>
            <div className="text-xs mt-2 line-center text-center underline text-slate-200">
                {email}
            </div>
        </div>
    );
}
