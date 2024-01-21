import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
// REDUX
import {  useSelector} from "react-redux";
import {createSelector} from "reselect";
import { 
  retrieveProcessOrders } from "../../screens/OrdersPage/selector.ts";
import { Order } from "../../../types/order.ts";
import { Product } from "../../../types/product.ts";
import { serverApi } from "../../../lib/config.ts";
import { sweetErrorHandling, sweetFailureProvider } from "../../../lib/sweetAlert.ts";
import OrderApiService from "../../apiServices/orderApiService.ts";
import { verifiedMemberData } from "../../apiServices/verify.ts";

   /** REDUX SELECTOR */
const processOrdersRetriever = createSelector (
  retrieveProcessOrders ,
  (processOrders) =>({
    processOrders,
  })
);


export default function ProcessOrders(props: any) {
    /**INITIALIZATIONS */
    const { processOrders} = useSelector( processOrdersRetriever );

     /**HANDLER */
 const finishOrderHandler = async (event: any) => {
  try {
 const order_id = event.target.value;
 const data = {order_id: order_id, order_status: "DELETED"};

 if(!verifiedMemberData) {
   sweetFailureProvider("Please Login first", true);
 }
 let confirmation = window.confirm("Buyurtmani olganingizni tasdqilaysizmi?");
 if(confirmation) {
    const orderService = new OrderApiService();
    await orderService.updateOrderStatus(data);
    props.setOrderRebuild(new Date());
 }
  } catch(err) {
   console.log("deleteorderhandler, ERROR", err);
   sweetErrorHandling(err).then();
  }
}
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.order_items?.map((item) => {
                   const product: Product = order.product_data.filter(ele => ele._id === item.product_id)[0];
                   const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"}  alt=""/>
                      <p className={"titleDish"}>{product.product_name}</p>
                      <Box className={"priceBox"}>
                        <p>$ {item.item_price}</p>
                        <img
                          style={{ margin: "0 10px" }}
                          src={"/icons/close.svg"} alt=""
                        />
                        <p>{item.item_quantity}</p>
                        <img
                          style={{ margin: "0 10px" }}
                          src={"/icons/pause.svg"} alt=""
                        />
                        <p style={{ marginLeft: "15px" }}>$ {item.item_price * item.item_quantity}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box process"}>
              <div>
                  <span>Maxsulot narxi </span>
                  <span>$ {order.order_total_amount - order.order_delivery_cost}  </span>
                  <img
                    style={{ marginLeft: "35px"}}
                    src={"/icons/plus.svg"} alt=""
                />
                </div>
                <div>
                  <span>Yetkazish xizmati </span>
                  <span>$ {order.order_delivery_cost}</span>
                </div>
                <div>
                  <span>Jami narx </span>
                  <span>$ {order.order_total_amount}</span>
                </div>
                <div>
                  <span>{moment(order.createdAt).format("YY-DD-MM HH:MM")}</span>
                 
                  <Button
                   value={order._id}
                   onClick={finishOrderHandler}
                  className="order_complete"
                  >
                    Yakunlash
                    </Button>
                </div>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}