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

export const qrCheck = async (req, res) => {
  // TODO 임의로 유저 데이터 만듬
  const userId = 1;

  // console.log(req.body);
  const qrInfoData = req.body;

  // 검증코드 1 : 들어온 qr 코드에 해당하는 코스가 있는지
  const QUERY1 = 'SELECT * FROM course WHERE course_qr = ?';

  const course = await db.execute(QUERY1, [qrInfoData.qrCode])
    .then((result) => result[0][0]);

  if (!course) return res.status(400).json({ status: "not qrCode" });

  // 검증코드 2 : 해당 유저가 이 코스에 방문한 적이 있는지
  const QUERY2 = 'SELECT * FROM users_course WHERE user_id = ? AND course_id = ?';
  const userVisited = await db.execute(QUERY2, [userID, course.course_id])
    .then((result) => result[0][0]);

  if (userVisited) return res.status(400).json({ status: "visited" });

  // 검증코드 3 : (수학) 반경 100m 내에 있을 때만 qr 코드 찍을 수 있음
  calculateDistance(qrInfoData.latitude, qrInfoData.longitude, course.latitude, course.latitude);

  console.log("성공");
};

const calculateDistance = (currentLat, currentLon, targetLat, targetLon) => {
  // 문자를 실수로 바꾸는 parseFloat 함수
  currentLat = parseFloat(currentLat);
  currentLon = parseFloat(currentLon);
  targetLat = parseFloat(targetLat);
  targetLon = parseFloat(targetLon);

  // 111km. 위도 경도를 km로 바꾸기 위해서는 111000를 곱해주어야한다.
  const dLat = (targetLat - currentLat) * 111000;
  const dLon = (targetLon - currentLon) * 111000 * Math.cos(currentLat * (Math.PI / 180));

  return Math.sqrt(dLat * dLat + dLon * dLon);


}