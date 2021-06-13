<?php
  session_start();
  if(isset($_SESSION['cidade'])){
    $cidade = $_SESSION['cidade'];
    $estado = $_SESSION['estado'];
    $bairro = $_SESSION['bairro'];
    $rua = $_SESSION['rua'];
  }
  else{
    $cidade = "";
    $estado = "";
    $bairro = "";
    $rua = "";
  }

  unset($_SESSION['cidade']);
  unset($_SESSION['estado']);
  unset($_SESSION['bairro']);
  unset($_SESSION['rua']);
  
?>


<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <title>Desafio Front End | AgroCP</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
    <div class="formandanswer">
      <div class="l-form">
          <form action="processamento.php" class="form" method="post">
                <h2 class="form__title">Consumindo API com PHP</h2>
                <div class="form__div">
                    <input type="text" class="form__input" placeholder="" name="cep">
                    <label for="" class="form__label">CEP</label>
                </div>
                <button type="submit" class="form__button">Pesquisar</button>
            </form>
      </div>

      <?php
        if($cidade){ ?> 
          <div class="l-form" id="resultado">
            <div class="result">
              <h2 class="form__title">Resultado</h2>
                <div class="form__div">
                  <input type="text" class="form__input" placeholder="" value="<?php echo $cidade; ?>" disabled>
                  <label for="" class="form__label">Cidade</label>
                </div>
                <?php
                  if($estado){ ?> 
                      <div class="form__div">
                      <input type="text" class="form__input" placeholder="" value="<?php echo $estado; ?>" disabled>
                      <label for="" class="form__label">Estado</label>
                    </div>
                 <?php } ?>
                 <?php
                  if($bairro){ ?> 
                      <div class="form__div">
                      <input type="text" class="form__input" placeholder="" value="<?php echo $bairro; ?>" disabled>
                      <label for="" class="form__label">Bairro</label>
                    </div>
                 <?php } ?>
                 <?php
                  if($rua){ ?> 
                      <div class="form__div">
                      <input type="text" class="form__input" placeholder="" value="<?php echo $rua; ?>" disabled>
                      <label for="" class="form__label">Rua</label>
                    </div>
                 <?php } ?>
            </div>
          </div>
          <?php 
        }
      ?>
    </div>
  </body>
</html>
