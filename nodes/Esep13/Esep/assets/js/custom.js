    var mark = 0;
    var optDraggable = {
        containment: '#wrapper',
        snap: true,
        snapMode: "inner",
        stack: "#ansList li"
    };
    var optDroppable = {
        addClasses: false,
        accept: '#ansList li',
        hoverClass: 'hovered',
        drop: handleAns,
        tolerance: 'intersect',
        out: function(event, ui) {
            if (ui.draggable.hasClass('correct')) {
                ui.draggable.removeClass('correct')
            } else if (ui.draggable.hasClass('incorrect')) {
                ui.draggable.removeClass('incorrect')
            }
        }
    }
    $(function() {
        var parent = $('#ansList');
        var child = parent.children();
        while (child.length) {
            parent.append(child.splice(Math.floor(Math.random() * child.length), 1)[0]);
        }
    });
    $("#01").data("number", 1).draggable(optDraggable);
    $("#02").data("number", 2).draggable(optDraggable);
    $("#03").data("number", 3).draggable(optDraggable);
    $("#04").data("number", 4).draggable(optDraggable);


    $("#ans01").data("number", 1).droppable(optDroppable);
    $("#ans02").data("number", 2).droppable(optDroppable);
    $("#ans03").data("number", 3).droppable(optDroppable);
    $("#ans04").data("number", 4).droppable(optDroppable);



    function handleAns(event, ui) {
        var slotNumber = $(this).data('number');
        var cardNumber = ui.draggable.data('number');
        if (slotNumber == cardNumber) {
            ui.draggable.addClass('correct');
        } else {
            ui.draggable.addClass('incorrect');
        }
        ui.draggable.position({
            my: "center",
            at: "center",
            of: $(this),
            using: function(pos) {
                $(this).animate(pos, "slow", "swing");
            }
        });
    }

    function marks(marks) {
        $("#mark").show();
        mark = Math.round((mark / marks) * 100 * 100) / 100;
        $("#markValue").html(mark);
        $("#markSend").html("<a href='problem:" + mark + "'>Завершить задачу</a>");
    }

    function disableAns() {
        $("#answer").prop("disabled", true);
        $("#correctAns").prop("disabled", true);
        $(".draggable").draggable("disable");
        $(".droppable").droppable("disable");
    }
    var green = {
        "border-color": "green",
        "border-style": "outset",
        "border-width": "1px"
    };
    var red = {
        "border-color": "red",
        "border-style": "outset",
        "border-width": "1px"
    }
    $("#answer").click(function() {
        if (!$(".draggable").hasClass("correct") && !$(".draggable").hasClass("incorrect")) {
            alert("Вставьте варианты ответа");
        } else {
            $("#ansList li").each(function(index, element) {
                if ($(this).is(".correct")) {
                    mark++;
                }
            });
            if ($(".draggable").hasClass("correct")) {
                $(".correct").addClass("green");
            }
            if ($(".draggable").hasClass("incorrect")) {
                $(".incorrect").addClass("red");
            }

            marks(4.0);
            disableAns();
        }
    });

    $("#correctAns").click(function() {
        var posCenter = {
            my: "center",
            at: "center",
            using: function(pos) {
                $(this).animate(pos, "slow", "linear");
            }
        }
        var id1 = { of: "#ans01"
        };
        var id2 = { of: "#ans02"
        };
        var id3 = { of: "#ans03"
        };
        var id4 = { of: "#ans04"
        };



        for (var i = 1; i <= 4; i++) {
            $.extend(eval("id" + i), posCenter);
            $("#0" + i).position(eval("id" + i)).addClass("green");
        }

        marks(4.0);
        disableAns();
    });
