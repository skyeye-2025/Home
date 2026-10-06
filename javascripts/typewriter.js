document.addEventListener('DOMContentLoaded', function () {
    // 获取所有需要应用打字效果的元素（按顺序）
    const typeElements = [
        document.getElementById('typewriter-line-1'),
        document.getElementById('typewriter-line-2'),
        document.getElementById('typewriter-line-3')
        // 可以继续添加更多元素
    ];

    // 过滤掉不存在的元素
    const validElements = typeElements.filter(el => el !== null);

    if (validElements.length > 0) {
        // 存储每个元素的原始文本
        const texts = validElements.map(el => {
            const text = el.textContent;
            el.textContent = ''; // 清空内容准备打字
            return text;
        });

        // 配置参数
        const typingSpeed = 100; // 打字速度（毫秒）
        const lineDelay = 500; // 换行延迟（毫秒）

        // 开始逐行打字
        typeLine(0);

        // 逐行打字函数
        function typeLine(lineIndex) {
            if (lineIndex >= validElements.length) return;

            const element = validElements[lineIndex];
            const text = texts[lineIndex];
            let charIndex = 0;

            // 单个元素的打字函数
            function typeChar() {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, typingSpeed);
                } else {
                    // 当前行完成，延迟后开始下一行
                    setTimeout(() => typeLine(lineIndex + 1), lineDelay);
                }
            }

            // 开始当前行的打字
            typeChar();
        }
    }
});
