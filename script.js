class AppStore {
    constructor() {
        this.apps = [];
        this.filteredApps = [];
        this.init();
    }

    async init() {
        await this.loadData();
        this.renderApps();
        this.setupEventListeners();
        this.updateLastUpdated();
    }

    // 加载应用数据
    async loadData() {
        try {
            const response = await fetch('./data/apps.json');
            const data = await response.json();
            this.apps = data.apps || [];
            this.filteredApps = [...this.apps];
        } catch (error) {
            console.error('加载数据失败:', error);
            this.apps = [];
            this.filteredApps = [];
        }
    }

    // 渲染应用列表
    renderApps() {
        const appListElement = document.getElementById('appList');
        
        if (this.filteredApps.length === 0) {
            appListElement.innerHTML = '<div class="no-data">暂无应用数据</div>';
            return;
        }

        appListElement.innerHTML = this.filteredApps.map(app => `
            <div class="app-card" data-id="${app.id}">
                <img src="${app.iconUrl}" alt="${app.name}" class="app-icon" 
                     onerror="this.src='https://via.placeholder.com/60?text=App'" />
                <div class="app-name">${app.name}</div>
                <div class="app-company">${app.company}</div>
                <div class="app-category">${this.getCategoryName(app.category)}</div>
            </div>
        `).join('');
    }

    // 获取类别名称
    getCategoryName(category) {
        const categoryMap = {
            'game': '游戏',
            'short_play': '短视频',
            'news': '新闻',
            'general': '通用'
        };
        return categoryMap[category] || '未知';
    }

    // 设置事件监听
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');

        searchInput.addEventListener('input', (e) => {
            this.filterApps(e.target.value, categoryFilter.value);
        });

        categoryFilter.addEventListener('change', (e) => {
            this.filterApps(searchInput.value, e.target.value);
        });
    }

    // 过滤应用
    filterApps(searchTerm = '', category = '') {
        this.filteredApps = this.apps.filter(app => {
            const matchesSearch = !searchTerm || 
                app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.company.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = !category || app.category === category;

            return matchesSearch && matchesCategory;
        });

        this.renderApps();
    }

    // 更新最后更新时间
    updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('lastUpdated');
        lastUpdatedElement.textContent = new Date().toLocaleString('zh-CN');
    }

    // 添加应用（模拟）
    addApp(appData) {
        const newApp = {
            id: this.apps.length > 0 ? Math.max(...this.apps.map(a => a.id)) + 1 : 1,
            ...appData,
            insertTime: new Date().toLocaleString('zh-CN'),
            updateTime: new Date().toLocaleString('zh-CN')
        };

        this.apps.push(newApp);
        this.filterApps();
        this.saveData();
    }

    // 删除应用（模拟）
    deleteApp(appId) {
        this.apps = this.apps.filter(app => app.id !== appId);
        this.filterApps();
        this.saveData();
    }

    // 保存数据（在实际项目中，这里可以调用GitHub API）
    async saveData() {
        // 由于GitHub Pages是静态的，这里只能模拟保存
        // 实际部署时可以通过GitHub Actions自动更新数据文件
        console.log('数据已更新，需要重新部署以生效');
    }

    // 根据ID获取应用
    getAppById(id) {
        return this.apps.find(app => app.id === parseInt(id));
    }

    // 根据AppId获取应用
    getAppByAppId(appId) {
        return this.apps.find(app => app.appId === appId);
    }

    // 获取所有应用
    getAllApps() {
        return this.apps;
    }

    // 清空所有应用
    clearAllApps() {
        this.apps = [];
        this.filteredApps = [];
        this.renderApps();
        console.log('所有应用已清空');
    }
}

// 应用类别常量（对应原Java项目）
const AppCategory = {
    GAME: 'game',
    SHORT_PLAY: 'short_play',
    NEWS: 'news',
    GENERAL: 'general'
};

// 默认值常量
const DefaultValues = {
    UNKNOWN_APP: '未知应用',
    UNKNOWN_COMPANY: '未知公司'
};

// 初始化应用商店
document.addEventListener('DOMContentLoaded', () => {
    new AppStore();
});
