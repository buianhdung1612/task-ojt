const taskRoute = require("./task.route");
const userRoute = require("./users.route");

const userMiddleware = require("../../middlewares/client/user.middleware");

module.exports = (app) => {
    app.use("/tasks", taskRoute);
    app.use("/users", userRoute);
}   