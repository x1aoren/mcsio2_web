// 通过fetch异步加载rules.md
async function loadMarkdown() {
    const resp = await fetch('rules.md');
    if (!resp.ok) {
        document.getElementById('markdown-content').innerHTML = '<p style="color:red">无法加载规则内容</p>';
        return '';
    }
    return await resp.text();
}

// 渲染markdown到右侧内容区
function renderMarkdown(md) {
    document.getElementById('markdown-content').innerHTML = marked.parse(md);
}

// 解析markdown标题结构
function parseHeadings(md) {
    const lines = md.split('\n');
    const headings = [];
    lines.forEach((line, idx) => {
        const match = line.match(/^(#{1,6})\s+(.+)/);
        if (match) {
            // 去除HTML标签，保证侧边栏纯文本
            const plainText = match[2].replace(/<[^>]+>/g, '');
            headings.push({
                level: match[1].length,
                text: plainText,
                line: idx,
                id: 'heading-' + idx
            });
        }
    });
    return headings;
}

// 渲染侧边栏，支持折叠
function renderSidebar(headings) {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = '';
    const ul = document.createElement('ul');
    let stack = [{ul, level: 0}];
    let lastLi = null;
    headings.forEach((h, i) => {
        while (stack.length > 0 && h.level <= stack[stack.length-1].level) {
            stack.pop();
        }
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.className = `sidebar-title level-${h.level}`;
        div.textContent = h.text;
        div.dataset.idx = i;
        div.dataset.level = h.level;
        div.dataset.id = h.id;
        div.onclick = function() {
            // 修正定位偏移，考虑导航栏高度
            const target = document.getElementById(h.id);
            if (target) {
                const nav = document.querySelector('.navbar');
                const navHeight = nav ? nav.offsetHeight : 0;
                const rect = target.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                window.scrollTo({
                    top: rect.top + scrollTop - navHeight - 10, // 10px额外间距
                    behavior: 'smooth'
                });
            }
            document.querySelectorAll('.sidebar .active').forEach(e=>e.classList.remove('active'));
            div.classList.add('active');
        };
        li.appendChild(div);
        // 折叠功能
        if (i < headings.length-1 && headings[i+1].level > h.level) {
            div.classList.add('collapsible');
            div.onclick = function(e) {
                e.stopPropagation();
                const nextUl = li.querySelector('ul');
                if (nextUl) {
                    nextUl.style.display = nextUl.style.display === 'none' ? '' : 'none';
                }
                // 修正定位偏移
                const target = document.getElementById(h.id);
                if (target) {
                    const nav = document.querySelector('.navbar');
                    const navHeight = nav ? nav.offsetHeight : 0;
                    const rect = target.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    window.scrollTo({
                        top: rect.top + scrollTop - navHeight - 10,
                        behavior: 'smooth'
                    });
                }
                document.querySelectorAll('.sidebar .active').forEach(e=>e.classList.remove('active'));
                div.classList.add('active');
            };
        }
        stack[stack.length-1].ul.appendChild(li);
        if (i < headings.length-1 && headings[i+1].level > h.level) {
            const childUl = document.createElement('ul');
            li.appendChild(childUl);
            stack.push({ul: childUl, level: headings[i+1].level-1});
        }
        lastLi = li;
    });
    sidebar.appendChild(ul);
}

// 给正文标题加锚点id
function addHeadingIds(md, headings) {
    let lines = md.split('\n');
    headings.forEach(h => {
        const line = lines[h.line];
        lines[h.line] = line.replace(/^(#{1,6}\s+)/, `$1<span id="${h.id}"></span>`);
    });
    return lines.join('\n');
}

// 初始化
async function initRules() {
    const markdown = await loadMarkdown();
    if (!markdown) return;
    let headings = parseHeadings(markdown);
    let mdWithIds = addHeadingIds(markdown, headings);
    renderMarkdown(mdWithIds);
    renderSidebar(headings);
}

initRules(); 