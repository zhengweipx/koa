const router = require('koa-router')();
const { getWeather } = require("../controllers/weather");


router.prefix('/weather');

router.get('/', async (ctx, next) => {
  const city = ctx.query.city || "西安";
  // 连接数据库
  const weatherData = await getWeather(city);
  ctx.body = weatherData;
  console.log(`originalUrl: ${ctx.originalUrl} 状态码：${ctx.res.statusCode}`);
});

router.get('/:id', async (ctx, next) => {
  ctx.body = ctx.params;
});

router.get('/:id/query', async (ctx, next) => {
  ctx.body = ctx.query;
});

router.post('/post', async (ctx, next) => {
  console.log(ctx.method, ctx.request.body);
  console.log(ctx.request.files);
  ctx.body = ctx.request.body;
});

module.exports = router;