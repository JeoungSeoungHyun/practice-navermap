 // 좌표 로딩 함수

 //  let points;

 let list;

 let x, y;

 let loading = async() => {
     let response = await fetch("/loading");

     let responseParse = await response.json();

     //  points = responseParse;
     list = responseParse;

     //  console.log(list);

     makeMap();
 };
 loading();

 // 지도 생성

 var position = new naver.maps.LatLng(37.747381503046, 127.630154310527);

 var map = new naver.maps.Map('map', {
     center: position,
     zoom: 10
 });

 // 지도 리스너 생성
 naver.maps.Event.addListener(map, 'click', function(event) {

     console.log(event);

     x = event.coord.x;
     y = event.coord.y;

     map.setCenter(new naver.maps.LatLng(y, x));
     map.setZoom(map.zoom + 3);

 });

 // 마커 생성 함수
 let markers = [];

 let makeMap = () => {

     // 좌표값으로 마커 생성
     for (item of list) {

         var markerOptions = {
             title: item.title,
             addr: item.address,
             position: new naver.maps.LatLng(item.latitude, item.longitude),
             map: map,
             icon: './img/pin_default.png'
         };

         // 잘 만들어지는데 마지막 marker가 계속 호출?
         // 결국 마지막 정보만 마커에 저장됨 => 리스트로 관리해줘야한다.
         var marker = new naver.maps.Marker(markerOptions);
         markers.push(marker);
     }


     // 마커 리스너 생성
     for (marker of markers) {
         naver.maps.Event.addListener(marker, 'click', function(event) {



             // 클릭한 지점을 중심으로 확대되야 해서 클릭한 부분의 좌표가 필요
             x = event.coord.x;
             y = event.coord.y;
             let title = event.overlay.title;
             let addr = event.overlay.addr;

             //  console.log('마커타이틀 : ' + event.overlay.title);
             //  console.log('입력되는타이틀 : ' + title);

             //  마커 정보창 내용 변경
             var contentString = [
                 '<div class="m_box">',
                 '<div class="inner_box">',
                 `<p style="flex: 1;">${title}</p>`,
                 '<button type="button" onclick="closeInfo(infowindow)" >X</button>',
                 '</div>',
                 '<img class="img_fit" src="/dog.png">',
                 `<p>${addr}</p>`,
                 '<a href="javascript:;">상세보기</a>',
                 '</div>'
             ].join('');

             var infowindow = new naver.maps.InfoWindow({
                 content: contentString,
                 borderWidth: 0,
                 disableAnchor: true,
                 backgroundColor: 'transparent',
                 pixelOffset: new naver.maps.Point(200, -40)
             });

             //  console.log(infowindow);

             map.setCenter(new naver.maps.LatLng(y, x));
             map.setZoom(map.zoom + 3); // ++는 안되서 +1로 변경 // +1씩은 너무 작은거같다..

             if (map.zoom > 15) {

                 // 일단은 해결인데 왜 이렇게 안하면 마지막 marker로 항상 고정이 될까..?
                 for (marker of markers) {
                     if (marker.title == title) {
                         console.log("여기들오옴");
                         console.log(infowindow);
                         if (infowindow.getMap()) {
                             console.log("여기들오옴2");
                             infowindow.close();
                         } else {
                             console.log("여기들오옴3");
                             infowindow.open(map, marker);
                         }
                     }
                 }
             }
         });
         //  console.log(marker);
     }

 };

 let closeInfo = (infowindow) => {
     console.log("하이");
     infowindow.close();
 };