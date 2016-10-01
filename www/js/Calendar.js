var dd;
var mm;
var yyyy;
var dateWeek;
var theDay;
var today = new Date();

var calendar = {
    // Application Constructor

    dateTitle: function(){
        
        dd = today.getDate();
        mm = today.getMonth()+1; //January is 0!
        yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 

        var thisDay = dd+'/'+mm+'/'+yyyy;

        theDay = yyyy+'-'+mm+'-'+dd;

        document.getElementById("titlePage").innerHTML = thisDay;  

              
    },

    getXDomainRequest: function() {
        var xdr = null;
        if (window.XDomainRequest) {
                xdr = new XDomainRequest(); 
        } else if (window.XMLHttpRequest) {
                xdr = new XMLHttpRequest(); 
        } else {
                alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
        }
        return xdr;        
    },

    getXml: function(){

        var xdr = this.getXDomainRequest();

        xdr.onload = function(){
            dateWeek = new Object(JSON.parse(xdr.responseText));
            var key;
            var pushData = "";
            for( key in dateWeek ){
                if ( dateWeek[key]['DAYSTART'] == theDay ) {
                    var Tstart = dateWeek[key]['TIMESTART'];
                    Tstart = Tstart.split(':');
                    var pxStart = parseInt(Tstart[0])*60;
                    pxStart = pxStart + parseInt(Tstart[1]);
                    // top : pxStart
                    var Tend = dateWeek[key]['TIMEEND'];
                    Tend = Tend.split(':');
                    var pxEnd = parseInt(Tend[0])*60;
                    pxEnd = pxEnd + parseInt(Tend[1]);
                    pxHeight = pxEnd - pxStart;
                    // height : pxHeight
                    pxStart = pxStart - 420;

                    //LOCATION
                    var dataLoc = '<span>' + dateWeek[key]['LOCATION'] + '</span>';
                    //SUMMARY
                    var dataSum = '<span>' + dateWeek[key]['SUMMARY'] + '</span>';
                    //HORAIRE
                    var dataHoraire = '<span>' + dateWeek[key]['TIMESTART'] + ' - ' + dateWeek[key]['TIMEEND'] + '</span>'

                    pushData += '<div class="event" style="top:'+pxStart+'px; height:'+pxHeight+'px;" >' + dataSum + dataLoc + dataHoraire + '</div>';

                }
            }
            console.log( pushData );
            document.getElementById('dayEvent').innerHTML = pushData;
        }
        /*xdr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {


                this.getDayEvent();          
            }
        }*/
        xdr.open("GET","http://webart.ovh/upCalendarXml.php");
        xdr.send();

    },

    pushDate: function(){
        var key;
        var pushData = "";
        for( key in dateWeek ){
            if ( dateWeek[key]['DAYSTART'] == theDay ) {
                var Tstart = dateWeek[key]['TIMESTART'];
                Tstart = Tstart.split(':');
                var pxStart = parseInt(Tstart[0])*60;
                pxStart = pxStart + parseInt(Tstart[1]);
                // top : pxStart
                var Tend = dateWeek[key]['TIMEEND'];
                Tend = Tend.split(':');
                var pxEnd = parseInt(Tend[0])*60;
                pxEnd = pxEnd + parseInt(Tend[1]);
                pxHeight = pxEnd - pxStart;
                // height : pxHeight
                pxStart = pxStart - 420;

                //LOCATION
                var dataLoc = '<span>' + dateWeek[key]['LOCATION'] + '</span>';
                //SUMMARY
                var dataSum = '<span>' + dateWeek[key]['SUMMARY'] + '</span>';
                //HORAIRE
                var dataHoraire = '<span>' + dateWeek[key]['TIMESTART'] + ' - ' + dateWeek[key]['TIMEEND'] + '</span>'

                pushData += '<div class="event" style="top:'+pxStart+'px; height:'+pxHeight+'px;" >' + dataSum + dataLoc + dataHoraire + '</div>';

            }
        }

        console.log( pushData );
        document.getElementById('dayEvent').innerHTML = pushData;
    },

    nextDay: function(){
        today.setDate( today.getDate() + 1 );
        this.dateTitle();
        this.pushDate();
    },

    prevDay: function(){
        today.setDate( today.getDate() - 1 );
        this.dateTitle();
        this.pushDate();
    }
    
};