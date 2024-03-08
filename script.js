// Get the follower element
const follower = document.getElementById('follower');

// Add mousemove event listener to the document
document.addEventListener('mousemove', (event) => {
    // Update follower position to match mouse cursor
    follower.style.left = event.pageX + 'px'
    follower.style.top = event.pageY + 'px'
})