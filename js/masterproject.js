let autoPopupTimer;
let userHasClosedManually = false;
let canPlaySound = false;

// 激活声音权限
document.addEventListener('click', function() {
    if (!canPlaySound) {
        const sound = document.getElementById('noticeSound');
        sound.play().then(() => {
            sound.pause();
            sound.currentTime = 0;
            canPlaySound = true;
        }).catch(e => {});
    }
}, { once: true });

function toggleContact() {
    const card = document.getElementById('contactCard');
    if (card.style.display === 'block') {
        card.style.display = 'none';
        userHasClosedManually = true;
        clearInterval(autoPopupTimer);
    } else {
        card.style.display = 'block';
        playSound();
    }
}

function playSound() {
    const sound = document.getElementById('noticeSound');
    if (sound && canPlaySound) {
        sound.play();
    }
}

function autoOpenContact() {
    const card = document.getElementById('contactCard');
    if (!userHasClosedManually && card.style.display !== 'block') {
        card.style.display = 'block';
        playSound();
    }
}

function copyWeChat() {
    const id = "StudyGlobal_Master";
    navigator.clipboard.writeText(id).then(() => {
        alert("微信号已复制，请前往微信添加老师！");
    });
}

// 设定30秒后自动弹出
window.onload = () => {
    autoPopupTimer = setInterval(autoOpenContact, 30000);
};