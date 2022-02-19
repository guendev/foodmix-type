import {Router} from "express";

export default interface IRouter {
    prefix: string,
    router: Router
}
