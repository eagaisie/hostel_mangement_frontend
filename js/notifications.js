// API Configuration
if (typeof API_URL === 'undefined') {
    const API_URL = 'https://hostel-backend-wxqs.onrender.com/api';
}

// DOM Elements
const notificationsList = document.getElementById('notificationsList');
const notificationType = document.getElementById('notificationType');
const markAllReadBtn = document.getElementById('markAllRead');
const userNameElement = document.getElementById('userName');
const notificationsBtn = document.getElementById('notificationsBtn');

let allNotifications = [];

// Initialize Page
async function initializePage() {
    try {
        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login.html';
            return;
        }

        // Set a default username if API fails
        userNameElement.textContent = 'Welcome, Student';
        
        // Try to fetch user data
        try {
            await fetchUserData();
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Continue with default username
        }
        
        // Try to fetch notifications
        try {
            await fetchNotifications();
        } catch (error) {
            console.error('Error fetching notifications:', error);
            // Display sample notifications
            displaySampleNotifications();
        }
        
        // Update UI
        updateUI();
        updateNotificationIcon();
    } catch (error) {
        console.error('Error initializing page:', error);
        // Display sample notifications on any error
        displaySampleNotifications();
        updateUI();
        updateNotificationIcon();
    }
}

// Fetch user data
async function fetchUserData() {
    const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    
    if (!response.ok) throw new Error('Failed to fetch user data');
    
    const userData = await response.json();
    userNameElement.textContent = `Welcome, ${userData.name}`;
}

// Fetch notifications
async function fetchNotifications() {
    const response = await fetch(`${API_URL}/notifications`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    
    if (!response.ok) throw new Error('Failed to fetch notifications');
    
    allNotifications = await response.json();
}

// Display sample notifications
function displaySampleNotifications() {
    allNotifications = [
        {
            id: 1,
            title: 'Application Status Update',
            content: 'Your room application for Room A101 has been approved.',
            type: 'application',
            date: new Date().toISOString(),
            read: false
        },
        {
            id: 2,
            title: 'Maintenance Notice',
            content: 'Scheduled maintenance in Block A on Saturday, 10:00 AM - 2:00 PM.',
            type: 'maintenance',
            date: new Date(Date.now() - 86400000).toISOString(),
            read: true
        },
        {
            id: 3,
            title: 'Important Announcement',
            content: 'New hostel rules will be implemented starting next month.',
            type: 'announcement',
            date: new Date(Date.now() - 172800000).toISOString(),
            read: false
        },
        {
            id: 4,
            title: 'Room Assignment',
            content: 'You have been assigned to Room B203. Please collect your keys from the admin office.',
            type: 'application',
            date: new Date(Date.now() - 259200000).toISOString(),
            read: false
        },
        {
            id: 5,
            title: 'Payment Reminder',
            content: 'Please submit your hostel fee payment before the end of this week.',
            type: 'announcement',
            date: new Date(Date.now() - 432000000).toISOString(),
            read: true
        }
    ];
}

// Update UI
function updateUI() {
    if (!allNotifications.length) {
        notificationsList.innerHTML = `
            <div class="no-notifications">
                <p>No notifications available</p>
            </div>
        `;
        return;
    }

    const filteredNotifications = filterNotifications();
    displayNotifications(filteredNotifications);
}

// Filter notifications
function filterNotifications() {
    const type = notificationType.value;
    if (type === 'all') return allNotifications;
    return allNotifications.filter(notification => notification.type === type);
}

// Display notifications
function displayNotifications(notifications) {
    const notificationsHTML = notifications.map(notification => `
        <div class="notification-card ${notification.read ? '' : 'unread'}" data-id="${notification.id}">
            <div class="notification-header">
                <h3 class="notification-title">${notification.title}</h3>
                <span class="notification-date">${formatDate(notification.date)}</span>
            </div>
            <div class="notification-content">
                <span class="notification-type type-${notification.type}">${notification.type}</span>
                ${notification.content}
            </div>
            ${!notification.read ? `
                <div class="notification-actions">
                    <button class="btn-mark-read" onclick="markAsRead('${notification.id}')">Mark as Read</button>
                </div>
            ` : ''}
        </div>
    `).join('');
    
    notificationsList.innerHTML = notificationsHTML;
}

// Update notification icon with unread count
function updateNotificationIcon() {
    if (!notificationsBtn) return;
    
    const unreadCount = allNotifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
        notificationsBtn.innerHTML = `🔔 <span class="notification-badge">${unreadCount}</span>`;
    } else {
        notificationsBtn.innerHTML = '🔔';
    }
}

// Mark notification as read
async function markAsRead(notificationId) {
    try {
        const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to mark notification as read');
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
    
    // Update UI regardless of API response
    const notification = allNotifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        updateUI();
        updateNotificationIcon();
    }
}

// Mark all notifications as read
async function markAllAsRead() {
    try {
        const response = await fetch(`${API_URL}/notifications/read-all`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to mark all notifications as read');
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
    }
    
    // Update UI regardless of API response
    allNotifications.forEach(notification => notification.read = true);
    updateUI();
    updateNotificationIcon();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    // Less than 24 hours
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        if (hours === 0) {
            const minutes = Math.floor(diff / 60000);
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        }
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    }
    
    // Less than 7 days
    if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }
    
    // Otherwise, show the date
    return date.toLocaleDateString();
}

// Show error message
function showError(message) {
    notificationsList.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializePage);
notificationType.addEventListener('change', updateUI);
markAllReadBtn.addEventListener('click', markAllAsRead); 