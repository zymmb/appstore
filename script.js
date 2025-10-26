document.addEventListener('DOMContentLoaded', () => {
    fetchApps().then(apps => {
        displayApps(apps);
    }).catch(error => {
        console.error('Error fetching apps:', error);
    });
});

async function fetchApps() {
    const response = await fetch('data/apps.json');
    if (!response.ok) {
        throw new Error('Failed to fetch apps');
    }
    return await response.json();
}

function displayApps(apps) {
    const appList = document.getElementById('app-list');
    appList.innerHTML = ''; // Clear existing apps

    apps.forEach(app => {
        const appDiv = document.createElement('div');
        appDiv.classList.add('app');

        const appName = document.createElement('h2');
        appName.textContent = app.name;
        appDiv.appendChild(appName);

        const appIcon = document.createElement('img');
        appIcon.src = app.iconUrl;
        appIcon.alt = app.name;
        appDiv.appendChild(appIcon);

        const appDetails = document.createElement('p');
        appDetails.innerHTML = app.details;
        appDiv.appendChild(appDetails);

        appList.appendChild(appDiv);
    });
}