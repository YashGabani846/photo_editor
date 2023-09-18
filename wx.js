

const imageInput = document.getElementById('imageInput');
const outputImage = document.getElementById('outputImage');
const upb =document.querySelector(".upb");



imageInput.addEventListener('change', handleImage);
upb.addEventListener('click',()=>{
    imageInput.click();
})
function handleImage(event) {
    const image = new Image();
    image.onload = ()=>{
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        console.log(data);
        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];
            const alpha = data[i+3];

        
            if (green > 100 && red < 100 && blue < 100) {
                data[i + 3] = 0; 
            }
        }

        ctx.putImageData(imageData, 0, 0);

        outputImage.innerHTML = ''; 
        outputImage.appendChild(canvas);
        outputImage.style.display = 'block';
        const link =document.createElement("a");
        
link.download = "image.jpg";
link.href = canvas.toDataURL();
link.click();
    };

    const file = event.target.files[0];
    if (file) {
        image.src = URL.createObjectURL(file);
       
    }
}
