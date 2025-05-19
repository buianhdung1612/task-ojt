const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: String,
        taskParentId: String,
        status: String, // "initial", "pending", "doing", "finish", "notFinish"
        content: String,
        timeStart: Date,
        timeFinish: Date,
        createdBy: String,
        listUser: Array,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    }, {
    timestamps: true
}
);

const Task = mongoose.model('Task', taskSchema, "tasks");
module.exports = Task;