async function buscarClimaInteligente() {
    
    let cidade = "Jaboatão dos Guararapes";
    let estado = "PE";
    let lat = -8.11;
    let lon = -34.92;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const respostaGeolocalizacao = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (respostaGeolocalizacao.ok) {
            const dadosLocal = await respostaGeolocalizacao.json();
            
            if (dadosLocal.city && dadosLocal.latitude) {
                cidade = dadosLocal.city;
                estado = dadosLocal.region_code;
                lat = dadosLocal.latitude;
                lon = dadosLocal.longitude;
            }
        }
    } catch (erro) {
        
        console.log("Geolocalização dinâmica bloqueada ou lenta. Usando cidade padrão.");
    }

    try {
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const respostaClima = await fetch(urlClima);
        const dadosClima = await respostaClima.json();
        
        const temperatura = dadosClima.current_weather.temperature;
        
        document.getElementById('texto-clima').innerHTML = `📍 <b>${cidade}/${estado}:</b> ${temperatura}°C (Atualizado em tempo real)`;
        
    } catch (erroClima) {
        document.getElementById('texto-clima').innerText = "Não foi possível carregar os dados do clima.";
        console.error("Erro na API de clima:", erroClima);
    }
}


buscarClimaInteligente();