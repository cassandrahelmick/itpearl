("#myform").validate({
    
});

function calculate(){
    "use strict"
    let form = $("#myform");


     if (form.valid()){

        let Fromvalue = document.getElementById("fromvalue").value;
        let Fromunit = "";

    
        if (document.getElementById("fromcentimenters").checked){
            Fromunit = "cm";
        }
            else if (document.getElementById("frommmeters").checked){
                Fromunit = "m";
        }
        
            else if (document.getElementById("fromkilometers").checked){
                Fromunit = "km";
        }

            else if (document.getElementById("frominches").checked){
                Fromunit = "in";
        }

            else if (document.getElementById("fromfeet").checked){
                Fromunit = "ft";
        }
            else if (document.getElementById("fromyards").checked){
                Fromunit = "yd";
        }
            else if (document.getElementById("frommiles").checked){
                Fromunit = "mi";
        }
        
        let Tounit="";

        if (document.getElementById("tocentimenters").checked){
            Tounit = "cm";
        }
            else if (document.getElementById("tometers").checked){
                Tounit = "m";
        }

            else if (document.getElementById("tokilometers").checked){
                Tounit = "km";
        }

            else if (document.getElementById("toinches").checked){
                Tounit = "in";
        }

            else if (document.getElementById("tofeet").checked){
                Tounit = "ft";
        }
            else if (document.getElementById("toyards").checked){
                Tounit = "yd";
        }
            else if (document.getElementById("tomiles").checked){
                Tounit = "mi";
        } 
        
        ConvertUnits(Fromvalue,Fromunit, Tounit);
     }
}

        async function ConvertUnits(Fromvalue, Fromunit, Tounit){
            "use strict";
            let bruceUrl = " https://brucebauer.info/assets/ITEC3650/unitsconversion.php";
            bruceUrl= bruceUrl+ "?FromValue=" + encodeURIComponent(Fromvalue) + "&FromUnit=" + encodeURIComponent(Fromunit) + "&ToUnit=" + encodeURIComponent(Tounit);

            let response = await fetch (bruceUrl);
            let result = await response.json();

            document.getElementById("tovalue").innerHTML=result;

        }

        function clearform(){
            "use strict";
            document.getElementById("fromvalue").value="";

            document.getElementById("cm").checked = false;
            document.getElementById("m").checked = false;
            document.getElementById("km").checked = false;
            document.getElementById("in").checked = false;
            document.getElementById("ft").checked = false;
            document.getElementById("yd").checked = false;
            document.getElementById("mi").checked = false;

            document.getElementById("tocentimenters").checked = false;
            document.getElementById("tometers").checked = false;
            document.getElementById("tokilometers").checked = false; 
            document.getElementById("toinches").checked = false;
            document.getElementById("tofeet").checked = false; 
            document.getElementById("toyards").checked = false; 
            document.getElementById("tomiles").checked = false; 

            document.getElementById("tovalue").innerHTML="";



        }
    
        




        
  