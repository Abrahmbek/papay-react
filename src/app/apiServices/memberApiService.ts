import { serverApi } from "../../lib/config.ts";
import axios from "axios";
import assert from "assert";
import {Definer} from "../../lib/Definer.ts";
import { Member } from "../../types/user.ts";
import { MemberLiken } from "../../types/others.ts";


class MemberApiService {
      private readonly path: string;

      constructor() {
            this.path = serverApi;
      }
      public async loginRequest(login_data: any): Promise<Member> {
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

      public async signupRequest(signup_data: any): Promise<Member> {
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

      public async logOutRequest(): Promise<Boolean> {
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

      public async memberLikeTarget(data: any): Promise<MemberLiken> {
            try{
                  const url = "/member-liken",
            result = await   axios.post(this.path + url, data, {withCredentials: true,
            } );
            
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !=='fail', result?.data?.message);
            
            console.log("state:", result.data.state);
            const like_result: MemberLiken = result.data.data;
            return like_result;
            }catch(err: any) {
                  console.log(`ERORR::: memberLikeTarget${err.message}`);
                  throw err;
            }
      }

      public async getChosenMember(id: string) {
            try{
                  const url = `/member/${id}`,
            result = await   axios.post(this.path + url, {withCredentials: true,
            } );
            
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !=='fail', result?.data?.message);
            
            console.log("state:", result.data.state);
            const member: Member = result.data.data;
            console.log("kelyaptimi.....");
            return member;
            }catch(err: any) {
                  console.log(`ERORR::: memberLikeTarget${err.message}`);
                  throw err;
            }
      }
}


export default MemberApiService;