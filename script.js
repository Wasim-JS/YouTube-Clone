// const url = 'https://youtube-search-results.p.rapidapi.com/youtube-search/?q=javascript';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '71cb165cdcmsh45ae49203c67737p170f63jsnbe11e07a3289',
// 		'X-RapidAPI-Host': 'youtube-search-results.p.rapidapi.com'
// 	}
// };


// 	 fetch(url, options).then(res=>res.json()).then(result=>console.log(result.items)).catch(error=>console.log(error))
let keyVal = 'trending'
let isWritting = false

const inp = document.querySelector("#inp")
const searcIicon1 = document.querySelector(".search-icon1")
searcIicon1.style.display = "none"
inp.addEventListener("blur",(e)=>{
    console.log("blur")
    searcIicon1.style.display = "none"
    e.target.parentElement.style.border = "1px solid rgba(0, 0, 0, 0.3)"
    isWritting = false

})
inp.addEventListener("focus",(e)=>{
    console.log("focus")
    searcIicon1.style.display = "block"
    isWritting = true
    e.target.parentElement.style.border = "1px solid black"
})

document.addEventListener(
    "keydown",
    (event) => {
      const keyName = event.key;
  
      const inp = document.querySelector("#inp")
      if(keyName === 'Enter' && isWritting && inp.value)
      {
        fetchVideos(inp.value)
        inp.blur()

      }
    }
  );


function abbreviateNumber(number) {
    const SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];
    const sign = number < 0 ? '-1' : '';
    const absNumber = Math.abs(number);
    const tier = Math.log10(absNumber) / 3 | 0;
    // if zero, we don't need a prefix
    if(tier == 0) return `${absNumber}`;
    // get postfix and determine scale
    const postfix = SI_POSTFIXES[tier];
    const scale = Math.pow(10, tier * 3);
    // scale the number
    const scaled = absNumber / scale;
    const floored = Math.floor(scaled * 10) / 10;
    // format number and add postfix as suffix
    let str = floored.toFixed(1);
    // remove '.0' case
    str = (/\.0$/.test(str)) ? str.substr(0, str.length - 2) : str;
    return `${sign}${str}${postfix}`;
}

 const vidoes = document.querySelector(".vedios")
 const searchBtn = document.querySelector("#search")
 const loading = document.querySelector(".loading")
const topBtns = document.querySelectorAll('.topBtn')

topBtns.forEach(btn=>[
    btn.addEventListener("click",(e)=>{
        fetchVideos(e.target.innerText)

    })
])

 
 searchBtn.addEventListener('click',()=>{
     const inp = document.querySelector("#inp")
     let key = inp.value
     if(!key) return
     keyVal = key
     fetchVideos(keyVal)
     
     
 })

const fetchVideos = async (Key) =>{
    
    vidoes.innerHTML =`<h2 style='width:100%;height:100%;display:flex;justify-content:center;align-items:center'>Loading Your Search, Please Wait......</h2>`
    loading.classList.add('loading2')
    const url = `https://simple-youtube-search.p.rapidapi.com/search?query=${Key}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '71cb165cdcmsh45ae49203c67737p170f63jsnbe11e07a3289',
            'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com'
        }
    }

	const res = await fetch(url, options)
    const data = await res.json()
    console.log("data resevied",data.results)
    loading.classList.add('loading3')
    makeVideo(data.results)
    
    setTimeout(()=>{
        loading.style.opacity = "0"
        
    },500)
    setTimeout(()=>{
        loading.classList.remove('loading2')
        loading.classList.remove('loading3')
        
    },800)
    setTimeout(()=>loading.style.opacity = "1",900)
   
   
   
   
}



const makeVideo = (data) =>{
    
    console.log("data out vedio",data.results)


   const videoData = data.map(e=>{
    console.log("data in map ",e)

        let div = document.createElement("div");
        div.innerHTML = `

        <div class="vedio">
        <div class="vimg">
        <a href="/playVedio.html?data=${e.url}&desc=${e.title}&channel=${e.channel.name}">
           <img src="${e.thumbnail?.url}" alt="">
            <span>${e.duration_formatted}</span>
        </a>
    </div>
    <div class="info">
        <p style="font-weight: 900;padding-left:5px; margin:5px">${e.title}</p>
        <p style="padding-left:10px;color:gray">${e.channel.name}<i class="fa-solid fa-circle-check"></i></p>
        <div class="views">
          <p >${abbreviateNumber(e.views)}<span>views.</span></p>
          <p>${e.uploadedAt ? e.uploadedAt: '5 min ago'}</p>
        </div>
    </div>

    </div>
        
        `

        return div.firstElementChild;
        
    })

    vidoes.innerHTML = ""
    videoData.forEach(element => {
        
        vidoes.appendChild(element)
    });

}
// const vidoes = document.querySelector(".vedios")

fetchVideos(keyVal)

