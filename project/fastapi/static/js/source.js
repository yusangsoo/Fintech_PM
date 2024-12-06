// Select popup container
const popup = document.getElementById('popup');
console.log(popup)

// Add popup content dynamically
popup.innerHTML = `
    <div class="popup-content">
        <span id="popup-close" class="popup-close">&times;</span>
        <h2>갤러리</h2>
        <div>
            <h3>홍대</h3>
            <ul>
                <li>1번째 사진: 직접 제공</li>
                <li>2번째 사진: 직접 제공</li>
                <li>3번째 사진: 00블로그에서 가져옴</li>
            </ul>
            <h3>합정</h3>
            <ul>
                <li>1번째 사진: 직접 제공</li>
                <li>2번째 사진: 00에서 가져옴</li>
            </ul>
            <h3>이대</h3>
            <ul>
                <li>1번째 사진: 직접 제공</li>
                <li>2번째 사진: 00에서 가져옴</li>
            </ul>
            <h3>신촌</h3>
            <ul>
                <li>1번째 사진: 직접 제공</li>
                <li>2번째 사진: 00에서 가져옴</li>
            </ul>
            <h3>연남</h3>
            <ul>
                <li>1번째 사진: 직접 제공</li>
                <li>2번째 사진: 00에서 가져옴</li>
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