import React, { useEffect, useState } from "react";
import api from "services/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Loading from "react-loading";
import toast from "react-hot-toast";
import Todo from "components/Todo";

interface todoListProps {
    user: any;
}

export default function TodoList({ user }: todoListProps) {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    // ? initial todoList search
    useEffect(() => {
        async function getTodos() {
            setLoading(true);
            try {
                const response = await api.get(`/todos?userId=${user.id}`);
                setTodos(response.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                toast.error("Erro ao carregar lista de tarefas");
                setTimeout(() => {
                    router.back();
                }, 2000);
            }
        }
        getTodos();
    }, []);

    // ! adjuste update todolist
    async function changeItemState(id: number, idx: number) {
        let output = todos.map((item) =>
            item.id === id ? { ...item, state: !item.state } : item
        );
        console.log("output", output[idx]);
        setTodos(output);
    }

    return (
        <div className="pt-20 w-full h-full">
            <div className="line-center font-thin text-4xl pl-2">
                <div className="st:w-10/12 md:w-3/4 lg:w-1/2">
                    {user !== null ? `${user.name.toUpperCase()} - ` : ""}
                    TODOLIST
                </div>
            </div>
            <div className="mt-16 pb-32">
                {loading && (
                    <div className="mt-32">
                        <Loading type="spin" color="#fff" />
                    </div>
                )}
                {!loading &&
                    todos.map((todo, idx) => (
                        <div
                            key={todo.id}
                            className="line-left pl-2 st:line-center"
                        >
                            <div className="st:w-10/12 md:w-3/4 lg:w-1/2 mt-4 line-left items-start">
                                <Todo
                                    content={todo.title}
                                    state={todo.completed}
                                    changeState={() =>
                                        changeItemState(todo.id, idx)
                                    }
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const url = ctx.query;
    try {
        const response = await api.get(`/users/${url.id}`);
        return {
            props: { user: response.data },
        };
    } catch {
        const router = useRouter();
        router.back();
        return {
            props: { user: null },
        };
    }
};
