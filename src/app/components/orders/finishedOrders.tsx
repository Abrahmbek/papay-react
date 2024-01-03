import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
// REDUX
import {  useSelector} from "react-redux";
import {createSelector} from "reselect";
import { 
  retrieveFinishedOrders } from "../../screens/OrdersPage/selector.ts";
import { Order } from "../../../types/order.ts";
import { Product } from "../../../types/product.ts";
import { serverApi } from "../../../lib/config.ts";

   /** REDUX SELECTOR */
const finishedOrdersRetriever = createSelector (
  retrieveFinishedOrders ,
  (finishedOrders) =>({
    finishedOrders,
  })
);




export default function FinishedOrders(props: any) {
      /**INITIALIZATIONS */
     const { finishedOrders} = useSelector( finishedOrdersRetriever  );
  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(ele => ele._id === item.product_id)[0];
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} alt="" />
                      <p className={"titleDish"}>{product.product_name}</p>
                      <Box className={"priceBox"}>
                        <p>${item.item_price}</p>
                        <img
                          style={{ margin: "0 10px" }}
                          src={"/icons/close.svg"} alt=""
                        />
                        <p>{item.item_quantity}</p>
                        <img
                          style={{ margin: "0 10px" }}
                          src={"/icons/pause.svg"} alt=""
                        />
                        <p style={{ marginLeft: "15px" }}>${item.item_price * item.item_quantity}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box finished"}>
              <div>
                  <span>Maxsulot narxi </span>
                  <span>$ {order.order_total_amount - order.order_delivery_cost}</span>
                  <img
                    style={{ }}
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
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}