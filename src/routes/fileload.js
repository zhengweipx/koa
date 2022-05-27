const router = require('koa-router')();
const send = require('koa-send');

router.get('/fileload/:name', async (ctx) => {
  const name = ctx.params.name;
  const path = `public/upload/${name}`;

  console.log(path, __dirname);
  ctx.attachment(path);
  await send(ctx, path);
});

module.exports = router;
