import axios from "axios";
import assert from "assert";
import {serverApi} from "../../lib/config.ts";
import {Definer} from "../../lib/Definer.ts";
import { Restaurant } from "../../types/user.ts";
import { SearchObj } from "../../types/others.ts";

class RestaurantApiService {
      private readonly path: string;
      constructor() {
            this.path = serverApi;
      }

      async getTopRestaurants() {
            try{
           const url =`/restaurants/?order=top&page=1&limit=4`,
           result = await axios.get(this.path + url, {withCredentials: true});
           assert.ok(result, Definer.general_err1);
            
           console.log("state:", result.data.state);
           const top_restaurants: Restaurant[] = result.data.data;
           return top_restaurants;
            }catch(err: any) {
            console.log(`ERORR::: getTopRestaurants ${err.message}`);
            throw err;
            }
      }

      
      async getRestaurants(data: SearchObj) {
            try{
           const url =`/restaurants/?order=${data.order}&page=${data.page}&limit=${data.limit}`,
           result = await axios.get(this.path + url, {withCredentials: true});
           assert.ok(result, Definer.general_err1);
            
           console.log("state:", result.data.state);
           const restaurants: Restaurant[] = result.data.data;
           return restaurants;
            }catch(err: any) {
            console.log(`ERORR::: getRestaurants ${err.message}`);
            throw err;
            }
      }
}

export default RestaurantApiService;