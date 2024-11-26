import streamlit as st

# HTML과 JavaScript 코드
def generate_kakao_map_html(lat, lng):
    html_code = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Kakao Map</title>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=cf3a0088cdd7e5a988917a5d9d8f16c9"></script>
    </head>
    <body>
        <div id="map" style="width:100%;height:400px;"></div>
        <script>
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = {{
                    center: new kakao.maps.LatLng({lat}, {lng}), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                }};
            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({{
                position: new kakao.maps.LatLng({lat}, {lng}) // 마커가 표시될 위치
            }});
            marker.setMap(map); // 마커를 지도 위에 표시합니다
            
            // 2. 다각형 경로 정의
            var polygonPath = [
                new kakao.maps.LatLng(37.45046354524083, 126.90400568234863),
                new kakao.maps.LatLng(37.45018580297029, 126.90410845352996),
                new kakao.maps.LatLng(37.45018859055782, 126.90412251559253),
                new kakao.maps.LatLng(37.45018908998923, 126.9041250351491),
                new kakao.maps.LatLng(37.45019859817053, 126.90417299598701),
                new kakao.maps.LatLng(37.45021577056048, 126.90425960323883),
                new kakao.maps.LatLng(37.45019977048362, 126.90426506442884),
                new kakao.maps.LatLng(37.45019638185093, 126.90426622155454),
                new kakao.maps.LatLng(37.45019672276189, 126.90426771854403),
                new kakao.maps.LatLng(37.45019712788316, 126.90426950589553),
                new kakao.maps.LatLng(37.45018914976852, 126.9042709582765),
                new kakao.maps.LatLng(37.44988264633744, 126.90432672129454),
                new kakao.maps.LatLng(37.449868747695845, 126.90432925155675),
                new kakao.maps.LatLng(37.449826498629655, 126.90433693572396),
                new kakao.maps.LatLng(37.44975956568843, 126.90434911243122),
                new kakao.maps.LatLng(37.44961468033915, 126.9043754690532),
                new kakao.maps.LatLng(37.44944787407226, 126.90440581160675),
                new kakao.maps.LatLng(37.449403348499445, 126.90441391451549),
                new kakao.maps.LatLng(37.449373448572175, 126.9044193528927),
                new kakao.maps.LatLng(37.44925160773614, 126.90445278454649),
                new kakao.maps.LatLng(37.44919675782624, 126.90446783403807),
                new kakao.maps.LatLng(37.44884616681348, 126.90452762478132),
                new kakao.maps.LatLng(37.44848786331684, 126.90458873584124),
                new kakao.maps.LatLng(37.44828641886127, 126.90461161256675),
                new kakao.maps.LatLng(37.44830211809772, 126.90434614238916),
                new kakao.maps.LatLng(37.448325189587585, 126.90395604549775),
                new kakao.maps.LatLng(37.44834998625312, 126.90353675993225),
                new kakao.maps.LatLng(37.44835035082851, 126.90352005645055),
                new kakao.maps.LatLng(37.4483538744007, 126.90334818152856),
                new kakao.maps.LatLng(37.44839302741242, 126.90335659828061),
                new kakao.maps.LatLng(37.44867487028039, 126.90340216352091),
                new kakao.maps.LatLng(37.44870133196936, 126.90342174661306),
                new kakao.maps.LatLng(37.44878015283293, 126.90345967320667),
                new kakao.maps.LatLng(37.44886979302193, 126.90346181870761),
                new kakao.maps.LatLng(37.44888416392577, 126.90345404057076),
                new kakao.maps.LatLng(37.44904919017712, 126.90336472883946),
                new kakao.maps.LatLng(37.44905674831594, 126.90336424431537),
                new kakao.maps.LatLng(37.44905648663128, 126.90336268622272),
                new kakao.maps.LatLng(37.44904789205594, 126.90331402095809),
                new kakao.maps.LatLng(37.44906549940775, 126.90330737996442),
                new kakao.maps.LatLng(37.44907542527401, 126.90330350198069),
                new kakao.maps.LatLng(37.44929922106852, 126.90321603513435),
                new kakao.maps.LatLng(37.44945844803323, 126.90315352412141),
                new kakao.maps.LatLng(37.44951152816175, 126.90313626766854),
                new kakao.maps.LatLng(37.44960685306394, 126.90305217436439),
                new kakao.maps.LatLng(37.44971655081862, 126.90301031300476),
                new kakao.maps.LatLng(37.449715028688715, 126.90300775412773),
                new kakao.maps.LatLng(37.449730640774504, 126.90300493432673),
                new kakao.maps.LatLng(37.44976660262709, 126.90299844317141),
                new kakao.maps.LatLng(37.449812837748766, 126.90298978789872),
                new kakao.maps.LatLng(37.45028459810755, 126.90283197495674),
                new kakao.maps.LatLng(37.45035045734806, 126.90281279814289),
                new kakao.maps.LatLng(37.450502045372474, 126.90276865683973),
                new kakao.maps.LatLng(37.45051927068509, 126.90286022537002),
                new kakao.maps.LatLng(37.450673594938, 126.90278678827524),
                new kakao.maps.LatLng(37.450926478562565, 126.90273836590629),
                new kakao.maps.LatLng(37.45126628539363, 126.90267329812148),
                new kakao.maps.LatLng(37.45127272159599, 126.90270385011061),
                new kakao.maps.LatLng(37.45149166617719, 126.90362550152136),
                new kakao.maps.LatLng(37.451271396433626, 126.90370828968385),
                new kakao.maps.LatLng(37.45127106279379, 126.90370687742747),
                new kakao.maps.LatLng(37.45047462603432, 126.90400158250799),
                new kakao.maps.LatLng(37.45046354524083, 126.90400568234863)
            ];
            // 다각형 생성 및 지도에 표시
            var polygon = new kakao.maps.Polygon({{
                path: polygonPath,
                strokeWeight: 3,
                strokeColor: '#39DE2A',
                strokeOpacity: 0.8,
                fillColor: '#A2FF99',
                fillOpacity: 0.7
            }});
            polygon.setMap(map);

        </script>
    </body>
    </html>
    """
    return html_code

# Streamlit UI
st.title("📍 Kakao Map Integration with Streamlit")
default_latitude = "37.5665"
default_longitude = "126.9780"

# HTML 지도 생성 및 표시 (항상 표시)
st.components.v1.html(generate_kakao_map_html(default_latitude, default_longitude), height=450)