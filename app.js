window.addEventListener("load", (e) =>{
    let usersInfo = document.getElementById("users-info");
    let searchBtn = document.getElementById("form-submit");
    let nameInput = document.getElementById("users-name");
    let cityInput = document.getElementById("users-city");
    let weatherCondition = document.getElementById("weather-info");
    let mainContainer = document.getElementById('main-container');
    let completeInfo = document.getElementById("users-info-div")
    let API = "fa7e205194c365fce4763aeca30c0d06";
    let limit = 1;

    let weatherText = document.querySelector(".weather-text")
    let tempText = document.querySelector(".temperature")

    // weatherText.remove()
    // tempText.remove()
    async function locationFinder(city) {
     try {
            if (city) {
              const locationAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API}`;
              const response = await fetch(locationAPI);
              const locationOutput = await response.json();

              
                    if (locationOutput.length != 0) {
                        const countryAPI = `https://restcountries.com/v3.1/alpha/${locationOutput[0].country}`;
                        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${locationOutput[0].lat}&lon=${locationOutput[0].lon}&appid=${API}`;
                        const result = await Promise.all([
                            fetch(countryAPI),
                            fetch(weatherAPI)
                        ]);
                        const resultPromises = result.map((result) => result.json());
                        finalData = await Promise.all(resultPromises);
                        return finalData;
                    }else {
                        return 0;
                    }
                    
            }else {
                return 0;
            }
            
    
        } catch (error) {
        console.error(error)
        }
    console.log(locationFinder(lagos))
    };
    

    function convertedTemp (K) {
        const C = K - 273.15;
        return C.toFixed(2);
    };



    usersInfo.addEventListener("submit", (x) => {
        x.preventDefault();
        searchBtn.remove();
        // tempText.add();
        // weatherText.add();


        locationFinder(cityInput.value).then ((completeData) =>{
            if (completeData === 0 && !nameInput.value) {
                alert ('Kindly enter your name');

                usersInfo.append(searchBtn);
            }else if (!nameInput.value && cityInput.value) {

                alert("Kindly enter your name or nickname");
                usersInfo.append(searchBtn);
            }       
            else if (!cityInput.value && nameInput.value) {
                alert("Please enter a city");
                usersInfo.append(searchBtn);
            }
            else if (completeData != 0) {
                completeInfo.remove();
                console.log(completeData)  
                let greetings = document.querySelector(".greetings") 
                let userDate =  document.querySelector(".date")
                let userCity = document.querySelector(".city")
                let weatherText = document.querySelector(".weather-text")
                let weather1 = document.querySelector(".weather-condition1")
                let weather2 = document.querySelector(".weather-condition2")
                let temperature = document.querySelector(".current-temperature")
                let countryInfo = document.querySelector(".country-info")

                let dates = new Date()

                greetings.textContent= `Hi! ${nameInput.value},`
                userDate.textContent = `The time is ${dates.getHours()}:${dates.getMinutes()} at your current location.`
                userCity.textContent = `${completeData[1].name}, ${completeData[0][0].name.common}. `
                weather1.textContent = `${completeData[1].weather[0].main}`
                weather2.textContent = `${completeData[1].weather[0].description}`
                temperature.textContent = `${convertedTemp(completeData[1].main.temp)} °C`
                countryInfo.textContent = `${completeData[0][0].name.common} is a country in ${completeData[0][0].region}, with a Capital city called ${completeData[0][0].capital[0]}.`

                

                greetings.style.color ="green"
                greetings.style.padding ="10px"
                userDate.style.padding ="10px"
                userDate.style.backgroundColor ="rgb(225, 245, 238)"
                userDate.style.color ="black"
                userDate.style.fontSize ="30px"
                weatherText.style.padding ="10px"
                weatherText.style.backgroundColor ="rgb(32, 78, 63)"
                weatherText.style.color ="white"
                weatherText.style.fontWeight ="10px"
                weatherText.style.fontSize ="25px"
                userCity.style.padding ="10px"
                userCity.style.backgroundColor ="green"
                userCity.style.fontSize ="30px"
                userCity.style.fontWeight ="20px"
                userCity.style.color ="white"
                weather1.style.padding ="10px"
                weather1.style.backgroundColor ="rgb(32, 78, 63)"
                weather1.style.color ="white"
                weather1.style.fontSize ="40px"
                weather2.style.fontSize ="15px"
                weather2.style.backgroundColor ="rgb(225, 245, 238)"
                temperature.style.padding ="10px"
                temperature.style.backgroundColor ="green"
                temperature.style.color ="white"
                temperature.style.fontWeight ="30px"
                countryInfo.style.fontWeight ="20px"
                countryInfo.style.fontSize ="30px"
                countryInfo.style.backgroundColor ="rgb(32, 78, 63)"
                countryInfo.style.color ="white"

            }

        }) 
    })

});