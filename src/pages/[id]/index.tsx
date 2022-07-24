import React, { useEffect, useState } from "react";
import api from "services/api";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Loading from "react-loading";
import toast from "react-hot-toast";
import Todo from "components/Todo";
import { AiOutlinePlus } from "react-icons/ai";

interface todoListProps {
    user: any;
}

export default function TodoList({ user }: todoListProps) {
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [adding, setAddingd] = useState<boolean>(false);
    const [newTodo, setNewTodo] = useState<string>("");

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

    async function changeItemState(id: number) {
        let output = todos.map((item) =>
            item.id === id ? { ...item, state: !item.state } : item
        );
        setTodos(output);
    }

    async function addNewTodo(e: Event) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post("/todos", {
                title: newTodo,
                userId: user.id,
                completed: false,
            });
            console.log("response ->", response.data);
            setTodos([
                {
                    title: newTodo,
                    completed: false,
                    id: todos[todos.length - 1].id + 1,
                },
                ...todos,
            ]);
            toast.success("Tarefa adicionada com sucesso");
            setAddingd(false);
            setNewTodo("");
            setLoading(false);
        } catch (e) {
            toast.error("Erro ao adicionar tarefa");
            setLoading(false);
        }
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
                    <div className="mt-32 line-center">
                        <Loading type="spin" color="#fff" />
                    </div>
                )}

                {
                    // * add todo
                    !loading && !adding && (
                        <div className="line-center">
                            <div
                                className="line-center cursor-pointer rounded-lg w-6 h-6 border border-sky-800 text-sky-800
                                hover:bg-purple-900/5 hover:text-white  with-transition"
                                onClick={() => setAddingd(true)}
                            >
                                <AiOutlinePlus size="0.8em" />
                            </div>
                        </div>
                    )
                }
                {
                    // * add todo form
                    !loading && adding && (
                        <form id="new" onSubmit={(e: any) => addNewTodo(e)}>
                            <div className="line-left pl-2 st:line-center">
                                <div className="st:w-10/12 md:w-3/4 lg:w-1/2 mt-4 line-left items-start">
                                    <div className="w-4 line-center mr-4">
                                        {" "}
                                        -
                                    </div>
                                    <input
                                        className="w-full input border-b border-sky-800 bg-transparent placeholder-sky-800 pb-1 text-white"
                                        placeholder="Adicionar tarefa"
                                        value={newTodo}
                                        onChange={(e) =>
                                            setNewTodo(e.target.value)
                                        }
                                        required
                                    />
                                    <button
                                        form="new"
                                        className="button border border-sky-800 p-1 mx-4"
                                    >
                                        concluir
                                    </button>
                                </div>
                            </div>
                        </form>
                    )
                }

                {!loading &&
                    todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="line-left pl-2 st:line-center"
                        >
                            <div className="st:w-10/12 md:w-3/4 lg:w-1/2 mt-4 line-left items-start">
                                <Todo
                                    content={todo.title}
                                    state={todo.completed}
                                    changeState={() => changeItemState(todo.id)}
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
