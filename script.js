// 定义数字到上标的映射关系
const superscriptMap = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹'
};

// 获取DOM元素
const phoneInput = document.getElementById('phoneInput');
const generateBtn = document.getElementById('generateBtn');
const resultText = document.getElementById('resultText');
const copyBtn = document.getElementById('copyBtn');

// 输入验证：只允许数字
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});

// 生成上标号码
function generateSuperscript() {
    const phoneNumber = phoneInput.value;
    if (!phoneNumber) {
        alert('请输入电话号码');
        return;
    }
    
    // 转换为上标
    const superscript = phoneNumber
        .split('')
        .map(digit => superscriptMap[digit])
        .join('');
    
    // 显示结果区域
    const resultSection = document.querySelector('.result-section');
    resultSection.classList.remove('hidden');
    
    // 设置结果文本
    resultText.textContent = superscript;
}

// 显示消息提示
function showMessage(text) {
    const container = document.getElementById('message-container');
    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = text;
    
    container.appendChild(message);
    
    // 触发重绘以启动动画
    message.offsetHeight;
    message.classList.add('show');
    
    // 2秒后移除消息
    setTimeout(() => {
        message.classList.remove('show');
        message.addEventListener('transitionend', () => {
            container.removeChild(message);
        });
    }, 2000);
}

// 复制结果
async function copyResult() {
    if (!resultText.textContent) {
        showMessage('请先生成上标号码');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(resultText.textContent);
        showMessage('复制成功');
    } catch (err) {
        showMessage('复制失败，请手动复制');
    }
}

// 添加按钮事件监听
generateBtn.addEventListener('click', generateSuperscript);
copyBtn.addEventListener('click', copyResult);

// 支持回车键生成
phoneInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateSuperscript();
    }
}); 