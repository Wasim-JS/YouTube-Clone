const urlParams = new URLSearchParams(window.location.search);
let data = urlParams.get('data');
let descs = urlParams.get('desc');
let chanelN = urlParams.get('channel');
window.addEventListener('load',()=>{
    console.log("data:",data)
    // data = data.replace(/watch\?=/,"embed/")
    data = data.replace(`watch?v=`,"embed/")
    let iframe = document.querySelector('iframe')
    iframe.src = data

    let desc = document.querySelector('.desc')
      desc.innerHTML = descs 

    let channel = document.querySelector('.channel')
      channel.innerHTML = chanelN
})