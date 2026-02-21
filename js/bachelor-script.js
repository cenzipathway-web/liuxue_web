let hasPopped = false;
let canPlaySound = false;

// 监听交互解锁音频
document.addEventListener('click', () => {
    if (!canPlaySound) {
        const sound = document.getElementById('noticeSound');
        sound.play().then(() => {
            sound.pause();
            sound.currentTime = 0;
            canPlaySound = true;
        }).catch(() => {});
    }
}, { once: true });

// 滚动触发逻辑
window.onscroll = function() {
    if (!hasPopped && window.scrollY > 400) {
        showPopUp();
    }
};

function showPopUp() {
    const card = document.getElementById('contactCard');
    if (card && !hasPopped) {
        card.style.display = 'block';
        if (canPlaySound) document.getElementById('noticeSound').play();
        hasPopped = true;
    }
}

function toggleContact() {
    const card = document.getElementById('contactCard');
    card.style.display = (card.style.display === 'block') ? 'none' : 'block';
    hasPopped = true; // 用户点击后不再自动弹
}

function copyWeChat() {
    const id = "Elite_Undergrad_Apply";
    navigator.clipboard.writeText(id).then(() => {
        alert("微信号已复制！开启你的本科名校规划之旅。");
    });
}