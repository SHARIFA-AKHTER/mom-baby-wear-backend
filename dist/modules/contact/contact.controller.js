"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("./contact.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const createMessage = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await contact_service_1.ContactService.createMessage(req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, 'Message sent successfully!', result);
});
const getAllMessages = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await contact_service_1.ContactService.getAllMessages();
    (0, sendResponse_1.sendResponse)(res, 200, true, 'Messages retrieved successfully!', result);
});
const deleteMessage = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const result = await contact_service_1.ContactService.deleteMessage(id);
    (0, sendResponse_1.sendResponse)(res, 200, true, 'Message deleted successfully!', result);
});
exports.ContactController = {
    createMessage,
    getAllMessages,
    deleteMessage
};
