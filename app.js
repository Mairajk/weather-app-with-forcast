let getWeatherReport = () => {

    const iCity = document.querySelector("#iCity").value;

    // let day = 4;
    // let dt = "2022-08-28";
    // let end_dt = "2022-08-31"

    // axios.get(`https://api.weatherapi.com/v1/forecast.json?key=1148694ef40c4addba8201236223006&q=${iCity}&days=${day}`)
    //     //&dt=${dt}&end_dt=${end_dt}
    //     .then(function (response) {
    //         console.log("forcast data", response.data);

    axios.get(`https:api.openweathermap.org/data/2.5/forecast?q=${iCity}&appid=d797e297efc03331a32830ecf856e4ea`)
        //&dt=${dt}&end_dt=${end_dt}
        .then(function (response) {
            let data = response.data;
            console.log("forcast data", data);




            let all5Days = [];
            let dateOfWeather;
            let counter = -1;

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

                    return {
                        main: {
                            temp: sumOfAvgTemp,
                            temp_min: sumOfMinTemp,
                            temp_max: sumOfMaxTemp,
                        },
                        dt_txt: currentEvery3Hour.dt_txt,
                        length: eachDay.length

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

            dataOfDays.map





            // creating elements 


            let iconDiv = document.createElement("div");
            iconDiv.setAttribute("id", "iconDiv");

            let icon = document.createElement("div");
            icon.setAttribute("id", "icon");

            let img = document.createElement("img");
            img.setAttribute("id", "wIcon");
            // img.setAttribute("src" , "");

            let temp = document.createElement("div");
            temp.setAttribute("id", "temp");

            //====================================================================

            let weathType = document.createElement("div");
            weathType.setAttribute("id", "weathType");

            //====================================================================

            let details = document.createElement("div");
            details.setAttribute("id", "details");

            let div1 = document.createElement("div");
            div1.setAttribute("id", "div1");

            let precipitations = document.createElement("div");
            precipitations.setAttribute("id", "precipitations");

            let humidity = document.createElement("div");
            humidity.setAttribute("id", "humidity");

            //=============================================

            let div2 = document.createElement("div");
            div2.setAttribute("id", "div2");

            let wind = document.createElement("div");
            wind.setAttribute("id", "wind");

            let visibility = document.createElement("div");
            visibility.setAttribute("id", "visibility");

            //====================================================================

            let maxTemp = document.createElement("div");
            maxTemp.setAttribute("id", "maxTemp");

            let minTemp = document.createElement("div");
            minTemp.setAttribute("id", "minTemp");





        })

    // .catch(function (error) {
    //     // handle error
    //     console.log(error);
    // })

}

































































// let API_KEY = "d797e297efc03331a32830ecf856e4ea"