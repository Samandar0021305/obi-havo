const userInput = document.querySelector('.input');
const btn = document.getElementById('btn');
const dayName = document.querySelector('.dayName');
const dayNum = document.querySelector('.dayNum');
const monthName = document.querySelector('.monthName');
const year = document.querySelector('.year');
const showWeather = document.querySelector('.showWeather');
const myForm = document.querySelector('.myForm');
const notifContainer = document.querySelector('.notifContainer');


let date = new Date();
const years = date.getFullYear();
const month  = date.toLocaleString('default', {month: 'long'}) ;
const day   =  date.getDate();
const week = date.toLocaleString('default', {weekday: 'long'});





const api = {
    key: 'a5ccbd68de38d5a7bcc55e5d630b60e5',
    base: "https://api.openweathermap.org/data/2.5/"
}


btn.addEventListener('click', ()=>{
    let city = userInput.value;
    if(city === ''){
        createNotification();
    }else getWeather(city);
    myForm.reset();
})

userInput.addEventListener('keypress', ()=>{
    if(event.code == 'Enter'){
        let city = userInput.value;
        if(city === ''){
            createNotification();
        }else  getWeather(city); 
        myForm.reset();
    }
});


const getWeather = (city) =>{

    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(response => {
            let data = response.json();
            console.log(data);
            return data;
        }).then(data=>{
            addData(data, city);
        }).catch(err => {
            console.error(err);
        });
}

const addData = (data, city) =>{
    let temp = data.main.temp;
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;

    const item = `
    <div class="box" >
    <h2 class="cityName">${city}</h2>
    <div class="date">
        <p class="dayName">${week}</p>
        <p class="dayNum">${day}</p>
        <p class="monthName">${month}</p>
        <p class="year">${years}</p>
    </div>
    <div class="weatherDescription">
        <h1 class="celcius">${Math.round(temp)}°c</h1>
        <p class="desc">${description}</p>
    </div>
                </div>  `;
    
    const position = "beforeend";
    
    showWeather.insertAdjacentHTML(position, item);
}



function createNotification(){
    const notif = document.createElement('div');
    notif.classList.add('toast');

    notif.innerText = 'Please write the city name :)';

    notifContainer.appendChild(notif);

    setTimeout(()=>{
        notif.remove();
    }, 3500)
}








