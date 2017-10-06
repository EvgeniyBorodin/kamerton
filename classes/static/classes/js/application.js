/*глобальные переменные*/
var order_status = 1;
var child_old;
var child_gender = "Мальчик";
var studio_kind="";
var name, phone, email;

$(document).ready(function(){

    $('#vk-logo').click(function (){
        $(location).attr('href','https:/vk.com/kamerton.hall');
    });

    if($('html').hasClass('mobile portrait')){
            $('.background-svg-container svg').attr("height","100%");
        }

    $(window).resize(function(){
        if($('html').hasClass('mobile portrait')){
            $('.background-svg-container svg').attr("height","100%");
        }else{
            $('.background-svg-container svg').removeAttr("height");
        }
    });



    $('#inst-logo').click(function (){
        $(location).attr('href','');
    });

    $('#order-next-btn').hover(function(){
        $('#passive-next-btn').css('display','none');
        $('#active-next-btn').css('display','block');
    },function(){
        $('#active-next-btn').css('display','none');
        $('#passive-next-btn').css('display','block');
    });

    $('#order-send-btn').hover(function(){
        $('#passive-send-btn').css('display','none');
        $('#active-send-btn').css('display','block');
    },function(){
        $('#active-send-btn').css('display','none');
        $('#passive-send-btn').css('display','block');
    });

    $('#order-cancel-btn').hover(function(){
        $('#passive-cancel-btn').css('display','none');
        $('#active-cancel-btn').css('display','block');
    },function(){
        $('#active-cancel-btn').css('display','none');
        $('#passive-cancel-btn').css('display','block');
    });


    $('input[name="phone"]').mask("+7 999 999-99-99")

    $('input[name="name"], input[name="age"]').focusout(function(){
        var inp = $(this);
        if(inp.val()!==""){
            inp.css('borderColor','#FCEE21');
            $('.error-warning').css('visibility','hidden');
        }else{
            inp.css('borderColor','#fff');
        }
    });

    $('input[name="email"]').change(function(){
        var inp = $(this);
        if(inp.val()!=="" || pattern.test(inp.val())){
            inp.css('borderColor','#FCEE21');
            $('.error-warning').css('visibility','hidden');
        }else{
            inp.css('borderColor','#fff');
        }
    });


    $('input[name="phone"]').change(function(){
        var inp = $(this);
        if(inp.val().length===16){
            inp.css('borderColor','#FCEE21');
            $('.error-warning').css('visibility','hidden');
        }else{
            inp.css('borderColor','#fff');
        }
    });


    $('.child-gender-item').click(function(){
        $('.child-gender-item').removeClass('active');
        $(this).addClass('active');
        child_gender = $(this).text();
    });

    $('.studio-kind').click(function(){
        $('.studio-kind').removeClass('active-studio-kind');
        $(this).addClass('active-studio-kind');
        studio_kind = $(this).text();
    });


    $('#order-next-btn').click(function(){
        order_status++;
        switch (order_status){
            case 2:
                var _name = $('input[name="name"]').val();
                var _phone = $('input[name="phone"]').val();
                var _email = $('input[name="email"]').val();
                    if(data_exam(_name,_phone,_email)){
                        name = _name;
                    phone = _phone;
                    email=_email;
                    gone('.description-slogan');
                    gone('.description');
                    gone('.order-first-level');
                    setTimeout(function () {
                        has_come('.order-second-level');
                        $('#order-cancel-btn').css('display','block');
                    },400);
                    }
                    else{
                        order_status--;
                    }

                break;
            case 3:
                if($('input[name="age"]').val()!==""){
                    child_old=$('input[name="age"]').val();
                    gone('.order-second-level');
                setTimeout(function () {
                        has_come('.order-third-level');
                        $('#order-next-btn').css('display','none');
                    $('#order-send-btn').css('display','block');
                },400);
                }
                else{
                    $('input[name="age"]').css('borderColor','#ED1E79');
                    order_status--;
                }
                break;
        }
    });

    $('#order-send-btn').click(function(){
        if(studio_kind!==""){
                    gone('.order-third-level');
                    gone('.separator');
                    gone('.management-btns');
                    $('.loader').css('display','block');
                order(name, phone, email, child_old, child_gender, studio_kind);
                }
                else{
            $('.order-third-level-description').css('color','#ED1E79');
            setTimeout(function () {
                $('.order-third-level-description').css('color','#FCEE21');
            },1000);
                }
    });

    $('#order-cancel-btn').click(function(){
        order_status--;
        switch (order_status){
            case 1:
                $('#order-cancel-btn').css('display','none');
                gone_alt('.order-second-level');
                setTimeout(function () {
                    has_come_alt('.description-slogan');
                    has_come_alt('.description');
                    has_come_alt('.order-first-level');
                },400);
                break;
            case 2:
                gone_alt('.order-third-level');
                setTimeout(function () {
                    has_come_alt('.order-second-level');
                    $('#order-send-btn').css('display','none');
                    $('#order-next-btn').css('display','block');
                },400);
                break;
        }
    });
});

function order(_name,_phone, _email, _child_old,_child_gender,_studio_kind) {
    $.ajax({
        url:'order/',
        data:{
            name: _name,
            phone: _phone,
            email: _email,
            age:_child_old,
            gender: _child_gender,
            studio:_studio_kind,
            csrfmiddlewaretoken:$('input[name="csrfmiddlewaretoken"]').val()
        },
        type:'POST',
        async:true,
        cache:false,
        success:function(response){
            $('.loader').css('display','none');
            has_come('.thanks-block');
            setTimeout(function(){
                name = "";
                phone = "";
                email= "";
                order_status = 1;
                child_gender = "Мальчик";
                studio_kind = "";
                $('input[name="name"], input[name="phone"], input[name="email"], input[name="age"]').val('');
                $('input[name="name"], input[name="phone"], input[name="email"], input[name="age"]').css('borderColor', '#fff');
                $('.child-gender-item').removeClass('active');
                $('.studio-kind').removeClass('active-studio-kind');
                $('#child-gender-male').addClass('active');
                $('#order-cancel-btn, #order-send-btn').css('display','none');
                $('#order-next-btn').css('display','block');
                gone('.thanks-block');
                setTimeout(function () {
                    has_come('.order-first-level');
                    has_come('.description-slogan');
                    has_come('.description');
                    has_come('.separator');
                    has_come_flex('.management-btns');
                },400);
            },4000);
        },
        error:function(){
            alert('Что-то пошло не так. Перезагрузите страницу.');
        }
    });
}

function data_exam(name, phone, email) {
    if(name===""){
        $('input[name="name"]').css('borderColor','#ED1E79');
        $('.error-warning').css('visibility','visible');
        return false;
    }
    if(phone.length!==16){
        $('input[name="phone"]').css('borderColor','#ED1E79');
        $('.error-warning').css('visibility','visible');
        return false;
    }
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    if(email==="" || !pattern.test(email)){
        $('input[name="email"]').css('borderColor','#ED1E79');
        $('.error-warning').css('visibility','visible');
        return false;
    }
    $('input[name="name"], input[name="phone"], input[name="email"]').css('borderColor','#FCEE21');
    $('.error-warning').css('visibility','hidden');
    return true;
}

function gone(selector){
    $(selector).addClass('animated fadeOutLeft');
    setTimeout(function () {
        $(selector).css('display','none');
        $(selector).removeClass('animated fadeOutLeft')
    },400);
}


function has_come(selector){
    $(selector).css('display','block');
    $(selector).addClass('animated fadeInRight');
    setTimeout(function () {
        $(selector).removeClass('animated fadeInRight')
    },400);
}

function has_come_flex(selector){
    $(selector).css('display','flex');
    $(selector).addClass('animated fadeInRight');
    setTimeout(function () {
        $(selector).removeClass('animated fadeInRight')
    },400);
}

function gone_alt(selector){
    $(selector).addClass('animated fadeOutRight');
    setTimeout(function () {
        $(selector).css('display','none');
        $(selector).removeClass('animated fadeOutRight')
    },400);
}

function has_come_alt(selector){
    $(selector).css('display','block');
    $(selector).addClass('animated fadeInLeft');
    setTimeout(function () {
        $(selector).removeClass('animated fadeInLeft')
    },400);
}
