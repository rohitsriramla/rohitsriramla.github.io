
var id;

var decode = function ( text ) {
    text = text.replace(/\+/g, " ");
    text = text.replace(/%[a-fA-F0-9]{2}/g, 
        function ( text ) {
            return String.fromCharCode( "0x" + text.substr(1,2));
        }
    );
    return text;
}
    
var display_data = function () {
    var query = location.search.replace("?", "");
    if ( query == "" ) return;
    
    var fields = query.split("&");
    
    if ( fields.length == 0 ) {
        document.write("<p>No data was submitted.</p>");
    } else {
        document.write("<dl>");
        var field_parts;
        for ( var i in fields ) {
            field_parts = fields[i].split("=");
            field_parts[0] = decode( field_parts[0] );
            field_parts[1] = decode( field_parts[1] );
            id = field_parts[0];
            document.write("<img src=https://img.seadn.io/files/" + field_parts[1] + ".png>");

            document.write("Hi I am your S7NS Station Character");
        }
        document.write("</dl>");
        
        var name = 'data/'+ id +'.json'
        fetch(name)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
    }
}



    function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
            var htmlString = "<ul>";
            for(var j=0;j<data[i].attributes.length;j++){
                htmlString += "<li>" + data[i].attributes[j].trait_type + ": <b>" +data[i].attributes[j].value +"</b></li>"
            }
            htmlString += "</ul>";
        div.innerHTML = "<h3>" +'Name: ' + data[i].name + "</h3>" + htmlString;
        mainContainer.appendChild(div);
    }
    }


