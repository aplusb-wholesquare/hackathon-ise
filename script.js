const searchform = document.getElementById("search-form");
const searchresult = document.getElementById("search-result");
const loadmore = document.getElementById("show-more");
const searchbox = document.getElementById("search-box");
const lisence = document.getElementById("lisence");
const samePseudoCount = document.getElementById("samePseudoCount");


let keyword ="";
let page=1;

async function searchImage(){
    keyword = searchbox.value;

    const url = "https://www.alamy.com/search-api/search/?qt="+keyword+"&sortBy=relevant&ispartial=true&langcode=en&isbot=false&type=picture&geo=IN&pn="+page+"&ps=12&nasty=0&editorial=1&rmuid=679DC99B-7E9E-46C8-A6F3-594E3FDEEF06&translate=true&sessionid=679DC99B-7E9E-46C8-A6F3-594E3FDEEF06"
    
    const response = await fetch(url);

    if (page === 1)
    {
        searchresult.innerHTML ="";
    }

    const data = await response.json();

    // console.log(data);

    const results = data.items;
    results.map((result)=>{
        if(result.license == lisence.value || lisence.value == "default" && samePseudoCount.value == "" || samePseudoCount.value == result.samePseudoCount){
            const image = document.createElement("img"); 
            image.src = result.renditions.thumb.href;
            
            const text =document.createElement("p");
            text.value=result.pseudo.name;
            document.getElementsByTagName("p").innerHTML=text;
            // image.appendChild(text);
            
            const imageLink = document.createElement("a");
            imageLink.href = result.uri;
            imageLink.target="_blank";
            imageLink.appendChild(image);

            searchresult.appendChild(imageLink);
        }       
    })
    show_more.style.display = "block";
}


searchform.addEventListener("submit", (e)=>{
    e.preventDefault();
    searchImage();
});

show_more.addEventListener("click",() =>{
    page++;
    searchImage();
})
