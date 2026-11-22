const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    sendConnectionRequest,
    getConnectionSuggestions,
    getConnectionRequests,
    acceptConnectionRequest,
    rejectConnectionRequest,
    getMyConnections,
    removeConnection,
} = require("../controllers/connectionController");


router.post(
    "/request/:userId",
    authMiddleware,
    sendConnectionRequest
);


router.get(
    "/suggestions",
    authMiddleware,
    getConnectionSuggestions
);


router.get(
    "/requests",
    authMiddleware,
    getConnectionRequests
);


router.put(
    "/request/:userId/accept",
    authMiddleware,
    acceptConnectionRequest
);


router.delete(
    "/request/:userId/reject",
    authMiddleware,
    rejectConnectionRequest
);


router.get(
    "/",
    authMiddleware,
    getMyConnections
);


router.delete(
    "/:userId",
    authMiddleware,
    removeConnection
);


module.exports = router;