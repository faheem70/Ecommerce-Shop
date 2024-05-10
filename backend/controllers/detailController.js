const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Detail = require("../models/detailModel");

exports.detailCreate = catchAsyncErrors(async (req, res) => {
    try {
        const { name, email, number } = req.body;

        const detail = new Detail({
            name,
            email,
            number
        })
        await detail.save();
        res.status(200).json({ success: true, message: "Details Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.getDetails = catchAsyncErrors(async (req, res) => {
    try {
        const userId = req.params.id;
        const userDetail = await Detail.findById(userId);

        if (!userDetail) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: userDetail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});