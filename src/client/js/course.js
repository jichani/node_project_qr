const locationMap = document.getElementById("location-map");
let map;
let isMapDrawn = false;
let userLatitude;
let userLongitude;

// console.log(locationMap);

const drawMap = (latitude, longitude) => {
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 5,
  };
  map = new kakao.maps.Map(locationMap, options);
  // map.setZoomable(false);
};

const addCourseMarker = () => {
  let markerImage = "/file/map_not_done.png";
  let markerSize = new kakao.maps.Size(24, 36);

  const image = new kakao.maps.MarkerImage(markerImage, markerSize);

  const position1 = new kakao.maps.LatLng(35.79840347377205, 128.4930813305637);
  const position2 = new kakao.maps.LatLng(35.80213901470637, 128.49690514633008);

  new kakao.maps.Marker({
    map: map,
    position: position1,
    title: "우리집",
    image: image,
  })

  new kakao.maps.Marker({
    map: map,
    position: position2,
    title: "화원교회",
    image: image,
  })
};

const configurationLocationWatch = () => {
  if (navigator.geolocation) {
    // 위치가 이동될때마다 실행된다.
    navigator.geolocation.watchPosition((position) => {
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;

      if (!isMapDrawn) {
        drawMap(userLatitude, userLongitude);
        isMapDrawn = true;
      }
    })
  }
};




configurationLocationWatch();