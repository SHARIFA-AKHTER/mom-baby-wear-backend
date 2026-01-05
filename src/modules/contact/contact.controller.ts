import { Request, Response } from 'express';
import { ContactService } from './contact.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';


const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.createMessage(req.body);


  sendResponse(res, 201, true, 'Message sent successfully!', result);
});

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.getAllMessages();

  sendResponse(res, 200, true, 'Messages retrieved successfully!', result);
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactService.deleteMessage(id);
  sendResponse(res, 200, true, 'Message deleted successfully!', result);
});

export const ContactController = {
  createMessage,
  getAllMessages,
  deleteMessage
};