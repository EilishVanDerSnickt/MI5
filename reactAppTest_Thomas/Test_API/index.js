
var ourRequest = new XMLHttpRequest();
var anotherRequest = new XMLHttpRequest();
var characterRequest = new XMLHttpRequest();
var api = document.getElementById('api');
var charatcters = new Array;
var animeId;


ourRequest.open('GET', 'https://kitsu.io/api/edge/anime?filter[text]=one%20punch');

ourRequest.onload = function () {
    var ourData = JSON.parse(ourRequest.responseText);
    //SchrijfLijst(ourData);
    console.log(ourData);
    animeId = ourData.data[0].id;
    $('#api').append('<h3>'+ ourData.data[0].attributes.canonicalTitle +': </h3>');
    AnotherRequest(ourData.data[0].relationships.characters.links.related);
};
ourRequest.send();

function AnotherRequest(link) {
    anotherRequest.open('GET', link);

    anotherRequest.onload = () => {
        var anotherData = JSON.parse(anotherRequest.responseText);
        console.log(anotherData.data.length)
        var length = anotherData.data.length;
        var array = new Array;
        
        for (var i = 0; i < length; i++) {
            array[i] = anotherData.data[i].id
        }
        
        ShowCharacters(array);
    }
    anotherRequest.send();
}

function ShowCharacters(array) {
    console.log(array);

    for (var i = 0; i < array.length; i++) {
        fetch('https://kitsu.io/api/edge/media-characters/' + array[i] + "/character")
        .then(response => {
         if(response.ok) return response.json();
        throw new Error(response.statusText)  // throw an error if there's something wrong with the response
        })
        .then(function handleData(data) {
            console.log(data.data.attributes.name);
            $('#api').append('<p>'+ data.data.attributes.name +'</p>');
        })
        
    }
    
}


/* function SchrijfLijst(data) {
    var TeSchrijvenHTML = "";
    var berekendeBtw = parseInt(data.rates.standaard) * 100;


    htmlString += "xd"
}
api.insertAdjacentHTML('beforeend', htmlString); */