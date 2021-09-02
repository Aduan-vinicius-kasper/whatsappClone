class Format{

    static getCamelCase(text){
        //cria o elemento div, coloca no HTML e troca o text
        
        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"> </div>`

        return Object.keys(div.firstChild.dataset)[0];

    }; 
 
        /*falta configurar o innerHTML do tempo no mic
        apesar de colocar o let start com date.now().
   */  
         static time(duration){
        let seconds = parseInt((duration / 1000) %60 );
        let minutes = parseInt((duration / (1000 * 60 )) %60);
        let hours = parseInt((duration / (1000 * 60 *60 )) %24);

        if(hours > 0){
            return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2,"0")}`

        } else {
            return `${minutes}:${seconds.toString().padStart(2,"0")} `

        };
    }; 

}