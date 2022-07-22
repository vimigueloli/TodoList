import React from "react";
import api from "services/api";
import { GetServerSideProps } from "next";
import UserBox from "components/UserBox";

interface userListProps {
    users: any[];
}

export default function Home({ users }: userListProps) {
    return (
        <div className="pt-20 w-full h-full">
            <div className="line-center text-4xl font-thin ">USUÁRIOS</div>
            <div className="mt-16 w-full px-2 st:px-8 line-around pb-32 gap-x-16 gap-y-16 flex-wrap">
                {users !== null && (
                    <>
                        {users.map((user) => (
                            <UserBox
                                key={user.id}
                                id={user.id}
                                name={user.name}
                                company={user.company.name}
                                email={user.email}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

//export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const response = await api.get("/users");
        return {
            props: { users: response.data },
        };
    } catch {
        return {
            props: { users: null },
        };
    }
};
