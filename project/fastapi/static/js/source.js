// Select popup container
const popup = document.getElementById('popup');
console.log(popup)

// Add popup content dynamically
popup.innerHTML = `
    <div class="popup-content">
        <span id="popup-close" class="popup-close">&times;</span>
        <h2>갤러리</h2>
        <div>
            <h3>망원</h3>
            <ul>
                <li>1번째 사진: 직접 제공</li>
                <li>2번째 사진: https://korean.visitseoul.net/comm/getImage?srvcId=POST&parentSn=37950&fileTy=POSTTHUMB&fileNo=1</li>
                <li>3번째 사진: https://lh3.googleusercontent.com/proxy/On5rTREgczlXwlx5LkK4Vzn23oYqfm2d5rwnpUsXM1m84d3VKUGnT3oiZFtPjci5HubWsCb7XX_nnOFA5_A1OAECzXQZ8fbjBeJsC6Zvb-weM6np8p_sTxt2IPA4ajgYURtxcMJ38596WehBxgt9kbdc6OyKitUxm_s7znezccaiLTmvblXsAUWB3fOmSBs</li>
            </ul>
            <h3>상수</h3>
            <ul>
                <li>1 ~ 3번째 사진: 직접 제공</li>
                <li>4번째 사진: https://street-h.com/wp-content/uploads/2013/06/%EC%A0%9C%EB%B9%84%EB%8B%A4%EB%B0%A9_120509_10.jpg</li>
            </ul>
            <h3>서교동</h3>
            <ul>
                <li>1번째 사진: 직접 제공</li>
                <li>2번째 사진: https://magazine.brique.co/wp-content/uploads/2024/08/04-1F-%EC%B6%9C%EC%9E%85%EA%B5%AC-%EC%A0%84%EA%B2%BD-02-905x627.jpg</li>
                <li>3번째 사진: https://dtd31o1ybbmk8.cloudfront.net/photos/44056e67bb70d7f0448b01c8af7ae40f/thumb.jpg</li>
            </ul>
            <h3>신촌</h3>
            <ul>
                <li>1번째 사진: https://img.hankyung.com/photo/202306/01.33730769.1.jpg</li>
                <li>2번째 사진: https://data.si.re.kr/sites/default/files/photos6/06N02007Db60000.jpg</li>
                <li>3번째 사진: https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/5v3D/image/Omz9EJwdiCvrUVapr_NgO3-euVg.jpg</li>
            </ul>
            <h3>연남</h3>
            <ul>
                <li>1 ~ 2번째 사진: 직접 제공</li>
                <li>3번째 사진: https://cdn.thescoop.co.kr/news/photo/201909/36658_48383_542.jpg</li>
                <li>4번째 사진: https://i0.wp.com/owlmagazine.co.kr/wp-content/uploads/2024/02/%EC%84%9C%EC%9A%B8-%EC%97%B0%EB%82%A8%EB%8F%99-%EA%B0%80%EC%9D%84-%ED%92%8D%EA%B2%BD_9470.jpeg?resize=1280%2C960&ssl=1</li>
            </ul>
            <h3>연희</h3>
            <ul>
                <li>1 ~ 2번째 사진: 직접 제공</li>
                <li>3번째 사진: https://the-edit.co.kr/wp-content/uploads/2024/10/DSC09477.jpg</li>
                <li>4번째 사진: https://mblogthumb-phinf.pstatic.net/MjAyNDAzMjVfMTIx/MDAxNzExMzQ0NzEyNTAy.U8yTIK2yzCmPX72qtXeU7n7RS1TLSIUwO_BFle0ujQ0g.RgiiumX-5MQmi9JsoHRSaWM8AiTMAVsl3SoiX-1fFqog.JPEG/134451250665f3a5885688f.jpg?type=w800</li>
            </ul>
            <h3>이대</h3>
            <ul>
                <li>1번째 사진: https://data.si.re.kr/photos/files/img/06/06N03207Dd50000.jpg</li>
                <li>2번째 사진: https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/jo/2019/07/05/9e9e937b-556a-4dd8-8c5e-be5ae927e538.jpg</li>
                <li>3번째 사진: https://img.khan.co.kr/news/2020/11/10/2020111001001111700095281.jpg</li>
            </ul>
            <h3>합정</h3>
            <ul>
                <li>1번째 사진: https://cdn.hankyung.com/photo/202312/01.35301499.1.jpg</li>
                <li>2번째 사진: https://mediahub.seoul.go.kr/uploads/mediahub/2022/09/qpRZFkSFuPgAfEfqVaXpBoxSeFnJdfSI.jpg</li>
                <li>3번째 사진: https://mblogthumb-phinf.pstatic.net/MjAyMzA2MDJfMjc3/MDAxNjg1Njg4NTM1NzM1.msPEXG9NKAy3lh1qURl5utwLhbMxNRSJQF0HfO-_O34g.7P0dh9S8hZfxiosxC4pG_8GEo71Ge_fwBiDvnCq9efcg.JPEG.nicenet/%ED%95%A9%EB%A7%88%EB%A5%B4%EB%9C%A820.jpg?type=w800</li>
            </ul>
            <h3>홍대</h3>
            <ul>
                <li>1번째 사진: 직접 제공</li>
                <li>2번째 사진: https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5KoQ/image/HTAocHq3_nmh1wRZQ-JTi7MfOGk</li>
                <li>3번째 사진: https://mediahub.seoul.go.kr/uploads/mediahub/2024/09/nspqgfwzOVrPWzKnDsVxCxFmYEuBAnUT.jpg</li>
            </ul>
        </div>
    </div>
`;


// Add close functionality
const closeBtn = document.getElementById('popup-close');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none'; // 팝업 닫기
    });
}