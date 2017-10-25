// SCRIPT PRA CHAMAR E CENTRALIZAR POPUPS

function popup( pagina, nome, w , h, scroll ) {
    var win = null;
    LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
    TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
    if( document.documentMode > 9 || document.documentMode === undefined ) {
        settings = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
        win = window.open( pagina, nome, settings);
    } else {
        window.showModalDialog(pagina,0,'help:no;Status:NO;dialogWidth:'+w+'px;dialogHeight:'+h+'px;dialogTop:'+TopPosition+'px;dialogLeft:'+LeftPosition+'px');
    }
    return win;
    // NO CLICK COLOCAR POR EXEMPLO O CÓDIGO ABAIXO
    // popup("linkPagina",'nomeJanela','450','450','yes')
}

function preparaTipoDeBrowser(){
  var document_mode = document.documentMode;

  if ( document_mode === 8 ) {

    $("html").addClass("ie8");
    //IE 8 NÃO SUPORTA A PROPRIEDADE DO CLASS ALTERNATING-COLOR, PRA ESSE CASO FAÇO VIA JQUERY
    // verifica se o class está sendo usado
    if( $("div.list.alternating-color").length > 0 ) {
      $("div.list.alternating-color div table > tbody > tr:nth-child(2n+2)").css("backgroundColor", "#CFDBE7");
    }

  }

  if ( document_mode > 8 ) {
    $("html").addClass("ie"+document.documentMode);
  }

  // SCRIPT QUE CRIA UM TH NO FINAL DA THEAD PRA CORRIGIR O ESPAÇO OCUPADO PELO SCROLL DO TBODY
  if ( document_mode >= 8 ) {
    // verifica se a tag th existe no html
    if( $("th").length > 0 ) {
      $('<th style="padding: 8px"></th>').insertAfter("div.list thead th:last-child");
    }
  }

  if( document.documentMode === undefined ) {
    $('<th style="padding: 8px"></th>').insertAfter("div.list thead th:last-child");
  }

  // MOSTRA O HTML APÓS O MESMO SER CARREGADO
  $("html").css("visibility", "visible");

  // Dï¿½ CLICK NA ABA PRA FICAR SELECIONADO E ATIVAR O CONTEï¿½DO CORRESPONDENTE
  // verifica se o class .tabs existe no html
  if( $("ul.tabs").length > 0 ) {
    $('ul.tabs > li:first-child > a').click();
  }

  // alert( document_mode );
}

function clickAbas(){
    if( $(this).parent().parent().attr("id") === undefined ) {
        alert( "A tag UL onde está a class 'tabs' precisa ter um id pra fazer o controle dos clicks das abas");
    } else {
        // PEGA A O ID DA TABS PRA FAZER O CONTROLE DAS ABAS
        var tabs_atual = "#"+$(this).parent().parent().attr("id");
        $(tabs_atual+" > li > a").each(function() {

            if( $(this).attr("disabled") != "disabled" ) {
                // REMOVE A CLASS TAB-ACTIVE DA TAG 'A' DO .TABS ATUAL
                $(this).removeClass("tab-active");
            }
            // PROCURA OS DATA-TARGET DA TAG A PRA DAR HIDE NAS DIVS
            var div_conteudo_abas = "#"+$(this).attr("data-target");
            $(div_conteudo_abas).hide();
        });

        if( $(this).attr("disabled") != "disabled" ) {
          // ATIVA A ABA CLICADA
          $(this).addClass("tab-active");
        }
        // MOSTRA O CONTEUDO DA ABA CLICADA
        div_conteudo_abas = "#"+$(this).attr("data-target");
        $(div_conteudo_abas).show();
    }


}

function iniciaTreeView(){
    // SCRIPT DA TREEVIEW
    $('<button type="button" class="open">-</button>').insertBefore('.treeview li > *:first-child');
    $('.treeview ul').find('button.open:last').remove();
    $(".treeview button").click(function () {
        var class_button_clicked = "";
        class_button_clicked = $(this).attr("class")
        if (class_button_clicked === "close") {
            $(this).html("-");
            $(this).removeClass("close");
            $(this).addClass("open");
            $($(this).parent()).removeClass("hide-elements");
            $($(this).parent()).addClass("show-elements");
        }
        if (class_button_clicked === "open") {
            $(this).html("+");
            $(this).removeClass("open");
            $(this).addClass("close");
            $($(this).parent()).removeClass("show-elements");
            $($(this).parent()).addClass("hide-elements");
        }
    });
}

$(function () {
    $(".tabs a").click(clickAbas);
    preparaTipoDeBrowser();    

    // ADICIONADO EM 29/05/2017
    // SCRIPT PRA VER SE EXISTE ID NA DIV DO THEAD E TBODY NA LISTA QUANDO SE TEM A CLASSE .scroll-horizontal PRA FAZER O CONTROLE DO SCROLL HORIZONTAL) );
    $(".list.scroll-horizontal").each( function() {
      
      if( ($(".list.scroll-horizontal > div:first-child").attr("id") === undefined) && ($(".list.scroll-horizontal > div:first-child + div").attr("id") === undefined) ) {

        alert( " A div do thead e a div do tbody precisa ter um id pro scroll horizontal conseguir arrastar o div do thead");

      } else if( $(".list.scroll-horizontal > div:first-child").attr("id") === undefined ) {

        alert( " A div do thead precisa ter um id pro scroll horizontal conseguir arrastar o div do thead");

      } else if( $(".list.scroll-horizontal > div:first-child + div").attr("id") === undefined ) {

        alert( " A div do tbody precisa ter um id pro scroll horizontal conseguir arrastar o div do thead");

      } else {

          var id_div_thead = $(".list.scroll-horizontal > div:first-child").attr("id");

          var id_div_tbody = $(".list.scroll-horizontal > div:first-child + div").attr("id");

          document.getElementById(id_div_tbody).onscroll = function() {

          document.getElementById(id_div_thead).scrollLeft = this.scrollLeft;

          }
        }
    }); 

});
