"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const newsletter_service_1 = require("./newsletter.service");
const subscribe = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await newsletter_service_1.newsletterService.subscribe(req.body);
    (0, sendResponse_1.sendResponse)(res, 201, true, "Subscribed successfully!", result);
});
const getAllSubscribers = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await newsletter_service_1.newsletterService.getAllSubscribers();
    (0, sendResponse_1.sendResponse)(res, 200, true, "Subscribers fetched successfully", result);
});
exports.newsletterController = {
    subscribe,
    getAllSubscribers
};
