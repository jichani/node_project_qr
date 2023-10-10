let video = document.createElement("video");
let canvasElement = document.getElementById("canvas");
let canvas = canvasElement.getContext("2d");

const startScane = () => {
  // 줄 그리는 함수
  const drawLine = (begin, end, color) => {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWith = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }
  // 비디오 스트림에 qr코드 인식 적용
  const tick = () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      // CSS
      canvasElement.height = 400;
      canvasElement.width = 400;

      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      // 캔버스의 이미지 데이터를 가져와서 QR코드를 스캔한다.
      let imageDate = canvas.getImageData(
        0, 0, canvasElement.width, canvasElement.height
      )

      let code = jsQR(imageDate.data, imageDate.width, imageDate.height, {
        inversionAttempts: "dontInvert"
      })

      if (code) {
        drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF0000");
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF0000");
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF0000");
        drawLine(code.location.bottomLeftCorner, code.location.bottomRightCorner, "#FF0000");
      }
    }
    requestAnimationFrame(tick);
  }

  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      video.srcObject = stream;
      video.setAttribute("playsinline", true);
      video.play();
      requestAnimationFrame(tick);
    }).catch(function (err) {
      console.err(err);
    });
}





