
import { catchAsync } from "../../utils/catchAsync";
import { ICartItem } from "./cart.interface";
import { CartService } from "./cart.service";


  const addToCart = catchAsync(async (req: { user: { id: string; }; body: ICartItem; }, res: { json: (arg0: { success: boolean; message: string; data: any; }) => void; }) => {
    const result = await CartService.addToCart(req.user.id, req.body);
    res.json({ success: true, message: "Item added to cart", data: result });
  })

 const getCart = catchAsync(async (req: { user: { id: string; }; }, res: { json: (arg0: { success: boolean; data: any; }) => void; }) => {
    const result = await CartService.getCart(req.user.id);
    res.json({ success: true, data: result });
  })

  const removeItem = catchAsync(async (req: { user: { id: string; }; params: { productId: string; }; }, res: { json: (arg0: { success: boolean; message: string; data: any; }) => void; }) => {
    const result = await CartService.removeItem(req.user.id, req.params.productId);
    res.json({ success: true, message: "Removed item", data: result });
  })

 const clearCart = catchAsync(async (req: { user: { id: string; }; }, res: { json: (arg0: { success: boolean; message: string; data: any; }) => void; }) => {
    const result = await CartService.clearCart(req.user.id);
    res.json({ success: true, message: "Cart cleared", data: result });
  })

  export const CartController = {
addToCart,
getCart ,
removeItem,
clearCart
};
