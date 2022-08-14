import { API } from "aws-amplify";

export class Owner_API {
  /**
   * @description method to get data
   * @returns data
   */
  async getData() {
    try {
      const res = await API.get("baseurl", "/hello", {});
      return { kind: "ok", data: res.data };
    } catch (err) {
      return { kind: "bad-data", err: err };
    }
  }
}
