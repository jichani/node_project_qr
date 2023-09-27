const locationMap = document.getElementById("location-map");
let map;
let markers = [];
let isMapDrawn = false;
let userLatitude;
let userLongitude;

// TODO 추후 사라질 수 있음
let courseListInfo = [];



// console.log(locationMap);

// 지도 그리는 함수
const drawMap = (latitude, longitude) => {
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };
  map = new kakao.maps.Map(locationMap, options);
  // map.setZoomable(false);
};

// 마커를 초기화하는 함수 (유저 마커가 새로생길 때 기존 것을 지워버리기 위한 용도)
const deleteMarkers = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

// 유저 마커 그리기
const addUserMarker = () => {
  let marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(userLatitude, userLongitude),
  });
  markers.push(marker);
}

// 해당 위치로 지도를 이동한다.
const panTo = (latitude, longitude) => {
  map.panTo(new kakao.maps.LatLng(latitude, longitude));
}

// 코스 마커 그리기
const addCourseMarker = () => {
  let markerImage = "/file/map_not_done.png";
  let markerSize = new kakao.maps.Size(24, 36);

  const image = new kakao.maps.MarkerImage(markerImage, markerSize);

  const position1 = new kakao.maps.LatLng(35.79840347377205, 128.4930813305637);

  new kakao.maps.Marker({
    map: map,
    position: position1,
    title: "우리집",
    image: image,
  })
};

// 현재 위치 감시 함수 -> 내 위치 정보를 가져오는 허락이 있으면 위치정보가 갱신될때마다 계속 정보를 가지고 함수를 실행시켜준다.
const configurationLocationWatch = () => {
  if (navigator.geolocation) {
    // 위치가 이동될때마다 실행된다.
    navigator.geolocation.watchPosition((position) => {
      // 초기화. 마커들을 지워준다.
      deleteMarkers();

      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;

      if (!isMapDrawn) {
        drawMap(userLatitude, userLongitude);
        isMapDrawn = true;
      }

      // 유저 마커 그리기
      addUserMarker();
      panTo(userLatitude, userLongitude);
    })
  }
};

const makeNavigationHtml = () => {
  const courseWrap = document.getElementById("course-wrap");
  console.log(courseWrap);
  let html = "";

  for (let i = 0; i < courseListInfo.length; i++) {
    html += `<li class="course">`;
    if (courseListInfo[i].users_course_id) {
      html += `<div class="mark-wrap"><img src="/file/complete.png" /></div>`
    }
    html += ` <p>${courseListInfo[i].course_name}</p>`;
    html += `<li>`
  }

  html += `<li id="myPosition" class="course on">나의 위치</li>`
  console.log(html);
  courseWrap.innerHTML = html;
}

// 코스 정보 받아 온 다음에 할일
const afterGetCourseList = () => {
  makeNavigationHtml();
  configurationLocationWatch();
}

// 백엔드 서버로 코스 정보 요청
const getCourseListFetch = async () => {
  const response = await fetch("/api/courses");

  if (response.status === 200) {
    console.log("getCourseList api 연동 성공");

    const result = await response.json();
    courseListInfo = result;
    afterGetCourseList();

  } else {
    console.log("getCourseList api 연동 에러")
  }
};

getCourseListFetch();