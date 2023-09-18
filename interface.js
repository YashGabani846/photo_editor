const fileinput= document.querySelector(".file-input");
const pic =document.querySelector("#pic");
const filterbtn = document.querySelectorAll(".filtertool button")
const  choseimgbtn = document.querySelector(".choose");
const filtername = document.querySelector(".name");
const filtervalue = document.querySelector(".value")
const slider = document.querySelector("#slider");
const resetall = document.querySelector("#reset");
const rotate = document.querySelector("#rotate");
const download = document.querySelector(".download");
let bright=100,saturation=100,inversion=0,contrast=100;
let angel=0;
const applyFilter = ()=>{
    pic.style.transform=`rotate(${angel}deg)`;
    pic.style.filter = `brightness(${bright}%) saturate(${saturation}%) invert(${inversion}%) contrast(${contrast}%)`
}

const loadimage =()=>{
    let file=fileinput.files[0];
    if(!file){
        return;
    }
    console.log(file)
    pic.src=URL.createObjectURL(file);
}

filterbtn.forEach(Element=>{
    Element.addEventListener('click',()=>{
       document.querySelector('.filtertool .active').classList.remove("active");
       Element.classList.add("active");
      filtername.innerHTML=Element.innerHTML; 
      if(Element.id==='Brightness'){
        slider.max="200";
      slider.value=bright;
      filtervalue.innerHTML=`${bright}%`
    }else if(Element.id==='Saturation'){
        slider.max="200";
        slider.value=saturation;
        filtervalue.innerHTML=`${saturation}%`
    }else if(Element.id==='Inversion'){
        slider.max="100";
        slider.value=inversion;
      filtervalue.innerHTML=`${inversion}%`
    }else if(Element.id==='Contrast'){
        slider.max="200";
        slider.value=contrast;
        filtervalue.innerHTML=`${contrast}%` 
    }
  

    })
})

const updateFilter = ()=>{
    console.log(slider.value);
    filtervalue.innerHTML= `${slider.value}%`;
    const selectedfilter =document.querySelector(".filtertool .active");
    if(selectedfilter.id==='Brightness'){
        bright= slider.value;
    }else if(selectedfilter.id==='Saturation'){
        saturation=slider.value
    }else if(selectedfilter.id==='Inversion'){
        inversion=slider.value;
    }else if(selectedfilter.id==='Contrast'){
        contrast=slider.value;
    }
    applyFilter();
}
rotate.addEventListener('click',()=>{
angel -= 90;
applyFilter();

})
const reset= ()=>{
bright=100;
saturation=100;
angel=0;
contrast=100;
inversion=0;
angel = 0;
applyFilter();
}
const saveimage=()=>{
const canvas=document.createElement("canvas");
const ctx=canvas.getContext("2d");
canvas.width= pic.naturalWidth; 
canvas.height=pic.naturalHeight;
ctx.filter= `brightness(${bright}%) saturate(${saturation}%) invert(${inversion}%) contrast(${contrast}%)`;
ctx.translate(canvas.width/2,canvas.height/2);
if(angel!==0){
    ctx.rotate(rotate * Math.PI /180);

}
ctx.drawImage(pic,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
const link =document.createElement("a");
link.download = "image.jpg";
link.href =canvas.toDataURL();
link.click();
}

fileinput.addEventListener("change",loadimage);
resetall.addEventListener('click',reset)
slider.addEventListener("input",updateFilter)
download.addEventListener('click',saveimage);
choseimgbtn.addEventListener("click",()=>{
    fileinput.click();
})

