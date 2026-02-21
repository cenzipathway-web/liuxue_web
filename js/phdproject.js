// 定义状态
let hasPopped = false;

// 监听滚动条，当用户向下滚动 300 像素时，尝试弹出
// 这被浏览器视为“用户正在阅读”，此时弹窗成功率最高
window.onscroll = function() {
    if (!hasPopped && window.scrollY > 300) {
        showPopUp();
    }
};

// 备用方案：如果用户不滚动，但在页面待了15秒，也弹
setTimeout(() => {
    if (!hasPopped) showPopUp();
}, 15000);

function showPopUp() {
    const card = document.getElementById('contactCard');
    if (card) {
        card.style.display = 'block'; // 强制显示
        card.style.opacity = '1';
        card.style.visibility = 'visible';

        // 尝试播放声音（如果浏览器策略允许）
        const sound = document.getElementById('noticeSound');
        if (sound) {
            sound.play().catch(e => console.log("声音被拦截，但弹窗已显示"));
        }

        hasPopped = true; // 确保只弹一次
        console.log("弹窗已激活");
    }
}

function toggleContact() {
    const card = document.getElementById('contactCard');
    if (card.style.display === 'block' || card.style.visibility === 'visible') {
        card.style.display = 'none';
        card.style.visibility = 'hidden';
        hasPopped = true; // 用户关了就不再弹
    } else {
        card.style.display = 'block';
        card.style.visibility = 'visible';
    }
}

// 复制功能
function copyWeChat() {
    const id = "PHD_Apply_Expert";
    navigator.clipboard.writeText(id).then(() => {
        alert("微信号已复制！请备注专业方向。");
    });
}