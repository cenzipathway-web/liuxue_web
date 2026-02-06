// 1. 导航栏随滚动变色
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.background = '#fff';
    }
});

// 2. 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // 减去导航栏高度
                behavior: 'smooth'
            });
        }
    });
});

// 3. 简单的滚动入场动画 (可选)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.intro-card, .school-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});
let autoPopupTimer;
let userHasClosedManually = false;
let canPlaySound = false; // 声音许可标记

// --- 关键：监听用户在页面上的第一次点击，激活声音权限 ---
document.addEventListener('click', function() {
    if (!canPlaySound) {
        const sound = document.getElementById('noticeSound');
        // 这里的 play+pause 是为了在静音状态下“唤醒”音频上下文
        sound.play().then(() => {
            sound.pause();
            sound.currentTime = 0;
            canPlaySound = true;
            console.log("声音权限已激活");
        }).catch(e => console.log("等待激活..."));
    }
}, { once: true }); // 只执行一次

// 切换显示函数
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

// 播放声音的独立函数
function playSound() {
    const sound = document.getElementById('noticeSound');
    if (sound) {
        sound.play().catch(e => {
            console.log("声音被浏览器拦截，用户需先点击页面任意处");
        });
    }
}

// 自动弹出逻辑
function autoOpenContact() {
    const card = document.getElementById('contactCard');
    // 如果没被手动关闭，且当前是隐藏状态，则弹出
    if (!userHasClosedManually && card.style.display !== 'block') {
        card.style.display = 'block';
        playSound();
        console.log("执行自动弹出并响铃");
    }
}

// 页面加载 30 秒后执行（可以根据需要调短测试，比如 5000 代表 5 秒）
window.onload = function() {
    autoPopupTimer = setInterval(autoOpenContact, 5000);
};