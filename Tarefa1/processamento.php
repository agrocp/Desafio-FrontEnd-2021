<?php
        $url = "https://viacep.com.br/ws/" . $_POST['cep'] . "/" . "json/";
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $resultado = json_decode(curl_exec($ch));
        var_dump($url);

        session_start();
        $_SESSION['cidade'] = $resultado->localidade;
        $_SESSION['estado'] = $resultado->uf;
        $_SESSION['bairro'] = $resultado->bairro;
        $_SESSION['rua'] = $resultado->logradouro;
        
        header('location: view/index.php' )
        
?>