import transformerKey from "../src/shared/transformer";

export type UsersSchema = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

type Keys = keyof UsersSchema

interface IFoo {
    name: string
}


function run() {
    const obj = {
        name: 'Foo',
        bar: 'Bar'
    }

    const test: IFoo = obj

    console.log(test)
}

run()
