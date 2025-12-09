
import { catchAsync } from "../../utils/catchAsync";
import { WishlistService } from "./wishlist.service";


 const add = catchAsync(async (req: { user: { id: string; }; body: { productId: string; }; }, res: { json: (arg0: { success: boolean; message: string; data: any; }) => void; }) => {
    const result = await WishlistService.add(req.user.id, req.body.productId);
    res.json({ success: true, message: "Added to wishlist", data: result });
  })

  const get = catchAsync(async (req: { user: { id: string; }; }, res: { json: (arg0: { success: boolean; data: any; }) => void; }) => {
    const result = await WishlistService.get(req.user.id);
    res.json({ success: true, data: result });
  })

  const remove = catchAsync(async (req: { user: { id: string; }; params: { productId: string; }; }, res: { json: (arg0: { success: boolean; message: string; data: any; }) => void; }) => {
    const result = await WishlistService.remove(req.user.id, req.params.productId);
    res.json({ success: true, message: "Removed", data: result });
  })

 export const WishlistController = {
add,
get,
remove
};
