// FUNÇÕES PRA IMPORTAR NO HTML

// Controle das abas
//$controllTabs();  

// ajuste da lista tabelada
//$list();

// controle do scroll horizontal da lista tabelada
//$scrollsList();

// não permite mais de um espaço em branco nos inputs
// $("input").keyup(function () { 
//      noSpaces( this );
// });

// inicializa controle dos botões de navegação das abas
// $navigationTabs();
// $(".buttons-tabs-navigation").hover(function() {
//   $navigationTabs();
// });


var document_mode;

// início var $start
var $start = function () {

  document_mode = document.documentMode;

  if ( document_mode != undefined && document_mode >= 8 ) {
    $( "html" ).addClass( "ie" + document_mode );
  } 

  if( document_mode < 8 ) {
    alert("Seu browser é o Internet Explorer "+document_mode+", essa página não irá renderizar corretamente! Se você não está usando essa página em modo de compatibilidade,atualize seu Internet Explorer pelo menos pro Internet Explorer 8");
  }

  // MOSTRA O HTML APÓS O MESMO SER CARREGADO
  $("html").css("visibility", "visible");

}
// fim var $start

// faz ajuste na lista tabelada
var $list = function() {

  // adiciona um th no final(thead) pra conpensar o espaço ocupado pelo scroll vertical no tbody
  $('<th style="padding: 7px"></th>').insertAfter("div.list thead th:last-child");

    if( document_mode === 8 ) {
      //IE 8 NÃO SUPORTA A PROPRIEDADE DO CLASS ALTERNATING-COLOR, PRA ESSE CASO FAÇO VIA JQUERY
      // verifica se o class está sendo usado
      if( $("div.list.alternating-color").length > 0 ) {
        $("div.list.alternating-color div table > tbody > tr:nth-child(2n+2)").css("backgroundColor", "#CFDBE7");
      }
    }

}

// início scroll lista(tabela)
var $scrollsList = function () {

  var id_div_list ;
  var id_div_thead;
  var id_div_tbody;

  $list();

  // SCRIPT PRA VER SE EXISTE ID NA DIV DO THEAD E TBODY NA LISTA QUANDO SE TEM A CLASSE .scroll-horizontal PRA FAZER O CONTROLE DO SCROLL HORIZONTAL) );
    $("div.list").each( function() {

      id_div_list = $(this).attr("id");
      
      if( id_div_list != undefined ) {

        id_div_list  = $(this).attr("id");
        id_div_thead = "thead_"+id_div_list ;
        id_div_tbody = "tbody_"+id_div_list;
        
        $("#"+id_div_list+"> div:first-child").attr( "id", id_div_thead );
        $("#"+id_div_list+"> div:first-child + div").attr( "id", id_div_tbody );
        
        document.getElementById(id_div_tbody).onscroll = function() {

          document.getElementById(id_div_thead).scrollLeft = this.scrollLeft;

        }

      }

    });    
    
};
// fim scroll lista(tabela)

// inicio var inicializaAbas
var $controllTabs = function() {
  
  $(".tabs > li:first-child > a").addClass("tab-active");
  
  $(".tabs a").each(function() {
    
    var div_conteudo_aba = "#"+$(this).attr("data-target");
    $(div_conteudo_aba).hide();

    if( $(this).attr("class") === "tab-active" ) {
      div_conteudo_aba = "#"+$(this).attr("data-target");
      $(div_conteudo_aba).show();
    }

  });

  $(".tabs > li > a").click( $clickTabs );
  
}
// fim var inicializaAbas

// ínicio control click tabs
var $clickTabs = function () {
    var tabs_atual;
    if( $(this).parent().parent().attr("id") === undefined ) {
        alert( "A tag UL onde está a class 'tabs' precisa ter um id pra fazer o controle dos clicks das abas");
    } else {
        // PEGA O ID DA TABS PRA FAZER O CONTROLE DAS ABAS
        tabs_atual = "#"+$(this).parent().parent().attr("id");

          if( $(this).attr("disabled") != "disabled" ) {            

            $(tabs_atual+" > li > a").each(function() {

                // REMOVE A CLASS TAB-ACTIVE DA TAG 'A' DO .TABS ATUAL
                $(this).removeClass("tab-active");

                // PROCURA OS DATA-TARGET DA TAG A PRA DAR HIDE NAS DIVS
                var div_conteudo_abas = "#"+$(this).attr("data-target");
                $(div_conteudo_abas).hide();

            });

            // ativa a aba clicada
            $(this).addClass("tab-active");

            // mostra conteudo da aba ativa
            div_conteudo_abas = "#"+$(this).attr("data-target");
            $(div_conteudo_abas).show();

          }

    }  

}
// fim control click tabs

// início popup
var popup = function ( pagina, nome, w , h, scroll ) {

  var win = null;
  var LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
  var TopPosition = (screen.height) ? (screen.height-h)/2 : 0;

   if( document.documentMode > 9 || document.documentMode === undefined ) {
        settings = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
        win = window.open( pagina, nome, settings);
   } else {
        win = window.showModalDialog(pagina,0,'help:no;Status:NO;dialogWidth:'+w+'px;dialogHeight:'+h+'px;dialogTop:'+TopPosition+'px;dialogLeft:'+LeftPosition+'px');
   }

   return win;
   // NO CLICK COLOCAR POR EXEMPLO O CÓDIGO ABAIXO
   // $popup("linkPagina",'nomeJanela','450','450','yes')

}
var $popup = popup;

// fim popup

// init controll buttons navigation tabs
var $navigationTabs = function () {

  var id_div_ul;
  var id_tag_ul;
  var width_div_tabs;
  var width_ul_tabs;
  var width_div_buttons_tabs
  // controle dos clicks dos botões
  var setTimeout_left_ul;
  // limitador do left da ul das abas
  var max_left = 0;
  // left que será usado na ul das abas
  var left_ul = 0;    
  // detecta qual botão foi clicado(left, right)
  var button_clicked;
  // pega o id da div onde está os botões de navegação
  var id_ul_tabs;
  // início (each)- distribui os id's e os data-width
  $("ul.tabs + div.buttons-tabs-navigation").each(function() {

    // adiciona um id temporário na div onde está as abas
    $(this).parent().attr("id","temporary_id");

    // verifica se a tag ul das abas existe um id
    if( $("#temporary_id > ul").attr("id") === undefined ) {

      alert("A tag ul precisa ter um id pra fazer a navegação da abas pelos botões");

    } else {

      // adiciona um class .line-tabs na div onde está o class .line
      $("#temporary_id").parent().addClass("line-tabs");
      // pega o id da tag ul
      id_tag_ul = $("#temporary_id > ul").attr("id");
      // adiciona na tag div pai um id div_ mais o id da tag ul filha
      id_div_ul = "div_"+$("#temporary_id > ul").attr("id");

      $("#temporary_id").attr("id",id_div_ul);
      // adiciona um id a div onde está os botões 
      $(this).attr( "id" , "group_buttons_navigation_" + id_tag_ul );
      // adiciona um data-target left e right nos botões de navegação
      $("#"+id_div_ul+" > ul + .buttons-tabs-navigation > button:first-child").attr("data-target","left");
      $("#"+id_div_ul+" > ul + .buttons-tabs-navigation > button:last-child").attr("data-target","right");
      $( "#" + id_tag_ul).css( "width" , "1000000%" );

    }
    // width da div que tem a ul das abas    
    width_div_tabs = $("#"+id_div_ul).width();
    $("#"+id_div_ul).attr( "data-width", width_div_tabs ); 

    // width da div onde está os botões de navegação das abas
    width_div_buttons_tabs = $( this ).width();
    // procura os li's da ul, e faz a soma da largura das li's
    width_ul_tabs = 0;
    $( "#" + id_tag_ul + " li" ).each(function() {
      width_ul_tabs =  width_ul_tabs + $(this).width();
    });

    width_ul_tabs =  width_ul_tabs + width_div_buttons_tabs;
    //inseri na tag ul o data-width que é total da soma das li's
    $("#"+id_div_ul+" > ul").attr("data-width",width_ul_tabs);
    // $("#"+id_div_ul+" > ul").css("width",width_ul_tabs+"px");
  });
  // fim (each) - distribui os id's e os data-width
      
  // início (mousedown) - navegação das abas pelos botões(setas)
  $(".buttons-tabs-navigation > button").mousedown(function() {

    // pega o id da div das tabs
    id_div_ul = $(this).parent().parent().attr("id");

    left_ul = $("#"+id_div_ul+" > ul").css("left");
    // if pro ie que por padrão resebe auto em vez de 0px
    if( left_ul === "auto") {
      left_ul = 0;
    } else {
      left_ul = left_ul.slice(0, left_ul.length - 2);
      left_ul = parseInt( left_ul );
    }
    // pega largura da div da ul das abas
    width_div_tabs = parseInt( $("#"+id_div_ul).attr("data-width") );    

    // pega a largura da ul das abas
    width_ul_tabs = parseInt( $("#"+id_div_ul+" > ul").attr("data-width") );    

    if( width_ul_tabs > width_div_tabs ) {
      max_left = "-"+(width_ul_tabs - width_div_tabs + 3);
      // max_left = max_left - $(this).parent().width();
    } 

    // pega o valor do data-target do botão clicado, pra saber se é left ou right
    button_clicked = $(this).attr("data-target");
    
    id_ul_tabs = $(this).parent().attr("id");
    // extrai o nome da div dos botões, pra achar o id da tag ul
    id_ul_tabs = "#" + id_ul_tabs.slice(25, id_ul_tabs.length );
    
    // controll button left
    function_setTimeout_left_ul();
    // início (setTimeout) - função pra colocar as abas pra esquerda ou direita
    function function_setTimeout_left_ul() {

      setTimeout_left_ul = setTimeout(function() {       
        
        if( button_clicked === "right" && left_ul > max_left ) {
         
          left_ul = left_ul-3;          

        } else if( button_clicked === "left" && left_ul < 0 ) {

          left_ul = left_ul+3;          

        }
        
        if( left_ul > 0 ) {
          left_ul = 0;
        }

        $( id_ul_tabs ).css( "left" , left_ul );
        function_setTimeout_left_ul();        

      }, 1);
    }
    // fim (setTimeout) - função pra colocar as abas pra esquerda ou direita

  });
  // fim (mousedown) - navegação das abas pelos botões(setas)

  $(".buttons-tabs-navigation > button").mouseup(function() {
   
    clearTimeout(setTimeout_left_ul);
    
  });

  $(".buttons-tabs-navigation > button").mouseout(function() {
   
    clearTimeout(setTimeout_left_ul);
    
  });

  // início (window.resize) - reajusta as abas quando muda o tamanho da janela
  $( window ).resize(function() {

    // início (each) - faz os cálculos pra reajustar as abas quando se aumenta ou diminui a janela
    $("ul.tabs + div.buttons-tabs-navigation").each(function() {

      id_div_ul = $( this ).parent().attr( "id" );
      width_div_tabs = $( "#" + id_div_ul ).attr( "data-width" );
      
      id_tag_ul = $( "#" + id_div_ul+" > ul" ).attr( "id" );
      width_ul_tabs = $( "#" + id_div_ul ).attr( "data-width" );

      left_ul = $("#"+id_tag_ul).css("left");
      left_ul = left_ul.slice(0, left_ul.length - 2);
      left_ul = parseInt( left_ul );

      if( width_div_tabs < $( "#" + id_div_ul ).width() ) {
        
        left_ul = left_ul + ( $( "#" + id_div_ul ).width() - width_div_tabs );
            
      
      } else {
        left_ul = left_ul - ( $( "#" + id_div_ul ).width() - width_div_tabs );
      }

      if( left_ul > 0 ) {
        left_ul = 0;
      }

      id_div_ul = $( "#"+ id_div_ul ).attr( "data-width" , $( "#"+ id_div_ul ).width() )

      $( "#" + id_tag_ul ).css( "left" , left_ul );

      clearTimeout(setTimeout_left_ul);

    });
    // fim (each) - faz os cálculos pra reajustar as abas quando se aumenta ou diminui a janela

  });
  // fim (window.resize) - reajusta as abas quando muda o tamanho da janela

}
// finish controll buttons navigation tabs

// Initialize functions
$(function () {

  $start();   

});



// function iniciaTreeView() {
//     // SCRIPT DA TREEVIEW

//     if( $( ".treeview > li > a + *" ).length > 0 ) {
//       $('<button type="button" class="open">-</button>').insertBefore('.treeview li > a:first-child');
//     }  

//     $('.treeview ul').find('button.open:last').remove();

//     $(".treeview button").click(function () {

//         var class_button_clicked = "";
//         class_button_clicked = $(this).attr("class");

//         if (class_button_clicked === "close") {

//             $(this).html("-");
//             $(this).removeClass("close");
//             $(this).addClass("open");
//             $(".open + a + *").show();
//             // $($(this).parent()).removeClass("hide-elements");
//             // $($(this).parent()).addClass("show-elements");

//         }

//         if (class_button_clicked === "open") {

//             $(this).html("+");
//             $(this).removeClass("open");
//             $(this).addClass("close");
//             $(".close + a + *").hide();
//             // $($(this).parent()).removeClass("show-elements");
//             // $($(this).parent()).addClass("hide-elements");

//         }

//     });

// }

// var $testeNavigationTabs = function() {

//   var id_div_ul;
//   var id_ul;
//   var id_div_buttons_navigation;
//   var width_div_ul;
//   var width_ul;
//   var width_div_buttons_navigation;
//   var max_left;
//   var left_ul = 0;

//   $( ".buttons-tabs-navigation" ).click(function() {

//     id_div_ul = $( this ).parent().attr( "id" );
//     id_div_buttons_navigation = $( this ).attr( "id" );
    
//     if( id_div_ul === undefined ) {

//       id_div_ul = "id_temporary";
//       $( this ).parent().attr( "id" , id_div_ul );

//     }
//     // adiciona na variável id_ul um possível id
//     id_ul = $( "#" + id_div_ul + " > ul").attr( "id" );
//     // existe id na ul?
//     if( id_ul === undefined ) {

//       alert( "A tag ul precisa ter um id pra fazer o controle das abas" );

//     } else {

//       if( id_div_ul === "id_temporary" ) {
//         // adiciona o id definitivo da div da ul
//         id_div_ul = "div_" + id_ul;
//         $( "#" + id_ul ).parent().attr( "id", id_div_ul );
//       }
      
//       if( id_div_buttons_navigation === undefined ) {
//         // adiciona o id na div dos botões de navegação das abas
//         id_div_buttons_navigation = "buttons_" + id_ul;
//         $( "#" + id_ul + " + div" ).attr( "id" , id_div_buttons_navigation );
//       }
      

//       width_div_ul = $("#"+id_div_ul).width();
//       $( "#" + id_div_ul ).attr( "data-width", width_div_ul );

//       $( "#" + id_ul + " > li ").each(function() {

//         if( width_ul === undefined ) {
//           width_ul = 0;
//         }

//         width_ul = width_ul + $( this ).width();

//       });

//       width_div_buttons_navigation = $( "#" + id_div_buttons_navigation ).width();
//       max_left =  width_div_ul - ( width_ul + width_div_buttons_navigation );

//       $( "#" + id_div_buttons_navigation + " > button:first-child" ).attr( "data-target" , "left" );
//       $( "#" + id_div_buttons_navigation + " > button:first-child + button" ).attr( "data-target" , "right" );
//     }

//   });

//   $("button").mousedown(function() {

//     function myFunction() {
//         click_button = setTimeout(function(){ 
//           alert($( this ).attr( "data-target" ));
//            if( $( this ).attr( "data-target" ) === "left" ) {
//               left_ul = left_ul + 3;

//               if( left_ul > 0 ) {
//                 left_ul = 0;
//               }
//             } else {
//               left_ul = left_ul - 3;
//             } 

//             $( "#" + id_ul ).css( "left" , left_ul + "px" );

//         }, 10);
//     }   

//      myFunction();

//   });

//   $("button").mouseup(function() {
//      function myStopFunction() {
//         clearTimeout( click_button );
//     }
//   });

// }

// não permite digitar começando com espaços e nem com mais de um espaço de uma letra/número a outra$ letra/número
var noSpaces = function( field ) {

  var $this = $( field ); //armazeno o ponteiro em uma variavel  
  var value = $this.val().replace(/[[A-Za-z\d](?:[A-Za-z\d]| (?! |$)){0,29}]+/gi,'');
  while (value.indexOf('  ') != -1) value = value.replace('  ', ' ');

  if( value === " " ) {
    value = "";
  }

  $this.val( value );

}

 