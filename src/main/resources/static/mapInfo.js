var cityhall = new naver.maps.LatLng(37.5666805, 126.9784147);

var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.5698411, 126.9783927),
    zoom: 10
});

var contentString = [
    '<div class = "m_box">',
    '   <h3>서울특별시청</h3>',
    '   <p>서울특별시 중구 태평로1가 31 <br>',
    '       <a href="http://www.seoul.go.kr" target="_blank">상세보기</a>',
    '   </p>',
    '</div>'
].join('');

var marker = new naver.maps.Marker({
    id: 'id_test',
    test : "test",
    title : "title_test",
    addr: "aadr_test",
    map: map,
    position: cityhall

});

var infowindow = new naver.maps.InfoWindow({
    content: contentString,
    borderWidth: 0,
    disableAnchor: true,
    backgroundColor: 'transparent',

});

naver.maps.Event.addListener(marker, "click", function(e) {
    if (infowindow.getMap()) {
        infowindow.close();
    } else {
        infowindow.open(map, marker);
    }
});