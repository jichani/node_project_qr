import db from "../config/db";

export const getCourseList = async (req, res) => {
  // 로그인했는지 여부를 판단한다. 그래서 유저 id를 가져온다. 로그인 안했으면 null.
  const userId = req.user ? req.user.user_id : null;

  // 데이터베이스에서 코스 정보와 방문 정보를 가져온다.
  const QUERY = `
  SELECT c.*, uc.users_course_id
  FROM course c
  LEFT JOIN users_course uc
  ON c.course_id = uc.course_id AND uc.user_id = ?`
  // 데이터 베이스에 보내는 것 [userID]를 첫번째 ?에 집어넣는다. because, sql injection을 막기 위해서
  const courseList = await db.execute(QUERY, [userId]).then((result) => result[0]);

  res.json(courseList);
};