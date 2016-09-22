var dd;
var mm;
var yyyy;
var dateWeek;
var theDay;


var calendar = {
    // Application Constructor

    dateTitle: function(){
        var today = new Date();
        dd = today.getDate();
        mm = today.getMonth()+1; //January is 0!
        yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 
        if(mm<10) {
            mm='0'+mm
        } 

        today = dd+'/'+mm+'/'+yyyy;
        theDay = yyyy+'-'+mm+'-'+dd;

        document.getElementById("titlePage").innerHTML = today;  

              
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
            console.log( dateWeek );
            var key;
            var pushData;
            for( key in dateWeek ){
                if ( dateWeek[key]['DAYSTART'] == theDay ) {
                    var Tstart = dateWeek[key]['TIMESTART'];
                    Tstart = Tstart.split(':');
                   // console.log( pxStart+'px' );
                    var pxStart = parseInt(Tstart[0])*60;
                    pxStart = pxStart + parseInt(Tstart[1]);
                    // top : pxStart
                    console.log( pxStart+'px' );
                    var Tend = dateWeek[key]['TIMEEND'];
                    Tend = Tend.split(':');
                    var pxEnd = parseInt(Tend[0])*60;
                    pxEnd = pxEnd + parseInt(Tend[1]);
                    pxHeight = pxEnd - pxStart;
                    // height : pxHeight
                    console.log( 'height : ' +pxHeight+'px' );
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

            var divCalendar = document.getElementById('theCalendar');
            divCalendar.innerHTML = divCalendar.innerHTML + pushData;
        }
        /*xdr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {


                this.getDayEvent();          
            }
        }*/
        xdr.open("GET","http://webart.ovh/upCalendarXml.php");
        xdr.send();

    }
/*
    getDayEvent: function(){
        console.log('yes');
        
        var nb = dateWeek.length;
        console.log( "nb" );
    }*/

    
};