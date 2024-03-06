const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
let isDrawing = false;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});



document.getElementById('saveButton').addEventListener('click', () => {
    const canvas = document.getElementById('signatureCanvas');
    const image = canvas.toDataURL();
    saveSignature(image);
});

     // Convert canvas to base64 image
    // Here you can send the 'image' data to the backend (Python Flask)
function saveSignature(imageData) {
    fetch('/save-signature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signature: imageData })
    })
    .then(response => {
        if (response.ok) {
            console.log('Signature saved successfully');
        } else {
            console.error('Failed to save signature');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}