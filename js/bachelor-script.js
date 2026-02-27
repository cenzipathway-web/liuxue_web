// 控制联系方式卡片的开关
function toggleContact() {
    const card = document.getElementById('contactCard');
    const isVisible = card.style.display === 'block';

    card.style.display = isVisible ? 'none' : 'block';

    // 如果打开时播放音效
    if (!isVisible) {
        const sound = document.getElementById('noticeSound');
        sound.volume = 0.2;
        sound.play().catch(e => console.log("音频播放需用户交互"));
    }
}

// 复制微信号功能
function copyWeChat() {
    const wechatId = "CenZi_Education";
    navigator.clipboard.writeText(wechatId).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = "已复制";
        btn.style.background = "#10b981";

        setTimeout(() => {
            btn.textContent = "复制";
            btn.style.background = "#3b82f6";
        }, 2000);
    });
}

// 动态消息效果
const messages = [
    "想要获取《全球本科择校指南》？",
    "想知道你的 GPA 能申到哪所名校？",
    "点击扫码，预约 1V1 规划方案"
];
let msgIndex = 0;

function rotateMessages() {
    const msgEl = document.getElementById('dynamicMsg');
    if (msgEl) {
        msgEl.style.opacity = 0;
        setTimeout(() => {
            msgEl.textContent = messages[msgIndex];
            msgEl.style.opacity = 1;
            msgIndex = (msgIndex + 1) % messages.length;
        }, 500);
    }
}

// 页面加载后的逻辑
window.addEventListener('DOMContentLoaded', () => {
    // 1. 每 5 秒轮换一次卡片消息
    setInterval(rotateMessages, 5000);

    // 2. 模拟：用户停留 10 秒后自动弹出咨询框（仅弹出一次）
    setTimeout(() => {
        const card = document.getElementById('contactCard');
        if (card.style.display !== 'block') {
            toggleContact();
        }
    }, 10000);
});

// 滚动时导航栏变色效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = "rgba(255, 255, 255, 0.95)";
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.05)";
    } else {
        nav.style.background = "rgba(255, 255, 255, 0.8)";
        nav.style.boxShadow = "none";
    }
});

function switchPath(event, pathId) {
    // 1. 隐藏所有内容
    const contents = document.querySelectorAll('.pathway-content');
    contents.forEach(content => content.classList.remove('active'));

    // 2. 取消所有按钮的激活状态
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));

    // 3. 显示当前点击的内容
    document.getElementById(pathId).classList.add('active');

    // 4. 激活当前按钮
    event.currentTarget.classList.add('active');
}

function filterResults(category) {
    // 1. 更新按钮状态
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 2. 过滤卡片
    const cards = document.querySelectorAll('.result-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            // 添加一个淡入动画
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}