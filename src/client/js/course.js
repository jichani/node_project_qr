const locationMap = document.getElementById("location-map");
let map;
let markers = [];
let isMapDrawn = false;
let userLatitude;
let userLongitude;

// console.log(locationMap);

const drawMap = (latitude, longitude) => {
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };
  map = new kakao.maps.Map(locationMap, options);
  // map.setZoomable(false);
};

const deleteMarkers = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

const addUserMarker = () => {
  let marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(userLatitude, userLongitude),
  });
  markers.push(marker);
}

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
    })
  }
};


configurationLocationWatch();