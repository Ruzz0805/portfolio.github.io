function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Add these functions to handle the modal
function openProjectModal(projectId) {
  const modal = document.getElementById(projectId);
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

// Close modal when clicking the X button
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function() {
    const modal = this.closest('.modal');
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }
});

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }
}

// Add form handling functionality
function sendEmail(e) {
    e.preventDefault();

    // Get the form elements
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Change button text and disable it
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    // Prepare template parameters
    const templateParams = {
        to_name: 'Lloyd Ruzzelle',
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
    };

    // Send the email using EmailJS
    emailjs.send('service_1xr1oyi', 'template_5bl3r1g', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully!', 'success');
            document.getElementById('contact-form').reset();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            showNotification('Failed to send message: ' + error.text, 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
}

// Add notification functionality
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;

    // Add notification styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.animation = 'slideIn 0.5s ease-out';
    notification.style.zIndex = '10000';
    
    // Set colors based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#013220';
        notification.style.color = '#fff';
        notification.style.border = '2px solid #c0b9ac';
    } else {
        notification.style.backgroundColor = '#ff4444';
        notification.style.color = '#fff';
        notification.style.border = '2px solid #cc0000';
    }

    // Add to document
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Add notification animations to your CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
