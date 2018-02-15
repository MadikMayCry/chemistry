$(document).ready(function() {
    var t1 = 2,
        naclperc1 = 95,
        naclperc2 = 92,
        h2so4perc1 = 92.5,
        h2so4perc2 = 1,
        x1 = 1647.89,
        x2 = 1380.28,
        x3 = 1791.18,
        x4 = 143.29,
        x5 = 1885.45,
        x6 = 94.27,
        x7 = 13.8,
        x8 = 1394.08,
        x9 = 1507.11,
        x10 = 113.03,
        x11 = 1028.17;
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
                var values = {
                    "userInput1": x1,
                    "userInput2": x2,
                    "userInput3": x3,
                    "userInput4": x4,
                    "userInput5": x5,
                    "userInput6": x6,
                    "userInput7": x7,
                    "userInput8": x8,
                    "userInput9": x9,
                    "userInput10": x10,
                    "userInput11": x11
                };

                $.each(values, function(key, value) {
                    if ((inputId == key) && (inputVal == value)) {
                        correctInput(input);
                        correctArrays[correctCount] = 1;
                        if (correctArrays.every(allCorrectCheck)) {
                            console.log("all correct");
                            $(input).parent().parent().next(".user_input_field").slideDown().addClass("active");
                        }
                        return false;
                    } else {
                        wrongInput(input);
                        correctArrays[correctCount] = 0;
                    }
                });
                correctCount++;
            }

        });
        console.log(correctArrays.toString());

        correctCount = 0;

        if (!isValid) {
            Materialize.toast('Неверный ввод данных', 4000);
        }
    });

    function generateRandom() {
        t1 = Math.floor((Math.random() * 5 + 1));

        naclperc1 = Math.round((Math.random() * 50 + 50) * 100) / 100;
        naclperc2 = Math.round((Math.random() * 50 + 50) * 100) / 100;
        h2so4perc1 = Math.round((Math.random() * 50 + 50) * 100) / 100;
        h2so4perc2 = Math.round((Math.random() * 10 + 1) * 100) / 100;

            x1 = Math.round(117 * t1 * Math.pow(10, 3) / 142 * 100) / 100;
        x2 = Math.round(98 * t1 * Math.pow(10, 3) / 142 * 100) / 100;

        x3 = Math.round(x1 * 100 / naclperc2 * 100) / 100;
        x4 = Math.round((x3 - x1) * 100) / 100;
        x5 = Math.round((x3 * 100 / naclperc1) * 100) / 100;
        x6 = Math.round((x5 - x3) * 100) / 100;
        x7 = Math.round((x2 * h2so4perc2 / 100) * 100) / 100;
        x8 = Math.round((x2 + x7) * 100) / 100;
        x9 = Math.round((x8 * 100 / h2so4perc1) * 100) / 100;
        x10 = Math.round((x9 - x8) * 100) / 100;

        x11 = Math.round((73 * t1 * Math.pow(10, 3) / 142) * 100) / 100;

        console.log("x1 = " + x1, "x2 = " + x2);
        console.log("x3 = " + x3, "x4 = " + x4, "x5 = " + x5, "x6 = " + x6);
        console.log("x7 = " + x7, "x8 = " + x8, "x9 = " + x9, "x10 = " + x10);
        console.log("x11 = " + x11);

        initalize();
    }

    function initalize() {
        $(".x1").html(x1);
        $(".x2").html(x2);

        $(".x3").html(x3);
        $(".x4").html(x4);
        $(".x5").html(x5);
        $(".x6").html(x6);
        $(".x7").html(x7);
        $(".x8").html(x8);
        $(".x9").html(x9);
        $(".x10").html(x10);

        $(".x11").html(x11);
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
