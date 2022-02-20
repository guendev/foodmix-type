import transformerKey from "../src/shared/transformer";

export type UsersSchema = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

type Keys = keyof UsersSchema


function run() {
    const test = {
        id: 1,
        firstName: 'string',
        lastName: 'string',
        email: 'string'
    }

    const test1: UsersSchema = transformerKey<UsersSchema>(test,['id', 'firstName', 'lastName', 'email'])
    console.log(test1)
}

run()
