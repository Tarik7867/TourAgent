$(function(){

   // out_hotel()

    show_country()
    $("#id_country").change(function(){
        show_city()
    })
   
})


$("#add_country_btn").on("click", function(){
    let valCountry = $("#add_country_inp").val()
  

    $.ajax({
        type: "POST",
        url: "TourAgent.php",
        data: {
            countryval: valCountry
        },
        dataType: "json",
        success: function(res){
            

            

            
            if(res.status == "fail"){
                alert(res.message)

            } if(res.status == "success"){
                alert(res.message)
                $("#add_country_inp").val('')
                show_country()
            }
        }
    })
    
//////////////////////////////////////// 

  
    


    


})

/////////////////////////////////
function show_country(){
   // alert(1)
    $.getJSON("TourAgent.php?mode=out_country", function (json) {
        //console.log(json.country)
        
        
        if(json.country.length>0){
            $("#id_country_one, #id_country").empty()
            $("#id_country_one, #id_country").append("<option value = '0'>Країна не обрана</option>" )
            
            $.each(json.country, function(){
                $("#id_country_one, #id_country").append("<option value = '"+ this.id +"'>" + this.name + " </option>")
                
            })
                
      } 
       

        if(json.status == "fail"){
            alert(json.message)
            }
        }
    );
}
///////////////////////////////////////////////
                        //CITY
//////////////////////////////////////////////


$("#add_city_btn").on("click", function(){
   // let valCity = $("#add_city_inp").val()
    //alert("test")
    if($("#id_country_one").val() == 0 || $("#add_city_inp").val() == "" || $("#add_city_inp").val() == false || $("#add_city_inp").val() == null){
        alert("Недостат даних для додання міста")

    } else {

        let id_country = $("#id_country_one").val()
        let name_city = $("#add_city_inp").val()

        $.post("TourAgent.php?", "id_country="+id_country+"&name_city="+name_city,
            function (result) {
                if(result.status == "fail"){
                    alert(result.message)
                } if(result.status == "success"){
                    alert(result.message)
                    $("#add_city_inp").val('')
                    
                }

            },
            "json" // обовязково вказувати 
            
        );
        
    }

    
})  
    

    function show_city(){

            /////////// ????????????????????????????? функція не визивається
        let id =  $("#id_country").val()

       // alert(id)
        
        //
        $.getJSON("TourAgent.php?mode=out_city&country_id=" + id, function(json){
           $("#id_city").empty()
      //  console.log(json)
          if(json.status == "fail"){
                alert(json.message)
            }
          //  console.log(json.city)

            //$("#id_city").empty()

            if(json.city.length>0){
                $.each(json.city, function(){
                    $("#id_city").append("<option value = '"+ this.id +"'>" + this.name + "   </option>")
                    
                })
        
            } 
            
            
        })
    

        

      
    }

    $("#select_button").on("click", function(){
        let val_country = $("#id_country").val() 
        let val_city = $("#id_city").val()
        let val_hotel = $("#name_hotel").val()
        let val_star = $("#stars").val()
        
        

        if(!val_country || !val_city ||  !val_hotel || !val_star ){
           // alert("Не обрані всі пункти")
          alert("не можлив добав інфо")  
            
        }  else {
            //alert("Країна " + val_country + " Місто " + val_city + " Готель " + val_hotel + " Зірки " + val_star)
            $.post("TourAgent.php?", "id_country=" + val_country + "&id_city=" + val_city + "&name_hotel=" + val_hotel + "&stars=" + val_star, function(result){
                if(result.status == "success"){
                    alert(json.message)
                    

                } if(result.status == "fail"){
                    alert(json.message)
                }

            })
        }
///////////// додати сезони 

    })
///////////////////////
   // одяг підкатегорії зимова і літня підкатегорії куртки футболки і світера і інші товари
    

    //////////// якщо вказана країна то виводити місто тобто визив функцію

    



    
    
    



