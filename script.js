const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
console.log("js connected");
console.log(cityInput);
console.log(searchBtn);

function getWeather(city){
    console.log("Getting weather for : ", city);
}

searchBtn.addEventListener("click", ()=>{
    const city = cityInput.value.trim()

    if(city=== ""){
        alert("Please enter your city name ");
        return;
    }
     
    getWeather(city);
});

const person = {
    name:"kirti",
    work: "Fronted Developer",
    Degree: "graduated"

}