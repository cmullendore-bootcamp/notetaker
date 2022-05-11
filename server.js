const { response } = require('express');
const Express = require('express');
const router = require('express').Router();
const apiRoutes = require("./routes/api");
const htmlRoutes = require("./routes/html");

const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));
app.use(Express.json());

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(process.env.PORT, () => {
    console.log(`API server running!`);
});