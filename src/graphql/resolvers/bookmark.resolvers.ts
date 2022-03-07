import { wrapperGraphql } from '@actions/wrapper';
import { IResolvers } from '@graphql-tools/utils'
import {AuthenticationError} from "apollo-server-express";
import {checkBookmarkAction} from "@actions/query/bookmark.query";
import {bookmarkAction} from "@actions/mutations/bookmark.mutation";

const bookmarkResolver: IResolvers = {

    Query: {
        checkBookmark: async (_, { id }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Bạn cần đăng nhập')
            }
            return wrapperGraphql(() => checkBookmarkAction(user, id))
        }
    },

    Mutation: {
        bookmarkToggle: async (_, { id }, { user }) => {
            if (!user) {
                throw new AuthenticationError('Bạn cần đăng nhập')
            }
            return wrapperGraphql(() => bookmarkAction(id, user))
        }
    }

}

export default bookmarkResolver
