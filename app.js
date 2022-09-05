let getWeatherReport = () => {

    const iCity = document.querySelector("#iCity").value;

    // let day = 4;
    // let dt = "2022-08-28";
    // let end_dt = "2022-08-31"

    // axios.get(`https://api.weatherapi.com/v1/forecast.json?key=1148694ef40c4addba8201236223006&q=${iCity}&days=${day}`)
    //     //&dt=${dt}&end_dt=${end_dt}
    //     .then(function (response) {
    //         console.log("forcast data", response.data);

    axios.get(`https:api.openweathermap.org/data/2.5/forecast?q=${iCity}&appid=d797e297efc03331a32830ecf856e4ea&units=metric`)
        //&dt=${dt}&end_dt=${end_dt}
        .then(function (response) {
            let data = response.data;
            console.log("forcast data", data);




            let all5Days = [];
            let dateOfWeather;
            let counter = -1;

            // let body = document
            data.list.map(every3Hour => {
                let newDateOfWeather = new Date(every3Hour.dt_txt).getDate();
                console.log("newDateOfWeather :", newDateOfWeather);

                if (dateOfWeather != newDateOfWeather) {
                    counter++;
                    dateOfWeather = newDateOfWeather;
                }
                if (!all5Days[counter]) {
                    all5Days[counter] = [];
                }
                all5Days[counter].push(every3Hour);
                // console.log("every3Hour : " , every3Hour);
            })

            // console.log("all5Days :" , all5Days);

            ////-------------------------------------------------------------------------------------



            let dataOfDays = all5Days.map((eachDay) => {


                console.log("eachDay:", eachDay);

                return eachDay.reduce((previousEvery3Hour, currentEvery3Hour) => {

                    // console.log(
                    //     previousEachHour.main.temp,
                    //     currentEachHour.main.temp
                    // )

                    let sumOfAvgTemp = Number(previousEvery3Hour.main.temp) + Number(currentEvery3Hour.main.temp)
                    let sumOfMinTemp = Number(previousEvery3Hour.main.temp_min) + Number(currentEvery3Hour.main.temp_min)
                    let sumOfMaxTemp = Number(previousEvery3Hour.main.temp_max) + Number(currentEvery3Hour.main.temp_max)

                    console.log();
                    console.log();
                    console.log();

                    return {
                        main: {
                            temp: sumOfAvgTemp,
                            temp_min: sumOfMinTemp,
                            temp_max: sumOfMaxTemp,
                        },
                        dt_txt: currentEvery3Hour.dt_txt,
                        length: eachDay.length ,
                        weather: [{
                            icon: currentEvery3Hour.weather[0].icon,
                            description: currentEvery3Hour.weather[0].description,
                        }],


                    }
                }, {
                    main: {
                        temp: 0,
                        temp_min: 0,
                        temp_max: 0,
                    }
                })
            })
            console.log("dataOfDays: ", dataOfDays);
            /////-----------------------------------------------------------------



            // creating elements =======================================================================================

            let mainDiv = document.querySelector("#main");
            mainDiv.innerHTML = "" ;
            //========================================================================

           
            dataOfDays.map(eachDay => {

                console.log("eachDay" , eachDay);
                let forcastMainSlider = document.querySelector("#forcastMainSlider");
               
                let forcastDiv = document.createElement("div");
                forcastDiv.setAttribute("class" , "forcastDiv");
                
                let forcastDay = document.createElement("div");
                forcastDay.setAttribute("class" , "forcastDay");
                let forcastDayTxt = document.createTextNode(`Sat`);
                forcastDay.appendChild(forcastDayTxt);
                
                let forcastTemp = document.createElement("div");
                forcastTemp.setAttribute("class" , "forcastTemp");
                let forcastTempTxt = document.createTextNode(`${Math.round(eachDay.main.temp / eachDay.length)}°C`);
                forcastTemp.appendChild(forcastTempTxt);
                
                let forcastMinTemp = document.createElement("div");
                forcastMinTemp.setAttribute("class" , "forcastMinTemp");
                let forcastMinTempTxt = document.createTextNode(`Min : ${Math.round(eachDay.main.temp_min / eachDay.length)}°C`);
                forcastMinTemp.appendChild(forcastMinTempTxt);
                
                let forcastMaxTemp = document.createElement("div");
                forcastMaxTemp.setAttribute("class" , "forcastMaxTemp");
                let forcastMaxTempTxt = document.createTextNode(`Max :  ${Math.round(eachDay.main.temp_max / eachDay.length)}°C`);
                forcastMaxTemp.appendChild(forcastMaxTempTxt);
                
                let forcastPrecep = document.createElement("div");
                forcastPrecep.setAttribute("class" , "forcastPrecep");
                let forcastPrecepTxt = document.createTextNode(`Precepitation : 10%`);
                forcastPrecep.appendChild(forcastPrecepTxt);

                
                forcastDiv.appendChild(forcastDay);
                forcastDiv.appendChild(forcastTemp);
                forcastDiv.appendChild(forcastMinTemp);
                forcastDiv.appendChild(forcastMaxTemp);
                forcastDiv.appendChild(forcastPrecep);


                forcastMainSlider.appendChild(forcastDiv);
                
                
            } )


            //========================================================================

            let currentDay = document.createElement("div");
            currentDay.setAttribute("id" , "currentDay");
            let currentDayTxt = document.createTextNode(`currentDay`);
            currentDay.appendChild(currentDayTxt);
            mainDiv.appendChild(currentDay);

            let iconDiv = document.createElement("div");
            iconDiv.setAttribute("id", "iconDiv");

            let icon = document.createElement("div");
            icon.setAttribute("id", "icon");
            let img = document.createElement("img");
            img.setAttribute("id", "wIcon");
            img.setAttribute("src", "./download.png");
            icon.appendChild(img);

            iconDiv.appendChild(icon);
            // iconDiv.appendChild(img);

            let temp = document.createElement("div");
            temp.setAttribute("id", "temp");
            let tempTxt = document.createTextNode("27°C");
            temp.appendChild(tempTxt);

            iconDiv.appendChild(icon);
            iconDiv.appendChild(temp);

            mainDiv.appendChild(iconDiv);

            //====================================================================

            let weathType = document.createElement("div");
            weathType.setAttribute("id", "weathType");

            let weathTypeTxt = document.createTextNode("Partly Cloudy");
            weathType.appendChild(weathTypeTxt);

            mainDiv.appendChild(weathType);


            //====================================================================

            let nameDiv = document.createElement("div");
            nameDiv.setAttribute("id", "name");

            let cityName = document.createElement("div");
            cityName.setAttribute("id", "cityName");
            let cityNameTxt = document.createTextNode("Karachi");
            cityName.appendChild(cityNameTxt);


            let countryName = document.createElement("div");
            countryName.setAttribute("id", "countryName");
            let countryNameTxt = document.createTextNode("Pakistan");
            countryName.appendChild(countryNameTxt);

            nameDiv.appendChild(cityName);
            nameDiv.appendChild(countryName);

            mainDiv.appendChild(nameDiv);


            //====================================================================

            let details = document.createElement("div");
            details.setAttribute("id", "details");

            //=============================================

            let div1 = document.createElement("div");
            div1.setAttribute("id", "div1");

            let precipitations = document.createElement("div");
            precipitations.setAttribute("id", "precipitations");
            let precipitationsTxt = document.createTextNode(" Precipitation : 0.1%");
            precipitations.appendChild(precipitationsTxt);

            let humidity = document.createElement("div");
            humidity.setAttribute("id", "humidity");
            let humidityTxt = document.createTextNode("Humidity : 10%");
            humidity.appendChild(humidityTxt);

            div1.appendChild(precipitations);
            div1.appendChild(humidity);



            //=============================================

            let div2 = document.createElement("div");
            div2.setAttribute("id", "div2");

            let wind = document.createElement("div");
            wind.setAttribute("id", "wind");
            let windTxt = document.createTextNode("Wind : 50");
            wind.appendChild(windTxt);

            let visibility = document.createElement("div");
            visibility.setAttribute("id", "visibility");
            let visibilityTxt = document.createTextNode("Visibility : 50");
            visibility.appendChild(visibilityTxt);

            div2.appendChild(wind);
            div2.appendChild(visibility);

            //=============================================

            details.appendChild(div1);
            details.appendChild(div2);

            mainDiv.appendChild(details);


            //====================================================================

            let maxTemp = document.createElement("div");
            maxTemp.setAttribute("id", "maxTemp");
            let maxTempTxt = document.createTextNode("Max : 29°C");
            maxTemp.appendChild(maxTempTxt);

            mainDiv.appendChild(maxTemp);

            //====================================================================

            let minTemp = document.createElement("div");
            minTemp.setAttribute("id", "minTemp");
            let minTempTxt = document.createTextNode("Min : 25°C");
            minTemp.appendChild(minTempTxt);

            mainDiv.appendChild(minTemp);

            //====================================================================


            // mainDiv.appendChild(iconDiv)


        })

    // .catch(function (error) {
    //     // handle error
    //     console.log(error);
    // })

}

































































// let API_KEY = "d797e297efc03331a32830ecf856e4ea"