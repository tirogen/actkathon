export type User = {
    username: string;
};

export type UserWithPassword = User & {
    password: string;
};
