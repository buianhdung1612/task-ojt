const taskRoute = require("./task.route");
const userRoute = require("./users.route");

module.exports = (app) => {
    app.use("/tasks", taskRoute);
    app.use("/users", userRoute);
}   