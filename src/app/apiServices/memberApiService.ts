import { serverApi } from "../../lib/config.ts";
import axios from "axios";
import assert from "assert";
import {Definer} from "../../lib/Definer.ts";
import { Member } from "../../types/user.ts";


class MemberApiService {
      private readonly path: string;

      constructor() {
            this.path = serverApi;
      }
      public async loginRequest(login_data: any) {
            try{
           const result = await   axios.post(this.path + "/login", login_data, {withCredentials: true,
            } );
            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== 'fail', result?.data?.message);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
            }catch(err: any) {
                  console.log(`ERORR:::  LoginRequest ${err.message}`);
                  throw err;
            }
      }

      public async signupRequest(signup_data: any) {
            try{
           const result = await   axios.post(this.path + "/sign-up", signup_data, {withCredentials: true,
            } );
            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !=='fail', result?.data?.message);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
            }catch(err: any) {
                  console.log(`ERORR::: signupRequest ${err.message}`);
                  throw err;
            }
      }

      public async logOutRequest() {
            try{
           const result = await   axios.get(this.path + "/logout" ,{withCredentials: true,
            } );
            console.log("state:", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !=='fail', result?.data?.message);

            const logout_result = result.data.state;
            return logout_result === "success";
            }catch(err: any) {
                  console.log(`ERORR::: logOutRequest ${err.message}`);
                  throw err;
            }
      }
}


export default MemberApiService;