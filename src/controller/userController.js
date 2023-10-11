import bcrypt from "bcrypt";
import db from "../config/db";

export const join = async (request, response) => {
  const joinData = request.body;

  // id 중복인지 여부 체크 (duplicate id)
  const QUERY1 = 'SELECT * FROM users WHERE user_email=?';
  const user = await db.execute(QUERY1, [joinData.userId])
    .then((result) => result[0][0]);

  if (user) {
    return response.status(400).json({ status: "email 중복" });
  };

  // 비밀번호 암호화
  // 8번 최소, 12 좀 많은데? 높을수록 암호화가 높고, 시간이 많이 든다.
  const hashPassword = await bcrypt.hash(joinData.userPassword, 8);
  // console.log(hashPassword);

  const QUERY2 = `INSERT INTO users
      (user_email, user_password, user_name)
    VALUES
      (?, ?, ?)
    `

  db.execute(QUERY2, [joinData.userId, hashPassword, joinData.userName]);

  response.status(201).json({ status: "success" });
}