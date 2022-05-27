const Koa = require("koa");
const path = require("path");

const app = new Koa();
const koaBody = require("koa-body");
const koaStatic = require("koa-static");

const weather = require("./routes/weather");
const fileload = require("./routes/fileload");

// middlewares
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      uploadDir: path.join(__dirname, "../public/upload/"), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      },
    },
  })
);
app.use(koaStatic(path.join(__dirname, "../public")));

// routes
app.use(weather.routes(), weather.allowedMethods());
app.use(fileload.routes(), fileload.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err)
});

module.exports = app;
