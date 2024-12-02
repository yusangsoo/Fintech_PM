window.onload = function () {
    // 지도 초기화
    var mapContainer = document.getElementById('map'); // 지도를 표시할 div
    var mapOption = {
        center: new kakao.maps.LatLng(37.557511, 126.936873), // 신촌 중심
        level: 6, // 기본 확대 레벨
    };

    // 지도 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // Drawer 요소 선택
    var drawer = document.getElementById("drawer");
    var drawerTitle = document.getElementById("drawerTitle");
    var drawerKeywords = document.getElementById("drawerKeywords");
    var drawerDescription = document.getElementById("drawerDescription");
    var drawerImage = document.getElementById("drawerImage");
    var drawerVideo = document.getElementById("drawerVideo");
    var closeDrawerButton = document.getElementById("closeDrawer");

    // 새 Drawer (사진 더보기용) 관련 요소 선택
    var photoDrawer = document.getElementById("photoDrawer");
    var backButton = document.getElementById("backButton");
    var closeDrawerButton_photo = document.getElementById("closeDrawer");
    var showMorePhotosButton = document.getElementById("showMorePhotos");
    var carouselImages = document.getElementById("carouselImages");
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");

    var isMobile = window.innerWidth <= 768; // 화면이 768px 이하라면 모바일로 간주
    var offsetRatio = isMobile ? 0.0015 : 0.01; // 모바일에서는 더 큰 비율로 이동
    

    // 현재 열려 있는 마커의 정보를 저장할 변수
    let currentOpenMarker = null;

    // 현재 캐러셀이 열려 있는지 상태를 저장할 변수
    let isCarouselOpen = false;

    // 캐러셀 닫기 함수
    function closeCarousel() {
        photoDrawer.classList.remove("open"); // 캐러셀 닫기
        isCarouselOpen = false; // 캐러셀 상태 업데이트
    }

    var polygonsData = [
        {
            path: [
                new kakao.maps.LatLng(37.549179, 126.913317),
                new kakao.maps.LatLng(37.548856, 126.913907),
                new kakao.maps.LatLng(37.547918, 126.918379),
                new kakao.maps.LatLng(37.547846, 126.919924),
                new kakao.maps.LatLng(37.547844, 126.919916),
                new kakao.maps.LatLng(37.548288, 126.920157),
                new kakao.maps.LatLng(37.550565, 126.924183),
                new kakao.maps.LatLng(37.552823, 126.924244),
                new kakao.maps.LatLng(37.553283, 126.925469),
                new kakao.maps.LatLng(37.553240, 126.926585),
                new kakao.maps.LatLng(37.553631, 126.928409),
                new kakao.maps.LatLng(37.554601, 126.929975),
                new kakao.maps.LatLng(37.556913, 126.931649),
                new kakao.maps.LatLng(37.558629, 126.927028),
                new kakao.maps.LatLng(37.558969, 126.926738),
                new kakao.maps.LatLng(37.555177, 126.921525)
            ],
            region: {
                name: "홍대",
                items: ['카페 A', '레스토랑 B', '펍 C'], //drawer에 들어갈 것
                description: "다양한 문화와 예술적 감각이 살아 있는 활기찬 거리",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },

            
            strokeColor: '#FF0000', // 경계선 색
            fillColor: '#FF5733'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.554253, 126.911697),
                new kakao.maps.LatLng(37.557528, 126.918758),
                new kakao.maps.LatLng(37.555177, 126.921525),
                new kakao.maps.LatLng(37.549179, 126.913317)
            ],
            region: {
                name: "서교동",
                items: ['카페 A', '레스토랑 B', '펍 C'], //drawer에 들어갈 것
                description: "다양한 문화와 예술적 감각이 살아 있는 활기찬 거리",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/faker.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },
            strokeColor: '#0000FF', // 경계선 색
            fillColor: '#33FF57'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.557528, 126.918758),
                new kakao.maps.LatLng(37.560272, 126.916303),
                new kakao.maps.LatLng(37.563187, 126.921141),
                new kakao.maps.LatLng(37.566355, 126.918579),
                new kakao.maps.LatLng(37.566658, 126.919192),
                new kakao.maps.LatLng(37.565240, 126.925332),
                new kakao.maps.LatLng(37.563133, 126.928108),
                new kakao.maps.LatLng(37.561082, 126.926764),
                new kakao.maps.LatLng(37.558969, 126.926738),
                new kakao.maps.LatLng(37.555177, 126.921525)
            ],
            region: {
                name: "연남동",
                items: ["책방 D", "갤러리 E", "디저트샵 F"],
                description: "소박한 분위기와 힐링이 가능한 자연 친화적인 공간이 특징인 지역",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb', 'cc'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },
            strokeColor: '#0000FF', // 경계선 색
            fillColor: '#3357FF'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.549179, 126.913317),
                new kakao.maps.LatLng(37.548856, 126.913907),
                new kakao.maps.LatLng(37.547918, 126.918379),
                new kakao.maps.LatLng(37.547846, 126.919924),
                new kakao.maps.LatLng(37.545352, 126.918661),
                new kakao.maps.LatLng(37.545737, 126.911812),
                new kakao.maps.LatLng(37.548995, 126.912827),
                new kakao.maps.LatLng(37.548409, 126.910439),
                new kakao.maps.LatLng(37.551152, 126.907130),
                new kakao.maps.LatLng(37.552580, 126.906544),
                new kakao.maps.LatLng(37.554253, 126.911697)
            ],
            region: {
                name: "합정",
                items: ["책방 G", "갤러리 H", "디저트샵 I"],
                description: "트렌디한 상점과 문화 공간이 가득한 젊고 활기찬 지역",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },
            strokeColor: '#0000FF', // 경계선 색
            fillColor: '#FF33A8'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.556860, 126.931804),
                new kakao.maps.LatLng(37.555178, 126.936859),
                new kakao.maps.LatLng(37.556324, 126.940637),
                new kakao.maps.LatLng(37.559650, 126.940348),
                new kakao.maps.LatLng(37.559580, 126.934296)
            ],
            region: {
                name: "신촌",
                items: ["책방 J", "갤러리 K", "디저트샵 L"],
                description: "대학가의 활기와 다양한 청년 문화가 공존하는 에너지가 넘치는 동네",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },
            strokeColor: '#0000FF', // 경계선 색
            fillColor: '#A833FF'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.556324, 126.940637),
                new kakao.maps.LatLng(37.559650, 126.940348),
                new kakao.maps.LatLng(37.559805, 126.945582),
                new kakao.maps.LatLng(37.558713, 126.945735),
                new kakao.maps.LatLng(37.558774, 126.947972),
                new kakao.maps.LatLng(37.556986, 126.948985)
            ],
            region: {
                name: "이대",
                items: ["책방 M", "갤러리 N", "디저트샵 O"],
                description: "세련된 패션과 여성스러운 분위기가 돋보이는 패션 중심지",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },
            strokeColor: '#0000FF', // 경계선 색
            fillColor: '#33FFF5'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.552580, 126.906544),
                new kakao.maps.LatLng(37.554253, 126.911697),
                new kakao.maps.LatLng(37.555802, 126.915051),
                new kakao.maps.LatLng(37.558925, 126.912546),
                new kakao.maps.LatLng(37.557240, 126.904472),
                new kakao.maps.LatLng(37.554031, 126.905513),
                new kakao.maps.LatLng(37.553382, 126.906122)
            ],
            region: {
                name: "망원",
                items: ["책방 P", "갤러리 Q", "디저트샵 R"],
                description: "한적하면서도 트렌디한 카페와 힙한 거리가 젊은 층에게 인기 있는 동네",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },
            strokeColor: '#0000FF', // 경계선 색
            fillColor: '#FFD433'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.548288, 126.920157),
                new kakao.maps.LatLng(37.550565, 126.924183),
                new kakao.maps.LatLng(37.548915, 126.924081),
                new kakao.maps.LatLng(37.548600, 126.924832),
                new kakao.maps.LatLng(37.548692, 126.925975),
                new kakao.maps.LatLng(37.547654, 126.925957),
                new kakao.maps.LatLng(37.545738, 126.926671),
                new kakao.maps.LatLng(37.544937, 126.924055),
                new kakao.maps.LatLng(37.545352, 126.918661)
            ],
            region: {
                name: "상수",
                items: ["책방 S", "갤러리 T", "디저트샵 U"],
                description: "세련된 분위기의 작은 갤러리와 힙한 카페로 유명한 곳",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },
            strokeColor: '#0000FF', // 경계선 색
            fillColor: '#FF8C33'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.564631, 126.929217),
                new kakao.maps.LatLng(37.572222, 126.935150),
                new kakao.maps.LatLng(37.573913, 126.935549),
                new kakao.maps.LatLng(37.572737, 126.933816),
                new kakao.maps.LatLng(37.569496, 126.931388),
                new kakao.maps.LatLng(37.570268, 126.930762),
                new kakao.maps.LatLng(37.569099, 126.928600),
                new kakao.maps.LatLng(37.568020, 126.929544),
                new kakao.maps.LatLng(37.566111, 126.927105)
            ],
            region: {
                name: "연희동",
                items: ["책방 V", "갤러리 W", "디저트샵 X"],
                description: "고급스러운 분위기와 한적함이 어우러진 조용한 주거 지역",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['aa','bb'],
                video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
            },
            strokeColor: '#0000FF', // 경계선 색
            fillColor: '#8C33FF'   // 내부 채우기 색
        }
    ];

    // 현재 열려 있는 다각형의 정보를 저장할 변수
    let currentOpenPolygon = null;
    
    polygonsData.forEach(function(polygonData) {
        // 다각형 생성
        var polygon = new kakao.maps.Polygon({
            path: polygonData.path,
            strokeWeight: 3,
            strokeColor: polygonData.strokeColor, // 데이터에서 가져오기
            strokeOpacity: 0.8,
            fillColor: polygonData.fillColor,    // 데이터에서 가져오기
            fillOpacity: 0.7
        });
    
        // 지도에 추가
        polygon.setMap(map);
    
        // 다각형 클릭 이벤트
        kakao.maps.event.addListener(polygon, 'click', function () {
            if (currentOpenPolygon === polygon) {
                drawer.classList.remove("open");
                currentOpenPolygon = null;
                return;
            }

            drawerTitle.textContent = polygonData.region.name;
            drawerKeywords.innerHTML = polygonData.region.keywords
                .map(keyword => `<span class="tag">#${keyword}</span>`)
                .join("");
            drawerDescription.textContent = polygonData.region.description;
            drawerImage.src = polygonData.region.image[0];
            drawerVideo.src = polygonData.region.video;

            drawer.classList.add("open");
            currentOpenPolygon = polygon;
        });

        // 다각형 hover 이벤트
        kakao.maps.event.addListener(polygon, 'mouseover', function () {
            polygon.setOptions({
                fillOpacity: 0.9
            });
        });

        kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({
                fillOpacity: 0.7
            });
        });
    });

    // // 여러 개의 마커를 표시할 좌표 배열
    // var markerPositions = [
    //     { 
    //         position: new kakao.maps.LatLng(37.553905, 126.922566),
    //         name: "홍대",
    //         items: ['카페 A', '레스토랑 B', '펍 C'], //drawer에 들어갈 것
    //         description: "다양한 문화와 예술적 감각이 살아 있는 활기찬 거리",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     },
    //     { 
    //         position: new kakao.maps.LatLng(37.554086, 126.916464),
    //         name: "서교동",
    //         items: ['카페 A', '레스토랑 B', '펍 C'], //drawer에 들어갈 것
    //         description: "다양한 문화와 예술적 감각이 살아 있는 활기찬 거리",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/faker.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     },
    //     { 
    //         position: new kakao.maps.LatLng(37.562092, 126.922542),
    //         name: "연남동",
    //         items: ["책방 D", "갤러리 E", "디저트샵 F"],
    //         description: "소박한 분위기와 힐링이 가능한 자연 친화적인 공간이 특징인 지역",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb', 'cc'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     },
    //     { 
    //         position: new kakao.maps.LatLng(37.548356, 126.912406),
    //         name: "합정",
    //         items: ["책방 G", "갤러리 H", "디저트샵 I"],
    //         description: "트렌디한 상점과 문화 공간이 가득한 젊고 활기찬 지역",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     },
    //     { 
    //         position: new kakao.maps.LatLng(37.557511, 126.936873),
    //         name: "신촌",
    //         items: ["책방 J", "갤러리 K", "디저트샵 L"],
    //         description: "대학가의 활기와 다양한 청년 문화가 공존하는 에너지가 넘치는 동네",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     },
    //     { 
    //         position: new kakao.maps.LatLng(37.557708, 126.944657),
    //         name: "이대",
    //         items: ["책방 M", "갤러리 N", "디저트샵 O"],
    //         description: "세련된 패션과 여성스러운 분위기가 돋보이는 패션 중심지",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     },
    //     { 
    //         position: new kakao.maps.LatLng(37.556028, 126.907358),
    //         name: "망원",
    //         items: ["책방 P", "갤러리 Q", "디저트샵 R"],
    //         description: "한적하면서도 트렌디한 카페와 힙한 거리가 젊은 층에게 인기 있는 동네",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     },
    //     { 
    //         position: new kakao.maps.LatLng(37.547127, 126.922107),
    //         name: "상수",
    //         items: ["책방 S", "갤러리 T", "디저트샵 U"],
    //         description: "세련된 분위기의 작은 갤러리와 힙한 카페로 유명한 곳",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     },
    //     { 
    //         position: new kakao.maps.LatLng(37.568266, 126.930331),
    //         name: "연희동",
    //         items: ["책방 V", "갤러리 W", "디저트샵 X"],
    //         description: "고급스러운 분위기와 한적함이 어우러진 조용한 주거 지역",
    //         image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
    //         keywords: ['aa','bb'],
    //         video: "https://www.youtube.com/embed/iggsgJo6Df0?si=H_JL6eZ8ber5CxiK"
    //     }
    // ];


    // Drawer 열기 함수 (마커 데이터로 업데이트)
    function openDrawerWithMarkerData(markerData) {
        // 캐러셀이 열려 있으면 먼저 닫기
        if (isCarouselOpen) {
            closeCarousel();
        }
        

        // Drawer 데이터 업데이트
        drawerTitle.textContent = markerData.name; // 제목 업데이트
        drawerKeywords.innerHTML = markerData.keywords
            .map(keyword => `<span class="tag">#${keyword}</span>`)
            .join(""); // 키워드 동적 생성
        drawerDescription.textContent = markerData.description; // 설명 업데이트
        drawerImage.src = markerData.image[0]; // 첫 번째 이미지 설정
        drawerVideo.src = markerData.video; // 동영상 URL 업데이트

        drawer.classList.add("open"); // Drawer 열기
        currentOpenMarker = markerData; // 현재 열려 있는 마커 데이터 설정
    }

    // 반복문으로 마커 생성 및 이벤트 추가
    for (var i = 0; i < markerPositions.length; i++) {
        (function (markerData) {
            var marker = new kakao.maps.Marker({
                position: markerData.position, // 마커 좌표
                map: map, // 지도에 마커 추가
                clickable: true // 마커 클릭 가능 여부
            });

            // 인포윈도우 내용 설정
            var infowindow = new kakao.maps.InfoWindow({
                content: `
                    <div style="padding:10px; font-size:12px; text-align:center;">
                        <strong>${markerData.name}</strong><br>
                        <p style="margin:5px 0;">${markerData.description}</p>
                        <img src="${markerData.image[0]}" alt="${markerData.name}" style="width:200px; height:auto; margin:5px 0;"><br>
                    </div>
                `, // HTML 문자열로 설정
                removable: false // 닫기 버튼 없음
            });

            // 마커 hover (mouseover) 이벤트 등록 (인포윈도우 열기)
            kakao.maps.event.addListener(marker, 'mouseover', function () {
                infowindow.open(map, marker);
            });

            // 마커 hover (mouseout) 이벤트 등록 (인포윈도우 닫기)
            kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
            });


            // 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, 'click', function () {
                // 동일한 마커 클릭 시 Drawer 닫기
                if (currentOpenMarker === marker) {
                    drawer.classList.remove("open");
                    currentOpenMarker = null;
                    return;
                }

                // 새로운 마커 클릭 시 Drawer 열기
                openDrawerWithMarkerData(markerData);
            
                
                // // 다른 마커를 클릭하면 Drawer 열기
                // drawer.classList.add("open"); // Drawer 열기
                // currentOpenMarker = marker; // 현재 열려 있는 마커로 설정
                selectedMarkerData = markerData; // 선택된 마커 데이터 설정


                var newCenter = new kakao.maps.LatLng(
                    markerData.position.getLat(), // 기존 위도 유지
                    markerData.position.getLng() + offsetRatio // 경도 이동
                );
                
                map.setCenter(newCenter);

                // 지도 확대
                setTimeout(function () {
                    map.setLevel(4); // 레벨 4로 확대
                }, 100); // 100ms 지연 후 확대 (타이밍 문제 해결)
            });
        })(markerPositions[i]);
    }

    // Drawer 닫기 버튼 이벤트
    closeDrawerButton.addEventListener("click", function () {
        console.log(document.getElementById("closeDrawer")); // null이면 문제가 있음
        console.log(drawer); // drawer 확인
        drawer.classList.remove("open"); // Drawer 닫기
        currentOpenPolygon = null; // 상태 초기화
        drawerVideo.src = ""; // 동영상 정지
    });


   // 화면 너비에 따라 한 번에 표시할 사진 개수를 계산하는 함수
    function getVisiblePhotosCount() {
        const carouselWidth = document.getElementById("carouselImages").offsetWidth; // 캐러셀 너비
        const photoWidth = document.querySelector("#carouselImages img").offsetWidth || 100; // 각 사진의 실제 너비
        const visiblePhotos = Math.floor(carouselWidth / photoWidth); // 표시 가능한 사진 개수
        return visiblePhotos > 0 ? visiblePhotos : 1; // 최소 1개는 보이도록 설정
    }

    // '사진 더보기' 버튼 클릭 시 캐러셀 열기
    showMorePhotosButton.addEventListener("click", function () {
        if (selectedMarkerData && selectedMarkerData.image && Array.isArray(selectedMarkerData.image)) {
            carouselImages.innerHTML = selectedMarkerData.image
                .map(image => `<img src="${image}" alt="Carousel Image">`)
                .join("");

            currentSlide = 0;
            updateCarousel();
            // 새로운 마커 클릭 시 캐러셀 초기화
            initializeCarousel();
            drawer.classList.remove("open");
            photoDrawer.classList.add("open");
            isCarouselOpen = true; // 캐러셀 상태 업데이트
        } else {
            alert("이미지가 없습니다!");
        }
    });

    // '뒤로 가기' 버튼 클릭 시 기존 Drawer로 돌아가기
    backButton.addEventListener("click", function () {
        photoDrawer.classList.remove("open");
        drawer.classList.add("open");
        isCarouselOpen = false; // 캐러셀 상태 업데이트
    });

    // 캐러셀 업데이트 함수
    function updateCarousel() {
        const photoWidth = document.querySelector("#carouselImages img").offsetWidth || 100; // 각 사진의 실제 너비
        const offset = -currentSlide * photoWidth; // 한 슬라이드씩 이동
        carouselImages.style.transform = `translateX(${offset}px)`;
    }

    // 캐러셀 이전 버튼
    prevBtn.addEventListener("click", function () {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();


            // 첫 번째 이미지에 도달하면 Prev 버튼 비활성화
            if (currentSlide === 0) {
                prevBtn.disabled = true; // 버튼 비활성화
            }
        }

        // 다음 버튼 활성화 (마지막 슬라이드가 아닐 경우)
        const totalPhotos = selectedMarkerData.image.length;
        const visiblePhotos = getVisiblePhotosCount();
        const maxSlideIndex = totalPhotos - visiblePhotos;

        if (currentSlide < maxSlideIndex) {
            nextBtn.disabled = false;
        }
    });


    // 캐러셀 다음 버튼
    nextBtn.addEventListener("click", function () {
        const totalPhotos = selectedMarkerData.image.length; // 총 사진 개수
        const visiblePhotos = getVisiblePhotosCount(); // 현재 화면에서 표시할 사진 개수
        const maxSlideIndex = totalPhotos - visiblePhotos; // 마지막 슬라이드의 시작 인덱스
        
        if (currentSlide < maxSlideIndex) {
            currentSlide++;
            updateCarousel();

            // 마지막 이미지에 도달하면 Next 버튼 비활성화
            if (currentSlide >= maxSlideIndex) {
                nextBtn.disabled = true; // 버튼 비활성화
            }
        }
        
        // 이전 버튼 활성화 (첫 번째 이미지가 아닐 경우)
        if (currentSlide > 0) {
            prevBtn.disabled = false; // Prev 버튼 활성화
        }
    });

    // 캐러셀 초기화 함수
    function initializeCarousel() {
        currentSlide = 0; // 초기 슬라이드 설정
        updateCarousel();

        // 초기 버튼 상태 설정
        prevBtn.disabled = true; // 이전 버튼 비활성화
        nextBtn.disabled = false;
        const visiblePhotos = getVisiblePhotosCount();
        const totalPhotos = selectedMarkerData.image.length;
        nextBtn.disabled = totalPhotos <= visiblePhotos; // 전체 사진이 화면에 표시되면 Next 버튼 비활성화
    }

    // 화면 크기 변경 시 표시 사진 개수 업데이트
    window.addEventListener("resize", function () {
        const totalPhotos = selectedMarkerData.image.length;
        const visiblePhotos = getVisiblePhotosCount();
        const maxSlideIndex = totalPhotos - visiblePhotos;

        // 캐러셀 상태 업데이트
        updateCarousel();

        // 버튼 상태 업데이트
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= maxSlideIndex;
    });
};
