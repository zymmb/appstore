class AppStore {
    constructor() {
        this.apps = [];
        this.filteredApps = [];
        this.isLoading = true;
        this.init();
    }

    async init() {
        this.showLoading();
        await this.loadData();
        this.hideLoading();
        this.renderApps();
        this.setupEventListeners();
        this.updateLastUpdated();
    }

    // 修复数据加载路径问题
    async loadData() {
        try {
            // 使用相对路径，确保在GitHub Pages上正常工作
            const basePath = window.location.pathname.includes('/appstore/') 
                ? './' 
                : window.location.pathname.endsWith('/') 
                    ? './' 
                    : './';
            
            const response = await fetch(`${basePath}data/apps.json`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache'
                }
        });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.apps = data.apps || [];
            this.filteredApps = [...this.apps];
            this.updateStats();
            
        } catch (error) {
            console.error('加载数据失败:', error);
            this.showError('无法加载应用数据：' + error.message);
            this.apps = [];
            this.filteredApps = [];
        }
    }

    // 渲染应用列表
    renderApps() {
        const appListElement = document.getElementById('appList');
        
        if (this.filteredApps.length === 0) {
            appListElement.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-box-open"></i>
                    <h3>暂无应用数据</h3>
                    <p>当前没有符合条件的应用，请尝试调整搜索条件</p>
                </div>
            `;
            return;
        }

        appListElement.innerHTML = this.filteredApps.map(app => `
            <div class="app-card" data-id="${app.id}">
                <img src="${app.iconUrl}" alt="${app.name}" class="app-icon" 
                     onerror="this.src='https://picsum.photos/64/64?random=${app.id}'" />
                <div class="app-name">${this.escapeHtml(app.name)}</div>
                <div class="app-company">${this.escapeHtml(app.company)}</div>
                <div class="app-category">${this.getCategoryName(app.category)}</div>
                <div class="app-time">
                    <small>更新: ${this.formatTime(app.updateTime)}</small>
                </div>
            </div>
        `).join('');
    }

    // HTML转义防止XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 获取类别名称
    getCategoryName(category) {
        const categoryMap = {
            'game': '🎮 游戏',
            'short_play': '📹 短视频',
            'news': '📰 新闻',
            'general': '📱 通用'
        };
        return categoryMap[category] || '❓ 未知';
    }

    // 格式化时间
    formatTime(timeString) {
        if (!timeString) return '-';
        return timeString.split(':')[0]; // 简化显示
    }

    // 设置事件监听
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const refreshBtn = document.getElementById('refreshBtn');

        searchInput.addEventListener('input', (e) => {
            this.debounce(() => {
                this.filterApps(e.target.value, categoryFilter.value);
            }, 300)();
        });

        categoryFilter.addEventListener('change', (e) => {
            this.filterApps(searchInput.value, e.target.value);
        });

        refreshBtn.addEventListener('click', () => {
            this.refreshData();
        });

        // 添加键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.refreshData();
            }
        });
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 过滤应用
    filterApps(searchTerm = '', category = '') {
        this.filteredApps = this.apps.filter(app => {
            const matchesSearch = !searchTerm || 
                app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (app.appId && app.appId.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = !category || app.category === category;

            return matchesSearch && matchesCategory;
        });

        this.renderApps();
        this.updateStats();
    }

    // 更新统计信息
    updateStats() {
        const totalCount = document.getElementById('totalCount');
        const filterCount = document.getElementById('filterCount');
        
        totalCount.textContent = this.apps.length;
        
        if (this.filteredApps.length !== this.apps.length) {
            filterCount.textContent = `筛选: ${this.filteredApps.length} 个`;
        } else {
            filterCount.textContent = '';
        }
    }

    // 更新最后更新时间
    updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('lastUpdated');
        lastUpdatedElement.textContent = new Date().toLocaleString('zh-CN');
    }

    // 刷新数据
    async refreshData() {
        this.showLoading();
        this.hideError();
        await this.loadData();
        this.hideLoading();
    }

    // 显示加载状态
    showLoading() {
        this.isLoading = true;
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('appList').classList.add('hidden');
    }

    // 隐藏加载状态
    hideLoading() {
        this.isLoading = false;
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('appList').classList.remove('hidden');
    }

    // 显示错误信息
    showError(message) {
        const errorElement = document.getElementById('errorMessage');
        errorElement.querySelector('p').textContent = message;
        errorElement.classList.remove('hidden');
    }

    // 隐藏错误信息
    hideError() {
        document.getElementById('errorMessage').classList.add('hidden');
    }

    // 获取所有应用
    getAllApps() {
        return this.apps;
    }

    // 根据ID获取应用
    getAppById(id) {
        return this.apps.find(app => app.id === parseInt(id));
    }
}

// 初始化应用商店
document.addEventListener('DOMContentLoaded', () => {
    window.appStore = new AppStore();
});

// 全局错误处理
window.addEventListener('error', (event) => {
    console.error('全局错误:', event.error);
});