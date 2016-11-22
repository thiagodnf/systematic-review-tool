$(function(){

    if (typeof(Storage) === "undefined") {
        Console.println("Sorry! No Web Storage support.");
    }

    // Fill the select component
    for(var year = 1944; year <= new Date().getFullYear()+1; year++){
        $('#springer-link-startingYear').append($('<option>', {
            value: year,
            text: year
        }));
        $('#springer-link-endingYear').append($('<option>', {
            value: year,
            text: year
        }));
    }

    //Load saved data
    $("#springer-link-key").val(localStorage.getItem("springer-link-key"));
    $("#springer-link-subject").val(localStorage.getItem("springer-link-subject"));
    $("#springer-link-startingYear").val(localStorage.getItem("springer-link-startingYear"));
    $("#springer-link-endingYear").val(localStorage.getItem("springer-link-endingYear"));

    function save(title, abstract){
        $.ajax({
            type: "POST",
            url: 'http://localhost/systematic-review/index.php/database',
            data: {data: {title:title, abstract:abstract}},
            success: function(result){
                console.log(result)
            },
            datatype: 'application/jsonp',
        });
    }

    $(".btn-escape").click(function(){

        var startSymbol = $(this).data("start-symbol");
        var endSymbol = $(this).data("end-symbol");

        var str = $("#string-search").val();

        var arrays = Separate.separate(str);

        var escaped = Escape.escape(arrays, startSymbol, endSymbol);

        $("#string-search").val(escaped);
    });

    $("#btn-example").click(function(event){
        // Remove the default behavior
        event.preventDefault();

        $("#string-search").val("genetic algorithm OR ant colony optimization AND requirement")
    });

    $("#btn-clear-console").click(function(event){
        Console.clear();
    });

    var year  = 2016;

    $("#btn-send-springer-link").click(function(event){
        // Remove the default behavior
        event.preventDefault();

        var key = $("#springer-link-key").val();

        if( ! key){
            return Console.println("ERROR: The key is required");
        }

        var subject = $("#springer-link-subject option:selected").text();

        var startingYear = $("#springer-link-startingYear option:selected").text();

        var endingYear = $("#springer-link-endingYear option:selected").text();

        if(endingYear < startingYear){
            return Console.println("ERROR: Ending year should be greater or equal than the starting year");
        }

        var query = $("#string-search").val();

        localStorage.setItem("springer-link-key", key);
        localStorage.setItem("springer-link-subject", subject);
        localStorage.setItem("springer-link-startingYear", startingYear);
        localStorage.setItem("springer-link-endingYear", endingYear);

        Console.clear();

        Console.println("Sending request to Springer Link...");
        Console.println("------------------------------------");

        $(this).prop("disabled",true);

        springerLink(key, subject, startingYear, endingYear, query, 1, 50, startingYear);
    });
})
