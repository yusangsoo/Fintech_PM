import streamlit as st
import os

# HTML과 JavaScript 코드
def generate_kakao_map_html(lat, lng):
    # 로컬 이미지 URL 생성 (Streamlit static 폴더 사용)

    
    html_code = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Kakao Map</title>
        <style>
            html, body {{ width: 100%; height: 100%; margin: 0; padding: 0; }}
            .map_wrap {{ position: relative; overflow: hidden; width: 100%; height: 400px; }}
            .custom_typecontrol {{
                position: absolute; top: 10px; right: 10px; z-index: 2;
                display: flex; justify-content: space-between; width: 130px; height: 30px;
                background: #ffffff; border-radius: 5px; border: 1px solid #919191;
                font-size: 12px; font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
            }}
            .custom_typecontrol span {{
                flex: 1; text-align: center; line-height: 30px; cursor: pointer;
            }}
            .custom_typecontrol .btn {{
                background: #fff; background: linear-gradient(#fff, #e6e6e6);
            }}
            .custom_typecontrol .btn:hover {{
                background: #f5f5f5; background: linear-gradient(#f5f5f5, #e3e3e3);
            }}
            .custom_typecontrol .selected_btn {{
                color: #fff; background: #425470; background: linear-gradient(#425470, #5b6d8a);
            }}
            .custom_zoomcontrol {{
                position: absolute; top: 50px; right: 10px; z-index: 2;
                display: flex; flex-direction: column; width: 36px; height: 80px;
                background-color: #f5f5f5; border-radius: 5px; border: 1px solid #919191;
            }}
            .custom_zoomcontrol span {{
                width: 36px; height: 40px; text-align: center; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
            }}
            .custom_zoomcontrol span img {{
                width: 15px; height: 15px;
            }}
            .custom_zoomcontrol span:first-child {{
                border-bottom: 1px solid #bfbfbf;
            }}
        </style>
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=cf3a0088cdd7e5a988917a5d9d8f16c9"></script>
    </head>
    <body>
        <div class="map_wrap">
            <!-- 지도 타입 변경 버튼 -->
            <div class="custom_typecontrol">
                <span id="btnRoadmap" class="selected_btn" onclick="setMapType('roadmap')">지도</span>
                <span id="btnSkyview" class="btn" onclick="setMapType('skyview')">스카이뷰</span>
            </div>
            <!-- 지도 확대/축소 버튼 -->
            <div class="custom_zoomcontrol">
                <span onclick="zoomIn()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png" alt="확대"></span>
                <span onclick="zoomOut()"><img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png" alt="축소"></span>
            </div>
            <!-- 지도 -->
            <div id="map" style="width:100%;height:400px;"></div>
        </div>
        <script>
            // Kakao 지도 생성
            var mapContainer = document.getElementById('map'); 
            var mapOption = {{
                center: new kakao.maps.LatLng({lat}, {lng}),
                level: 6
            }};
            var map = new kakao.maps.Map(mapContainer, mapOption);
            


            // 지도 타입 변경
            function setMapType(maptype) {{
                var roadmapControl = document.getElementById('btnRoadmap');
                var skyviewControl = document.getElementById('btnSkyview');
                if (maptype === 'roadmap') {{
                    map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
                    roadmapControl.className = 'selected_btn';
                    skyviewControl.className = 'btn';
                }} else {{
                    map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
                    skyviewControl.className = 'selected_btn';
                    roadmapControl.className = 'btn';
                }}
            }}

            // 지도 확대/축소
            function zoomIn() {{
                map.setLevel(map.getLevel() - 1);
            }}
            function zoomOut() {{
                map.setLevel(map.getLevel() + 1);
            }}
            
            
            
            
            // 여러 개의 마커를 표시할 좌표 배열
            var markerPositions = [
                new kakao.maps.LatLng(37.553905, 126.922566), // 홍대
                new kakao.maps.LatLng(37.562092, 126.922542), // 연남동
                new kakao.maps.LatLng(37.548356, 126.912406), // 합정
                new kakao.maps.LatLng(37.557511, 126.936873), // 신촌
                new kakao.maps.LatLng(37.557708, 126.944657), // 이대
                new kakao.maps.LatLng(37.556028, 126.907358), // 망원
                new kakao.maps.LatLng(37.547127, 126.922107), // 상수
                new kakao.maps.LatLng(37.568266, 126.930331)  // 연희동
            ];
            // 반복문을 통해 마커를 생성하고 지도에 표시
            for (var i = 0; i < markerPositions.length; i++) {{
                var marker = new kakao.maps.Marker({{
                    position: markerPositions[i], // 마커가 표시될 위치

                    clickable: true
                }});
                marker.setMap(map); // 생성된 마커를 지도 위에 표시
                
            }}
            

            // 전역 함수 등록
            window.setMapType = setMapType;
            window.zoomIn = zoomIn;
            window.zoomOut = zoomOut;
        </script>
    </body>
    </html>
    """
    return html_code

# Streamlit UI
st.title("📍 Kakao Map Integration with Streamlit")
default_latitude = 37.557894  # 위도
default_longitude = 126.924629  # 경도


# HTML 지도 생성 및 표시
st.components.v1.html(generate_kakao_map_html(default_latitude, default_longitude), height=450)
