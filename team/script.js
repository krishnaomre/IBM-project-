document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            const details = document.createElement('div');
            details.className = 'member-details';
            details.innerHTML = `
                <h2>${member.querySelector('figcaption').textContent}</h2>
                <p>${member.querySelector('p').textContent}</p>
                <button class="close-btn">Close</button>
            `;
            document.body.appendChild(details);
            
            const closeBtn = details.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                details.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(details);
                }, 500);
            });
        });
    });
});

// Add fade-in and fade-out animations for the member details
const style = document.createElement('style');
style.innerHTML = `
    .member-details {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
        animation: fadeInDetails 0.5s forwards;
    }
    .member-details h2 {
        margin-top: 0;
    }
    .member-details.fade-out {
        animation: fadeOutDetails 0.5s forwards;
    }
    @keyframes fadeInDetails {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes fadeOutDetails {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);