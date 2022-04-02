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
             position: new naver.maps.LatLng(item.latitude, item.longitude),
             map: map,
             icon: './img/pin_default.png'
         };

         // 잘 만들어지길래 따로 만들어지는 줄 알았더니 만들어지고 덮어씌워지는거였음 
         // 결국 마지막 정보만 마커에 저장됨 => 리스트로 관리해줘야한다.
         var marker = new naver.maps.Marker(markerOptions);
         markers.push(marker);
     }

     // 마커 리스너 생성
     for (marker of markers) {
         //  console.log(marker.title);
         naver.maps.Event.addListener(marker, 'click', function(event) {

             // 클릭한 지점을 중심으로 확대되야 해서 클릭한 부분의 좌표가 필요
             x = event.coord.x;
             y = event.coord.y;
             let title = event.overlay.title;

             //  console.log('마커타이틀 : ' + event.overlay.title);
             //  console.log('입력되는타이틀 : ' + title);

             //  마커 정보창 내용 변경
             var contentString = [
                 '<div class="m_box">',
                 `'<h3>${title}</h3>'`,
                 '</div>'
             ].join('');

             var infowindow = new naver.maps.InfoWindow({
                 content: contentString,
                 borderWidth: 0,
                 disableAnchor: true,
                 backgroundColor: 'transparent',
             });

             //  console.log(infowindow);

             map.setCenter(new naver.maps.LatLng(y, x));
             map.setZoom(map.zoom + 3); // ++는 안되서 +1로 변경 // +1씩은 너무 작은거같다..

             if (infowindow.getMap()) {
                 infowindow.close();
             } else {
                 infowindow.open(map, marker);
                 console.log('마커 : ' + marker.title);
             }
         });
         //  console.log(marker);
     }

 };