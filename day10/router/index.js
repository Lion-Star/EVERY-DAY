const router = require('koa-router')();

const changeRouter = require("./change")

const userRouter = require("./user")

router.use(userRouter.routes(), userRouter.allowedMethods());

router.use(changeRouter.routes(), changeRouter.allowedMethods());

module.exports = router