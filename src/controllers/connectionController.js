const User = require("../config/models/User");

const sendConnectionRequest = async (req, res) => {
    try {
        const senderId = req.user.userId;
        const { userId: receiverId } = req.params;

        if (senderId === receiverId) {
            return res.status(400).json({
                success: false,
                message: "You cannot send connection request to yourself",
            });
        }

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Already connected
        if (sender.connections.includes(receiverId)) {
            return res.status(400).json({
                success: false,
                message: "You are already connected",
            });
        }

        // Request already sent
        if (receiver.connectionRequests.includes(senderId)) {
            return res.status(400).json({
                success: false,
                message: "Connection request already sent",
            });
        }

        receiver.connectionRequests.push(senderId);

        await receiver.save();

        return res.status(200).json({
            success: true,
            message: "Connection request sent successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getConnectionSuggestions = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const users = await User.find({
            _id: {
                $ne: userId,
                $nin: user.connections,
            },
            connectionRequests: {
                $ne: userId,
            },
        }).select("-password");

        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getConnectionRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .populate(
                "connectionRequests",
                "firstName lastName profileImage headline"
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            count: user.connectionRequests.length,
            requests: user.connectionRequests,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const acceptConnectionRequest = async (req, res) => {
    try {
        const receiverId = req.user.userId;
        const { userId: senderId } = req.params;

        const receiver = await User.findById(receiverId);
        const sender = await User.findById(senderId);

        if (!receiver || !sender) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const requestExists = receiver.connectionRequests.includes(senderId);

        if (!requestExists) {
            return res.status(400).json({
                success: false,
                message: "Connection request not found",
            });
        }

        // Remove request
        receiver.connectionRequests.pull(senderId);

        // Add connection to both users
        receiver.connections.push(senderId);
        sender.connections.push(receiverId);

        await receiver.save();
        await sender.save();

        return res.status(200).json({
            success: true,
            message: "Connection request accepted",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const rejectConnectionRequest = async (req, res) => {
    try {
        const receiverId = req.user.userId;
        const { userId: senderId } = req.params;

        const user = await User.findById(receiverId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const requestExists = user.connectionRequests.includes(senderId);

        if (!requestExists) {
            return res.status(400).json({
                success: false,
                message: "Connection request not found",
            });
        }

        user.connectionRequests.pull(senderId);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Connection request rejected",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyConnections = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .populate(
                "connections",
                "firstName lastName profileImage headline"
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            count: user.connections.length,
            connections: user.connections,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const removeConnection = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { userId: connectionId } = req.params;

        const user = await User.findById(userId);
        const connectionUser = await User.findById(connectionId);

        if (!user || !connectionUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.connections.pull(connectionId);
        connectionUser.connections.pull(userId);

        await user.save();
        await connectionUser.save();

        return res.status(200).json({
            success: true,
            message: "Connection removed successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    sendConnectionRequest,
    getConnectionSuggestions,
    getConnectionRequests,
    acceptConnectionRequest,
    rejectConnectionRequest,
    getMyConnections,
    removeConnection,
}