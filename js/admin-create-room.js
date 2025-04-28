// Use existing API_URL if it exists, otherwise declare it
const ROOM_API_URL = window.API_URL || 'https://hostel-backend-wxqs.onrender.com/api';

// Check admin access
async function checkAdminAccess() {
    try {
        const res = await fetch(`${ROOM_API_URL}/auth/me`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        if (!res.ok) {
            window.location.href = 'index.html';
            return;
        }
        const user = await res.json();
        if (user.role !== 'admin') {
            alert('Access denied. Admin privileges required.');
            window.location.href = 'index.html';
            return;
        }
        document.getElementById('adminName').textContent = user.name || 'Admin';
    } catch (err) {
        console.error('Error checking admin access:', err);
        window.location.href = 'index.html';
    }
}

// Update image preview
function updateImagePreview() {
    const imageUrl = document.getElementById('roomImage').value;
    const preview = document.getElementById('imagePreview');
    
    if (imageUrl) {
        // Show loading state
        preview.innerHTML = '<div class="loading">Loading preview...</div>';
        
        // Create image element
        const img = new Image();
        img.src = imageUrl;
        img.alt = 'Room Preview';
        img.style.maxWidth = '200px';
        img.style.marginTop = '10px';
        
        // Handle image load
        img.onload = () => {
            preview.innerHTML = '';
            preview.appendChild(img);
        };
        
        // Handle image error
        img.onerror = () => {
            preview.innerHTML = '<div class="error">Failed to load image preview</div>';
        };
    } else {
        preview.innerHTML = '';
    }
}

// Create room
async function createRoom(roomData) {
    try {
        const res = await fetch(`${ROOM_API_URL}/rooms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(roomData)
        });
        
        if (!res.ok) throw new Error('Failed to create room');
        return true;
    } catch (err) {
        console.error('Error creating room:', err);
        return false;
    }
}

// Form submission
document.getElementById('roomForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Creating...';
    submitBtn.disabled = true;
    
    try {
        const roomData = {
            room_number: form.room_number.value,
            room_type: form.room_type.value,
            occupancy: form.occupancy_limit.value,
            price: form.price_per_semester.value,
            description: form.description.value,
            status: 'available',
            // image_url: form.image_url.value
        };
        
        if (await createRoom(roomData)) {
            alert('Room created successfully!');
            window.location.href = 'admin-rooms.html';
        } else {
            alert('Failed to create room. Please try again.');
        }
    } catch (error) {
        console.error('Error creating room:', error);
        alert('An error occurred while creating the room. Please try again.');
    } finally {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Image preview on change
document.getElementById('roomImage').addEventListener('change', updateImagePreview);

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const res = await fetch(`${ROOM_API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        if (res.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Logout failed. Please try again.');
        }
    } catch (err) {
        console.error('Logout error:', err);
        alert('Logout failed. Please try again.');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await checkAdminAccess();
}); 