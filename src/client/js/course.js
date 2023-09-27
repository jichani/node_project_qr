const locationMap = document.getElementById("location-map");
let map;
let markers = [];
let isMapDrawn = false;
let userLatitude;
let userLongitude;

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
const panTo = (lat, long) => {
  map.panTo(new kakao.maps.LatLng(lat, long));
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

configurationLocationWatch();