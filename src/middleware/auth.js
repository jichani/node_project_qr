import jwt from "jsonwebtoken";
import db from "../config/db";

export const isAuth = async (request, response, next) => {
  // 헤더의 key 값의 Authorization value를 가져온다.
  // { Authorization : "Bearer accessToken값" };
  const authHeader = request.get("Authorization");

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // 인증이 필요한데 인증안함(401)
    return response.status(401).json({ status: "인증 실패" });
  }
  // 정상적으로 응답이 온 경우 
  // ["Bearer", "accessToken값"];
  //     0            1
  const token = authHeader.split(" ")[1];
  // console.log(token);

  // jwt 토큰 풀기
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    async (error, decoded) => {
      if (error) {
        return response.status(401).json({ status: "인증 실패" });
      }

      // console.log(decoded);
      const id = decoded.id;
      // console.log(id); // 3

      const QUERY = `SELECT * FROM users WHERE user_id = ?`;

      const user = await db.execute(QUERY, [id]).then((result) => result[0][0])

      if (!user) {
        return response.status(401).json({ status: "인증 실패" });
      }
      request.user = user;
      next();
    }
  )
}