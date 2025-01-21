<?



function db_connection($query){
    $dbc = mysqli_connect("localhost", "root", "", "TourAgent") or fail("Cloud not connected to database");
    return mysqli_query($dbc, $query);

}

function success($message){
    die(json_encode(array('status'=> 'success', 'message' => $message)));
} 

function fail($message){
    die(json_encode(array('status'=> 'fail', 'message' => $message)));
}


    if(isset($_POST['countryval']) && !empty($_POST['countryval'])){
        $query = "insert into country (name) value ('{$_POST['countryval']}')";
        $result = db_connection($query);
        if($result){
            success("Країна додана");
        }  else {
            fail("Країна не добавлена");
        }

    }


    if(isset($_GET['mode']) && !empty($_GET['mode']) && $_GET['mode'] == "out_country"){
        $query = "SELECT id, name FROM country";
        $result = db_connection($query);
        if($result){
            $country = array();
            while($next = mysqli_fetch_array($result, MYSQLI_ASSOC)){
                $country[] = array(
                    "id"=>$next['id'],
                    "name"=>$next['name']
                );

            }
            echo json_encode(array('country' => $country));
            exit;
        }
        /////////// доробити дз
    }
//////////////////////////////////////////
                    //CITY
//////////////////////////////////////////



    if(isset($_POST['id_country'], $_POST['name_city']) && !empty($_POST['name_city'])){
        $query = "insert into city (name,id_country) values ('{$_POST['name_city']}', '{$_POST['id_country']}')";
        $result = db_connection($query);
        if($result){
            success("Місто додане");
        } else {
            fail("Місто не додане!");
            
        }
    }

    if(isset($_GET['mode']) && $_GET['mode'] == 'out_city' && isset($_GET['country_id']) && !empty($_GET['country_id'])){
        $country_id = $_GET['country_id'];  
        $query = "select id, name from city where id_country = '$country_id'";
       // fail("$query");
        $result = db_connection($query);
        if($result){
            $city = array();
            while($next = mysqli_fetch_array($result, MYSQL_ASSOC)){
                $city[] = array(
                    "id" => $next['id'],
                    "name" => $next['name']
                );
            }

            if(count( $city) > 0){
                echo json_encode(array("city" => $city));
                exit;
            } else {
                fail(" не обране");
            } 
            
        } 
        
    }

    if(isset($_POST['id_country'], $_POST['id_city'], $_POST['name_hotel'], $_POST['stars']) && !empty($_POST['id_country']) && !empty($_POST['id_city']) && !empty($_POST['name_hotel']) && !empty($_POST['stars'])){
        $query = "insert into hotel (name, id_city, star) values ('{$_POST['name_hotel']}', '{$_POST['id_city']}', '{$_POST['stars']}')";
        
        $result = db_connection($query);
        if($result){
            success("дані отримали");
            exit;

        } else {
            fail("fail дані не отримали");
        }
    }

    


















?>