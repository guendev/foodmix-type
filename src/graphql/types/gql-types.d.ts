export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type User = Document & {
    __typename?: 'User';
    _id: Scalars['ID'];
    id?: Maybe<Scalars['ID']>;
    name: Scalars['String'];
    email: Scalars['String'];
    slug: Scalars['String'];
    role: Scalars['String'];
    avatar?: Maybe<Scalars['String']>;
    banner?: Maybe<Scalars['String']>;
    province?: Maybe<Scalars['String']>;
    about?: Maybe<Scalars['String']>;
    countRecipe?: Maybe<Scalars['Int']>;
    countRating?: Maybe<Scalars['Int']>;
    totalRating?: Maybe<Scalars['Int']>;
    rating?: Maybe<Scalars['Int']>;
    createdAt: Scalars['Float'];
};

export type SignUpInput = {
    name: Scalars['String'];
    email: Scalars['String'];
    password: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    getAll: Array<Maybe<User>>;
};

export type Token = {
    __typename?: 'Token';
    token: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    signup: Token;
};


export type MutationSignupArgs = {
    input: SignUpInput;
};

export type Subscription = {
    __typename?: 'Subscription';
    subUser: User;
};

export type Document = {
    _id: Scalars['ID'];
    id?: Maybe<Scalars['ID']>;
    createdAt: Scalars['Float'];
};
