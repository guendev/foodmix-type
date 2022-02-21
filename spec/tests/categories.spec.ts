import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';

import initServer from '@server';
import { p as categoryPaths } from '@routes/categories';
import { ICategoryInput } from '@services/category.service';
import {pErr} from "@shared/functions";

type TReqBody = string | object | undefined;


describe('category-router', async () => {

    const paths = '/api/categories';
    const postCreate = `${paths}${categoryPaths.create}`;

    const { BAD_REQUEST, CREATED, OK } = StatusCodes;
    let agent: SuperTest<Test>;


    beforeAll( (done: () => void) => {
        console.log(':::::::::::::STARTING TEST SERVER:::::::::::::');
        initServer().then((result) => {
            agent = supertest.agent(result);
            done();
        })
    });

    /***********************************************************************************
     *                                    Test Tạo Category
     **********************************************************************************/

    describe(`"POST:${postCreate}"`, () => {

        it(`Trả về JSON với status: "${OK}" nếu request thành công.`, (done) => {
            const form: ICategoryInput = {
                name: 'Cá cảnh',
                avatar: 'https://',
                content: 'Nội dung'
            }
            agent.post(postCreate)
                .type('form')
                .send(form)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                })

        });
    });
});
