const Task = require("../../models/task.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const userCondition = [
        { createdBy: req.user._id.toString() },
        { listUser: { $elemMatch: { _id: req.user._id.toString() } } }
    ];

    const find = {
        $and: [
            { $or: userCondition },
            { deleted: false }
        ]
    };

    if (req.query.status) {
        find.$and.push({ status: req.query.status });
    }

    // Sort
    const sort = {}
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    // End Sort

    // Sort theo ngày hôm nay
    if (req.query.today == "true") {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        find.$and.push({
            $or: [
                { timeStart: { $gte: start, $lte: end } },
                { timeFinish: { $gte: start, $lte: end } }
            ]
        });
    }

    // Phân trang
    // let page = 1;
    // let limitItems = 4;

    // if(req.query.page){
    //     page = parseInt(req.query.page);
    // }

    // if(req.query.limit){
    //     limitItems = parseInt(req.query.limit);
    // }

    // const skip = (page - 1) * limitItems;
    // Hết Phân trang

    // Tìm kiếm
    if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.$and.push({ title: regex });
    }
    // Hết Tìm kiếm

    // const tasks = await Task.find(find).sort(sort).limit(limitItems).skip(skip);
    const tasks = await Task.find(find).sort(sort);

    res.json(tasks);
}

module.exports.detail = async (req, res) => {
    const id = req.params.id;

    const task = await Task.findOne({
        _id: id,
        deleted: false
    });

    res.json(task);
}

module.exports.changeStatus = async (req, res) => {
    await Task.updateOne({
        _id: req.body.id
    }, {
        status: req.body.status
    });

    res.json({
        code: "success",
        message: "Thay đổi trạng thái thành công!"
    })
}

module.exports.changeStatusPatch = async (req, res) => {
    await Task.updateMany({
        _id: { $in: req.body.ids }
    }, {
        status: req.body.status
    });

    res.json({
        code: "success",
        message: "Thay đổi trạng thái thành công!"
    })
}

module.exports.createPost = async (req, res) => {
    const data = req.body;
    data.createdBy = req.user._id;

    const taskParentId = req.body.taskParentId;
    const existTaskParent = Task.findOne({
        _id: taskParentId,
        deleted: false
    });

    if (!existTaskParent) {
        res.json({
            code: "error",
            message: "Id công việc cha không hợp lệ!",
            data: task
        });
        return;
    }

    const task = new Task(data);
    await task.save();

    res.json({
        code: "success",
        message: "Tạo công việc thành công!",
        data: task
    })
}

module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const task = await Task.findOne({
        _id: id,
        deleted: false
    });

    if (!task) {
        res.json({
            code: "error",
            message: "Công việc này đã được xóa"
        });

        return;
    }

    for (const userId of data.listUser) {
        const existUser = await User.findOne({
            _id: userId,
            deleted: false
        });

        if (!existUser) {
            res.json({
                code: "error",
                message: "Người dùng không hợp lệ"
            });

            return;
        }
    }

    await Task.updateOne({
        _id: id
    }, data);

    res.json({
        code: "success",
        message: "Cập nhật công việc thành công!"
    })
}

module.exports.delete = async (req, res) => {
    await Task.updateOne({
        _id: req.body.id
    }, {
        deleted: true
    });

    res.json({
        code: "success",
        message: "Xóa thành công!"
    })
}

module.exports.deleteMultiPatch = async (req, res) => {
    const ids = req.body.ids;

    await Task.updateMany({
        _id: { $in: ids }
    }, {
        deleted: true
    });

    res.json({
        code: "success",
        message: "Xóa thành công!"
    })
}