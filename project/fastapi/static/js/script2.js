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
    var drawerContent = document.getElementById("markerInfo");
    var closeDrawerButton = document.getElementById("closeDrawer");

    // 현재 열려 있는 마커의 정보를 저장할 변수
    let currentOpenMarker = null;

    // 여러 개의 마커를 표시할 좌표 배열
    var markerPositions = [
        { 
            position: new kakao.maps.LatLng(37.553905, 126.922566),
            name: "홍대",
            items: ['카페 A', '레스토랑 B', '펍 C'], //drawer에 들어갈 것
            description: "다양한 문화와 예술적 감각이 살아 있는 활기찬 거리",
            image: "/static/images/faker.png"
        },
        { 
            position: new kakao.maps.LatLng(37.562092, 126.922542),
            name: "연남동",
            items: ["책방 D", "갤러리 E", "디저트샵 F"],
            description: "소박한 분위기와 힐링이 가능한 자연 친화적인 공간이 특징인 지역",
            image: "/static/images/arin.png"
        },
        { 
            position: new kakao.maps.LatLng(37.548356, 126.912406),
            name: "합정",
            items: ["책방 G", "갤러리 H", "디저트샵 I"],
            description: "트렌디한 상점과 문화 공간이 가득한 젊고 활기찬 지역",
            image: "/static/images/arin.png"
        },
        { 
            position: new kakao.maps.LatLng(37.557511, 126.936873),
            name: "신촌",
            items: ["책방 J", "갤러리 K", "디저트샵 L"],
            description: "대학가의 활기와 다양한 청년 문화가 공존하는 에너지가 넘치는 동네",
            image: "/static/images/arin.png"
        },
        { 
            position: new kakao.maps.LatLng(37.557708, 126.944657),
            name: "이대",
            items: ["책방 M", "갤러리 N", "디저트샵 O"],
            description: "세련된 패션과 여성스러운 분위기가 돋보이는 패션 중심지",
            image: "/static/images/arin.png"
        },
        { 
            position: new kakao.maps.LatLng(37.556028, 126.907358),
            name: "망원",
            items: ["책방 P", "갤러리 Q", "디저트샵 R"],
            description: "한적하면서도 트렌디한 카페와 힙한 거리가 젊은 층에게 인기 있는 동네",
            image: "/static/images/arin.png"
        },
        { 
            position: new kakao.maps.LatLng(37.547127, 126.922107),
            name: "상수",
            items: ["책방 S", "갤러리 T", "디저트샵 U"],
            description: "세련된 분위기의 작은 갤러리와 힙한 카페로 유명한 곳",
            image: "/static/images/arin.png"
        },
        { 
            position: new kakao.maps.LatLng(37.568266, 126.930331),
            name: "연희동",
            items: ["책방 V", "갤러리 W", "디저트샵 X"],
            description: "고급스러운 분위기와 한적함이 어우러진 조용한 주거 지역",
            image: "/static/images/arin.png"
        }
    ];

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
                        <img src="${markerData.image}" alt="${markerData.name}" style="width:200px; height:auto; margin:5px 0;"><br>
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

            // 마커 클릭 이벤트 등록 (Drawer 열기)
            kakao.maps.event.addListener(marker, 'click', function () {
                console.log(`마커 클릭: ${markerData.name}`); // 디버깅용 로그

                // 동일한 마커를 클릭하면 Drawer를 닫음
                if (currentOpenMarker === marker) {
                    drawer.classList.remove("open"); // Drawer 닫기
                    currentOpenMarker = null; // 상태 초기화
                    return;
                }

                // 다른 마커를 클릭하면 Drawer 열기
                drawerContent.innerHTML = `선택한 장소: ${markerData.name}`;
                drawer.classList.add("open"); // Drawer 열기
                currentOpenMarker = marker; // 현재 열려 있는 마커로 설정

                // 리스트 데이터를 HTML로 생성
                let listHtml = `<h3>${markerData.name}</h3><ul>`;
                markerData.items.forEach(item => {
                    listHtml += `<li>${item}</li>`;
                });
                listHtml += `</ul>`;

                // Drawer에 리스트 데이터 삽입
                drawerContent.innerHTML = listHtml;

                // 지도 중심 이동 (약간 왼쪽으로 이동)
                var newCenter = new kakao.maps.LatLng(
                    markerData.position.getLat(), // 기존 위도 유지
                    markerData.position.getLng() + 0.01 // 경도를 약간 줄여 왼쪽으로 이동
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
        drawer.classList.remove("open"); // Drawer 닫기
        currentOpenMarker = null; // 상태 초기화
    });
};
