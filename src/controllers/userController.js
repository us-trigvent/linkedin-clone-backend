const User = require("../config/models/User");

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
module.exports = { getUserProfile };