import React from "react";
import { BsGithub } from "react-icons/bs";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useRouter } from "next/router";

interface HeaderProps {
    back?: boolean;
}

export default function Header({ back }: HeaderProps) {
    const router = useRouter();
    return (
        <div className="line-center w-full z-50 h-16 bg-gradient-to-t from-slate-800/20 to-slate-900 backdrop-blur text-slate-200 border-b border-slate-200/50 fixed">
            <div className="w-full line-left ml-4 relative">
                {back && (
                    <div
                        onClick={() => router.back()}
                        className="cursor-pointer hover:text-slate-700 with-transition"
                    >
                        <FiArrowLeftCircle size="2em" />
                    </div>
                )}
                <div className="w-full line-center">
                    <div
                        className={`${
                            back ? "-translate-x-8" : "-translate-x-4"
                        }`}
                    >
                        <BsGithub size="2em" />
                    </div>
                </div>
            </div>
        </div>
    );
}
