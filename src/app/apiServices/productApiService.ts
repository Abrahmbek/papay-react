import { serverApi } from "../../lib/config.ts";
import axios from "axios";
import assert from "assert";
import {Definer} from "../../lib/Definer.ts";
import { ProductSearchObj } from "../../types/others.ts";
import { Product } from "../../types/product.ts";


class ProductApiService {
      private readonly path: string;

      constructor() {
            this.path = serverApi;
      }

      async getTargetProducts(data: ProductSearchObj ) {
            try{
             const url = '/products',
             result = await axios.post(this.path + url, data, {
                  withCredentials: true,
             });
             assert.ok(result, Definer.general_err1);

             console.log("state:", result.data.state);
             const products:Product[] = result.data.data;
             return products;
            }catch (err: any) {
              console.log(`ERORR::: getTargetRestaurants ${err.message}`);
            throw err;
            }
      }

      async getChosenDish(dish_id: string ) {
            try{
             const url = `/products/${dish_id}`,
             result = await axios.get(this.path + url,  {
                  withCredentials: true,
             });
             assert.ok(result, Definer.general_err1);

             console.log("state:", result.data.state);
             const product:Product = result.data.data;
             return product;
            }catch (err: any) {
              console.log(`ERORR::: getChosenDish ${err.message}`);
            throw err;
            }
      }
}

export default ProductApiService;