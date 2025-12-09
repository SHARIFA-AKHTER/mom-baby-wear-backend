
import { catchAsync } from "../../utils/catchAsync";
import { InventoryService } from "./inventory.service";


 const updateStock = catchAsync(async (req: { params: { productId: string; }; body: { quantity: number; }; }, res: { json: (arg0: { success: boolean; message: string; data: any; }) => void; }) => {
    const result = await InventoryService.updateStock(req.params.productId, req.body.quantity);
    res.json({ success: true, message: "Stock updated", data: result });
  })

 const getInventory = catchAsync(async (req: any, res: { json: (arg0: { success: boolean; data: any; }) => void; }) => {
    const result = await InventoryService.getInventory();
    res.json({ success: true, data: result });
  })

  const getProductInventory = catchAsync(async (req: { params: { productId: string; }; }, res: { json: (arg0: { success: boolean; data: any; }) => void; }) => {
    const result = await InventoryService.getProductInventory(req.params.productId);
    res.json({ success: true, data: result });
  })
export const InventoryController = {
 updateStock ,
 getInventory,
 getProductInventory

}
