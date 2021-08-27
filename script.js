document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

   // console.log('teste do input => ' + input);

    if(input !== ''){
        clearInfo();
        showWarning('carregando informações climáticas');
    
        let myapiKey = '461cdf299a25010b15190f89a151412c';//APIKey do Boniecky ==> d06cdb298fafc83c520d5ab677fc477e    
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${myapiKey}&units=metric&lang=pt_BR`
        let results = await fetch(url);
        let myJson = await (results.json());       
        

        if(myJson.cod === 200){
            clearInfo();
            showInfo(
                        {name: myJson.name,
                        country: myJson.sys.country,
                        temp: myJson.main.temp,
                        tempIcon: myJson.weather[0].icon,
                        tempDescricao: myJson.weather[0].description,
                        windSpeed: myJson.wind.speed,
                        windAngle: myJson.wind.deg
                    });
        } else{
                clearInfo();
                showWarning("local não encontrado");
        }
    }else{
        clearInfo();
    }   
    
    console.log(myJson);

});

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function showInfo(json){
    showWarning("");
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.tempDescricao').innerHTML = `${json.tempDescricao}`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`) ;

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

}

function clearInfo(){
    showWarning("");
    document.querySelector('.resultado').style.display = 'none';    
}