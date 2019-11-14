'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        console.log(ctx.params);

        ctx.body = 'hi, egg';
    }

    async add() {
        const { ctx } = this;
        console.log(ctx.params);

        ctx.body = 'add ty son';
    }

    async sub() {
        const { ctx } = this;
        console.log(ctx.params);

        ctx.body = 'sub ty son';
    }
}

module.exports = HomeController;