/**
 * i18n-engine.js
 * 核心功能：
 * 1. 界面文字、占位符切换
 * 2. 按钮高亮状态切换
 * 3. 搜索结果（导师卡片）实时重绘
 */

// 兼容版 i18n-engine.js
// 兼容版 i18n-engine.js
function changeLang(lang) {
    localStorage.setItem('current_lang', lang);

    // 更新按钮高亮 (同时支持 .btn-lang 和 .btn-lang-mini)
    document.querySelectorAll('.btn-lang, .btn-lang-mini').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(lang)) {
            btn.classList.add('active');
        }
    });

    // 翻译文本内容
    document.querySelectorAll('.i18n').forEach(el => {
        const key = el.getAttribute('data-key');
        if (i18nData[lang][key]) el.innerText = i18nData[lang][key];
    });

    // 翻译占位符
    document.querySelectorAll('.i18n-placeholder').forEach(el => {
        const key = el.getAttribute('data-key');
        if (i18nData[lang][key]) el.placeholder = i18nData[lang][key];
    });

    // 如果在搜索页且有数据，重绘卡片
    if (typeof renderResults === 'function' && typeof lastSearchResults !== 'undefined' && lastSearchResults.length > 0) {
        renderResults(lastSearchResults);
    }
}

window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('current_lang') || 'zh';
    changeLang(savedLang);
});
/**
 * 内部辅助函数：更新语言切换按钮的 CSS 类
 */
function updateLangButtonUI(lang) {
    // 移除所有语言按钮的 active 类
    document.querySelectorAll('.btn-lang').forEach(btn => {
        btn.classList.remove('active');
    });

    // 查找当前点击的语言对应的按钮并添加 active 类
    // 匹配规则：查找包含对应 lang 参数的 onclick 属性的按钮
    const activeBtn = document.querySelector(`.btn-lang[onclick*="'${lang}'"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

/**
 * 页面加载时自动初始化语言
 */
document.addEventListener('DOMContentLoaded', () => {
    // 读取保存的语言，默认为中文 'zh'
    const savedLang = localStorage.getItem('current_lang') || 'zh';
    console.log("系统初始化，当前语言设定为:", savedLang);
    changeLang(savedLang);
});


window.addEventListener('load', () => {
    // 自动读取之前在搜索页选好的语言，如果没有选过，默认中文
    const savedLang = localStorage.getItem('current_lang') || 'zh';
    changeLang(savedLang);
});