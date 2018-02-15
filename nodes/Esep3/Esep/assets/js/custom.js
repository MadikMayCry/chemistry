$(document).ready(function() {
    var nao = 10, nr = 12, na = 2.5, xch4 = 75, sh = 80;
    var allCorrect = false;
    var correctCount = 0;
    var correctArrays = [];

    $("#userForms").submit(function(event) {
        //Variables
        correctArrays = new Array($('.user_input_field.active input[type="text"]').length);
        correctArrays.fill(0);

        event.preventDefault();

        var isValid = true;
        $('.user_input_field.active input[type="text"]').each(function() {
            if (!$.isNumeric($(this).val())) {
                isValid = false;
                wrongInput($(this));
            } else {
                var input = $(this);
                var inputId = input.attr("id");
                var inputVal = input.val();
                var values = { "userInput1": xch4, "userInput2": sh};


                $.each(values, function(key, value) {
                    if ((inputId == key) && (inputVal == value)) {
                        correctInput(input);
                        correctArrays[correctCount] = 1;
                        if(correctArrays.every(allCorrectCheck)){
                            console.log("all correct");
                            $(input).parent().parent().next(".user_input_field").slideDown().addClass("active");
                        }
                        return false;
                    } else {
                        wrongInput(input);
                        correctArrays[correctCount] = 0;
                    }
                });
                correctCount ++;
            }

        });
        console.log(correctArrays.toString());

        correctCount = 0;

        if (!isValid) {
            Materialize.toast('Неверный ввод данных', 4000);
        }
    });

    function generateRandom() {
        nao = Math.round((Math.random() * 5 + 5) * 10) / 10;
        na = Math.round((Math.random() * 5 + 0) * 10) / 10;
        nr = Math.round((Math.random() * 5 + 5) * 10) / 10;

        xch4 = Math.round((nao - na) / nao * 100);

        g = Math.round((nao - na) * 2 *10) / 10;

        sh = Math.round((nr / g) * 100);

        initalize();
    }

    function initalize() {
        $(".nao").html(nao);
        $(".na").html(na);
        $(".nr").html(nr);
        $(".xch4").html(xch4);
        $(".g").html(g);
        $(".sh").html(sh);
    }

    function wrongInput(argument) {
        $(argument).removeClass("correct");
        $(argument).addClass("wrong");
        setTimeout(function() {
            $(argument).removeClass("wrong");
        }, 2000);
    }

    function correctInput(argument) {
        $(argument).removeClass("wrong");
        $(argument).addClass("correct");
    }

    function show_answers(argument) {
        $(".answers").slideDown();
        $('html, body').animate({
            scrollTop: $("#solution").offset().top
        }, 1000);
    }

    function allCorrectCheck(argument) {
        return argument == 1;
    }

    $("#show_solution").click(show_answers);

    $("#generateRandom").click(generateRandom);

});
