import assert from "assert";
import { serverApi } from "../../lib/config.ts";
import { Definer } from "../../lib/Definer.ts";
import { CartItem } from "../../types/others.ts";
import axios from "axios";



class OrderApiService {
      private readonly path: string;

      constructor() {
            this.path = serverApi;
      }
      public async createOrder(data: CartItem) {
            try{
                  const url = "orders/create",
           result = await   axios.post(this.path + url, data, {withCredentials: true,
            } );

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== 'fail', result?.data?.message);
            console.log("state:", result.data.state);

            const order: any = result.data.data;
            console.log("order::", order);
            return true;
            }catch(err: any) {
                  console.log(` CreateOrder, ERORR:::  ${err.message}`);
                  throw err;
            }
      }

}

      export default OrderApiService;