// 在线玩家状态获取与展示
async function fetchOnlineStatus() {
    const statusEl = document.getElementById('online-status');
    try {
        // 使用mcstatus.io公开API获取服务器状态
        const resp = await fetch('https://api.mcstatus.io/v2/status/java/mc.mcsio2.cn');
        if (!resp.ok) throw new Error('网络错误');
        const data = await resp.json();
        if (data && data.online) {
            statusEl.textContent = `在线玩家：${data.players.online} / ${data.players.max}`;
        } else {
            statusEl.textContent = '服务器离线';
        }
    } catch (e) {
        statusEl.textContent = '获取失败';
    }
}

fetchOnlineStatus();
setInterval(fetchOnlineStatus, 30000); // 每30秒自动刷新 