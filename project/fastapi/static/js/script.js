window.onload = function () {
    // 지도 초기화
    var mapContainer = document.getElementById('map'); // 지도를 표시할 div
    var mapOption = {
        center: new kakao.maps.LatLng(37.558797, 126.926264), // 신촌 중심
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
    const videoSource = document.getElementById('videoSource');


    // 새 Drawer (사진 더보기용) 관련 요소 선택
    var photoDrawer = document.getElementById("photoDrawer");
    var backButton = document.getElementById("backButton");
    var closeDrawerButton_photo = document.getElementById("closeDrawer");
    var showMorePhotosButton = document.getElementById("showMorePhotos");
    // var carouselImages = document.getElementById("carouselImages");
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");

    // 이미지 컨테이너와 이미지들 가져오기
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');

    // 이미지와 간격에 맞는 너비 설정
    const imageCount = images.length;
    const gap = 10; // CSS에서 설정한 `gap` 값
    const imageWidth = images[0].clientWidth;

    carouselImages.style.width = `${imageCount * (imageWidth + gap) - gap}px`;


    var isMobile = window.innerWidth <= 768; // 화면이 768px 이하라면 모바일로 간주
    var offsetRatio = isMobile ? 0.0015 : 0.01; // 모바일에서는 더 큰 비율로 이동

    let markers = []; // 생성된 마커를 저장하는 배열
    

    // 현재 열려 있는 마커의 정보를 저장할 변수
    let currentOpenMarker = null;

    // 현재 열려 있는 다각형의 정보를 저장할 변수
    let currentOpenPolygon = null;

    // 현재 캐러셀이 열려 있는지 상태를 저장할 변수
    let isCarouselOpen = false;

    let selectedPolygonData = null;

    let currentIndex = 0; // 현재 활성화된 이미지 인덱스
    let totalWidth = 0; // 모든 이미지의 총 너비
    const carouselWidth = document.querySelector('.carousel').clientWidth;



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
                image: ["/static/images/홍대1.JPG"],
                keywords: ['예술적인','활기찬', '중심가'],
                video: "/static/video/홍대1.MOV",
                restaurants: [
                    { name: "반티엔야오 카오위 홍대점", type: "restaurant" },
                    { name: "홍대씨부엉", type: "restaurant" },
                    { name: "발코니가든", type: "cafe" },
                    { name: "모코모코", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">홍대</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.553905, 126.922566)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.553905, lng: 126.922566, title: "홍대" },
            ],

            
            strokeColor: '#9370DB', // 경계선 색
            fillColor: '#9370DB'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.554253, 126.911697),
                new kakao.maps.LatLng(37.555789, 126.915061),
                new kakao.maps.LatLng(37.558925, 126.912546),
                new kakao.maps.LatLng(37.560272, 126.916303),
                new kakao.maps.LatLng(37.557528, 126.918758),
                new kakao.maps.LatLng(37.555177, 126.921525),
                new kakao.maps.LatLng(37.549179, 126.913317)
            ],
            region: {
                name: "서교동",
                items: ['카페 A', '레스토랑 B', '펍 C'], //drawer에 들어갈 것
                description: "다양한 문화와 예술적 감각이 살아 있는 활기찬 거리",
                image: ["/static/images/서교1.jpg"],
                keywords: ['가로수가 많은','작업하기 좋은', '산책하기 좋은'],
                video: "/static/video/seogyo1.MOV",
                restaurants: [
                    { name: "서교동연탄집 ", type: "restaurant" },
                    { name: "20세기적일상", type: "restaurant" },
                    { name: "퀜치커피", type: "cafe" },
                    { name: "아벨롭", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">서교동</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.554086, 126.916464)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.554086, lng: 126.916464, title: "서교동" },
            ],
            strokeColor: '#90EE90', // 경계선 색
            fillColor: '#90EE90'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.557528, 126.918758),
                new kakao.maps.LatLng(37.560272, 126.916303),
                new kakao.maps.LatLng(37.561704, 126.918648),
                new kakao.maps.LatLng(37.567017, 126.917536),
                new kakao.maps.LatLng(37.567196, 126.918244),
                new kakao.maps.LatLng(37.566829, 126.919235),
                new kakao.maps.LatLng(37.565922, 126.923734),
                new kakao.maps.LatLng(37.565275, 126.925614),
                new kakao.maps.LatLng(37.563293, 126.928221),
                new kakao.maps.LatLng(37.563133, 126.928108),
                new kakao.maps.LatLng(37.561082, 126.926764),
                new kakao.maps.LatLng(37.558969, 126.926738),
                new kakao.maps.LatLng(37.555177, 126.921525)
            ],
            region: {
                name: "연남동",
                items: ["책방 D", "갤러리 E", "디저트샵 F"],
                description: "소박한 분위기와 힐링이 가능한 자연 친화적인 공간이 특징인 지역",
                image: ["/static/images/연남1.JPG", "/static/images/연남2.JPG", "/static/images/상수1.JPG"],
                keywords: ['감각적인','데이트하기 좋은', '미식이 발달'],
                video: "/static/video/yeonnam1.MOV",
                restaurants: [
                    { name: "오디", type: "restaurant" },
                    { name: "루바브", type: "restaurant" },
                    { name: "브라운하우스 연남", type: "cafe" },
                    { name: "브론시스", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">연남동</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.562092, 126.922542)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.562092, lng: 126.922542, title: "연남동" },
            ],
            strokeColor: '#FF7F50', // 경계선 색
            fillColor: '#FF7F50'   // 내부 채우기 색
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
                new kakao.maps.LatLng(37.548535, 126.909177),
                new kakao.maps.LatLng(37.552072, 126.904972),
                new kakao.maps.LatLng(37.554253, 126.911697)
            ],
            region: {
                name: "합정",
                items: ["책방 G", "갤러리 H", "디저트샵 I"],
                description: "트렌디한 상점과 문화 공간이 가득한 젊고 활기찬 지역",
                image: ["/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png", "/static/images/arin.png"],
                keywords: ['모임하기 좋은','교통의 요충지'],
                video: "/static/video/합정1.MOV",
                restaurants: [
                    { name: "익스첼 합정본점", type: "restaurant" },
                    { name: "해옫 합정", type: "restaurant" },
                    { name: "카페 메틀", type: "cafe" },
                    { name: "멧커피 홍대점", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">합정</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.548356, 126.912406)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.548356, lng: 126.912406, title: "합정" },
            ],
            strokeColor: '#4682B4', // 경계선 색
            fillColor: '#4682B4'   // 내부 채우기 색
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
                keywords: ['가성비 좋은','활기찬', '일식이 많은'],
                video: "/static/video/sinchon1.MOV",
                restaurants: [
                    { name: "치즈웨이브", type: "restaurant" },
                    { name: "댄싱홍콩 신촌점", type: "restaurant" },
                    { name: "신촌브루스", type: "cafe" },
                    { name: "파이홀", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">신촌</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.557511, 126.936873)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.557511, lng: 126.936873, title: "신촌" },
            ],
            strokeColor: '#FFA07A', // 경계선 색
            fillColor: '#FFA07A'   // 내부 채우기 색
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
                keywords: ['건강지향적인','디저트가 많은'],
                video: "/static/video/edae.MOV",
                restaurants: [
                    { name: "삼촌버거", type: "restaurant" },
                    { name: "대현매운족발 본점", type: "restaurant" },
                    { name: "그루밍커피", type: "cafe" },
                    { name: "리화인아이스크림와플", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">이대</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.557708, 126.944657)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.557708, lng: 126.944657, title: "이대" },
            ],
            strokeColor: '#FFC1CC', // 경계선 색
            fillColor: '#FFC1CC'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.554253, 126.911697),
                new kakao.maps.LatLng(37.555789, 126.915061),
                new kakao.maps.LatLng(37.558925, 126.912546),
                new kakao.maps.LatLng(37.558925, 126.912546),
                new kakao.maps.LatLng(37.556072, 126.898964),
                new kakao.maps.LatLng(37.552067, 126.904991)
            ],
            region: {
                name: "망원",
                items: ["책방 P", "갤러리 Q", "디저트샵 R"],
                description: "한적하면서도 트렌디한 카페와 힙한 거리가 젊은 층에게 인기 있는 동네",
                image: ["/static/images/망원1.JPG"],
                keywords: ['전통적이면서도 현대적인','아늑한', '여유로운'],
                video: "/static/video/mangwon2_market.MOV",
                restaurants: [
                    { name: "소금집델리 망원", type: "restaurant" },
                    { name: "따식 갈비파스타 망원", type: "restaurant" },
                    { name: "커피가게 동경", type: "cafe" },
                    { name: "티노마드", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">망원</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.556028, 126.907358)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.556028, lng: 126.907358, title: "망원" },
            ],
            strokeColor: '#DAA520', // 경계선 색
            fillColor: '#DAA520'   // 내부 채우기 색
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
                image: ["/static/images/상수1.JPG", "/static/images/상수2.JPG", "/static/images/상수3.JPG"],
                keywords: ['뷰가 좋은','차분한', '음악과 함께하는'],
                video: "/static/video/sangsoo1.MOV",
                restaurants: [
                    { name: "이응이응이응이응", type: "restaurant" },
                    { name: "신서울전 합정점", type: "restaurant" },
                    { name: "소화원", type: "cafe" },
                    { name: "베니케이크", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">상수</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.547127, 126.922107)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.547127, lng: 126.922107, title: "상수" },
            ],
            strokeColor: '#20B2AA', // 경계선 색
            fillColor: '#20B2AA'   // 내부 채우기 색
        },
        {
            path: [
                new kakao.maps.LatLng(37.565275, 126.925614),
                new kakao.maps.LatLng(37.563293, 126.928221),
                new kakao.maps.LatLng(37.572222, 126.935150),
                new kakao.maps.LatLng(37.573913, 126.935549),
                new kakao.maps.LatLng(37.572737, 126.933816),
                new kakao.maps.LatLng(37.569496, 126.931388),
                new kakao.maps.LatLng(37.570268, 126.930762),
                new kakao.maps.LatLng(37.569099, 126.928600),
                new kakao.maps.LatLng(37.568020, 126.929544)
            ],
            region: {
                name: "연희동",
                items: ["책방 V", "갤러리 W", "디저트샵 X"],
                description: "고급스러운 분위기와 한적함이 어우러진 조용한 주거 지역",
                image: ["/static/images/연희1.JPG", "/static/images/연희2.JPG"],
                keywords: ['조용한','한적한', '감성적인'],
                video: "/static/video/yeonhui1.MOV",
                restaurants: [
                    { name: "연희동 만석집", type: "restaurant" },
                    { name: "마우디", type: "restaurant" },
                    { name: "동경책방", type: "cafe" },
                    { name: "매뉴팩트커피 연희 본점", type: "cafe" }
                ],
                content: '<div class ="custom-overlay"><span class="left"></span><span class="center">연희동</span><span class="right"></span></div>',
                position: new kakao.maps.LatLng(37.568266, 126.930331)
            },
            markers: [ // 다각형과 관련된 마커 데이터
                { lat: 37.568266, lng: 126.930331, title: "연희동" },
            ],
            strokeColor: '#D3D3D3', // 경계선 색
            fillColor: '#D3D3D3'   // 내부 채우기 색
        }
    ];

    
    
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

        // 오버레이 생성
        var overlay = new kakao.maps.CustomOverlay({
            position: polygonData.region.position, // 다각형 중심 또는 원하는 위치
            content: polygonData.region.content,
            yAnchor: 1,
        });

        // 현재 다각형에 오버레이 표시
        overlay.setMap(map);

        // 다각형 hover 이벤트
        kakao.maps.event.addListener(polygon, 'mouseover', function () {
            polygon.setOptions({
                fillOpacity: 0.9
            });
        });
    
        // 지도에 추가
        polygon.setMap(map);
    
        // 다각형 클릭 이벤트
        kakao.maps.event.addListener(polygon, 'click', function () {
            if (currentOpenPolygon === polygon) {
                drawer.classList.remove("open");
                currentOpenPolygon = null;

                // 마커 숨기기
                // 안쓰면 주석처리 해버리기
                markers.forEach(marker => marker.setMap(null));
                markers = [];
                return;
            }

            drawerTitle.textContent = polygonData.region.name;
            drawerKeywords.innerHTML = polygonData.region.keywords
                .map(keyword => `<span class="tag">#${keyword}</span>`)
                .join("");
            drawerDescription.textContent = polygonData.region.description;
            drawerImage.src = polygonData.region.image[0];
            drawerVideo.src = polygonData.region.video;
            // 비디오 업데이트
            const videoUrl = polygonData.region.video;

            // 영상이 로컬 파일인지 확인하고 처리
            if (videoUrl) {
                // 로컬 비디오 파일인 경우 <video> 태그의 src에 로컬 영상 경로 설정
                videoSource.src = videoUrl;
                drawerVideo.load();  // 새로 로드
                drawerVideo.play();  // 영상 재생 시작
            } else {
                console.error('영상 경로가 제공되지 않았습니다.');
            }

            // 음식점 및 카페 버튼 생성
            const restaurantButtonsContainer = document.querySelector('.shop-buttons');
            restaurantButtonsContainer.innerHTML = ""; // 기존 버튼 제거

            if (polygonData.region.restaurants && polygonData.region.restaurants.length > 0) {
                polygonData.region.restaurants.forEach(restaurants => {
                    const button = document.createElement('button');
                    const classNames = `shop-btn ${restaurants.type}-btn`; // 올바른 변수명  
                    button.className = classNames
                    button.textContent = restaurants.name;
                    button.onclick = () => showToast(`가게 추천은 추가할 예정입니다.`);
                    restaurantButtonsContainer.appendChild(button);
                });
            } else {
                restaurantButtonsContainer.innerHTML = "<p>등록된 음식점 및 카페가 없습니다.</p>";
            }

            drawer.classList.add("open");
            photoDrawer.classList.remove("open");
            currentOpenPolygon = polygon;
            selectedPolygonData = polygonData;

             // 마커 생성
             // 안쓰면 주석처리 해버리기
            createMarkers(map, polygonData.markers); // polygonData에 연결된 markers 배열 사용
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

    // 마커 생성 함수
    function createMarkers(map, markerData) {
        // 이전 마커 제거
        markers.forEach(marker => marker.setMap(null));
        markers = [];

        // 새 마커 생성
        markerData.forEach(data => {
            const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(data.lat, data.lng),
                map: map,
                title: data.title
            });
            markers.push(marker);

            // 마커 클릭 이벤트 추가 (필요시)
            kakao.maps.event.addListener(marker, 'click', function () {
                alert(`마커 클릭: ${data.title}`);
            });
        });
    }

    // Drawer 닫기 버튼 이벤트
    closeDrawerButton.addEventListener("click", function () {
        drawer.classList.remove("open"); // Drawer 닫기
        drawerVideo.src = ""; // 동영상 정지
        currentOpenPolygon = null; // 상태 초기화
        // 마커 숨기기
        markers.forEach(marker => marker.setMap(null));
        markers = [];
    });
    // 토스트 메시지 함수
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = "toast show";
        setTimeout(() => {
            toast.className = "toast";
        }, 3000);
    }


   
   // 화면에 보이는 사진 개수 계산 함수
   function getVisiblePhotosCount() {
        const carouselContainerWidth = document.querySelector("#carousel").offsetWidth;
        const gap = 10; // 사진 간 간격

        // 각 사진의 평균 너비 계산
        const totalPhotos = carouselImages.children.length;
        const totalWidth = Array.from(carouselImages.children).reduce((sum, img) => sum + img.offsetWidth, 0);
        const averagePhotoWidth = totalWidth / totalPhotos || 100; // 평균 사진 너비 (기본값 100)

        return Math.max(1, Math.floor(carouselContainerWidth / (averagePhotoWidth + gap)));
    }

    // '사진 더보기' 버튼 클릭 시 캐러셀 열기
    showMorePhotosButton.addEventListener("click", function () {
        if (selectedPolygonData && selectedPolygonData.region.image.length > 0) {
            carouselImages.innerHTML = selectedPolygonData.region.image
                .map(image => `<img src="${image}" alt="Carousel Image">`)
                .join("");

            const images = document.querySelectorAll("#carouselImages img");
            images.forEach(img => {
                img.onload = () => {
                    updateTotalWidth(); // 이미지가 로드된 후 총 너비 계산
                    updateCarousel();  // 캐러셀 위치 업데이트
                };
            });

            // 캐러셀 초기화
            currentSlide = 0; // 초기화
            initializeCarousel();
            updateButtonState(); // 버튼 상태 초기화

            // Drawer 상태 전환
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
        const gap = 10; // 사진 간 간격

        // 현재까지 슬라이드된 이미지들의 너비 합 계산
        let offset = 0;
        for (let i = 0; i < currentSlide; i++) {
            offset += carouselImages.children[i].offsetWidth + gap;
        }

        // 이동 거리 설정
        carouselImages.style.transform = `translateX(-${offset}px)`;
    }

    // 이전 버튼 이벤트
    prevBtn.addEventListener("click", function () {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
        updateButtonState();
    });

    // 다음 버튼 이벤트
    nextBtn.addEventListener("click", function () {
        const totalPhotos = selectedPolygonData.region.image.length;
        const visiblePhotos = getVisiblePhotosCount();
        const maxSlideIndex = Math.max(0, totalPhotos - visiblePhotos);

        if (currentSlide < maxSlideIndex) {
            currentSlide++;
            updateCarousel();
        }
        updateButtonState();
    });

    // 버튼 상태 업데이트 함수
    function updateButtonState() {
        const totalPhotos = selectedPolygonData.region.image.length;
        const visiblePhotos = getVisiblePhotosCount();
        const maxSlideIndex = Math.max(0, totalPhotos - visiblePhotos);

        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= maxSlideIndex;
    }

    // 캐러셀 초기화 함수
    function initializeCarousel() {
        currentSlide = 0; // 초기화
        updateCarousel();
        updateButtonState();
    }

    // 화면 크기 변경 시 표시 사진 개수 및 상태 업데이트
    window.addEventListener("resize", function () {
        updateCarousel();
        updateButtonState();
    });

    // 모든 이미지의 총 너비를 동적으로 계산하는 함수
    function updateTotalWidth() {
        let totalWidth = 0;
        Array.from(carouselImages.children).forEach(image => {
            totalWidth += image.offsetWidth + 10; // 이미지 너비 + 간격
        });
        carouselImages.style.width = `${totalWidth}px`; // 계산된 총 너비 설정

        // 버튼 상태를 업데이트 (이미지 로드 후)
        updateButtonState();
    }

    // 팝업 띄우기
    // Select elements
    const galleryLink = document.getElementById('gallery-link');
    const popupClose = document.getElementById('popup-close');

    // Show popup when the gallery link is clicked
    galleryLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        popup.style.display = 'block';
    });

    // Hide popup when the close button is clicked
    window.addEventListener('click', (event) => {
        if (event.target === popup || event.target.id === 'popup-close') {
            popup.style.display = 'none';
        }
    });
};
