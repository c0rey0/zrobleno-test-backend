const Router = require('koa-joi-router');
const TestService = require('../../../shared/services/TestService')

const router = Router();


router.route({
    method: 'GET',
    path: '/goods/',
    async handler(ctx) {

        ctx.body = TestService.getTestData();
    }
});


module.exports = router
    .prefix('/api')
    .middleware();
