const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: String,
        status: String, // "initial", "pending", "doing", "finish", "notFinish"
        content: String,
        timeStart: Date,
        timeFinish: Date,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
        createdBy: String
    }, {
        timestamps: true
    }
);

const Task = mongoose.model('Task', taskSchema, "tasks");
module.exports = Task;