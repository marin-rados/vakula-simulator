const cityForm = document.querySelector('form');
const card = document.querySelector('.weather');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const { cityDetails, weather } = data;

    details.innerHTML = `
    <h5>${cityDetails.EnglishName}</h5>
    <h4>${weather.WeatherText}</h4>
    <div>
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    const iconSrc = `/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc); 

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    if(card.classList.contains('hide')) {
        card.classList.remove('hide');
    }
};

const updateCity = async (city) => {
    
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails,
        weather
    };
} 

cityForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city).then(data => updateUI(data)).catch(err => console.log(err));
});
