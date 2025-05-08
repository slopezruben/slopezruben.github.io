document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeButton = document.getElementById('toggle-theme');
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        toggleThemeButton.textContent = document.body.classList.contains('night-mode') 
            ? 'Day Mode' 
            : 'Night Mode';
    });
});
