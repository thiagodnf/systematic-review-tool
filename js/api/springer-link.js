function springerLink(key, subject, startingYear, endingYear, query, nextStart, maxNumber, year){

    $.getJSON({
        url: "http://api.springer.com/metadata/json",
        data: {
            q: query+" and subject:\"" + subject + "\" and year:"+year,
            // q: encodeURIComponent(query),
            //q: query,
            // Return results starting at the number specified.
            s: nextStart,
            // Number of results to return in this request.
            p: maxNumber,
            api_key: key
        },
        timeout:5000000,
    }).done(function( data ) {

        var total = data.result[0].total;
        var start = data.result[0].start;
        var pageLength = data.result[0].pageLength;

        console.log("Total: " + total + ", Start: " + start + ", PageLength: " + pageLength);

        $.each(data.records, function(index, value){
            Console.println(year+"\t"+value.title);
            //save(value.title, value.abstract)
        });

        var nextStart = parseInt(start) + parseInt(pageLength);

        if(nextStart <= total){
            springerLink(key, subject, startingYear, endingYear, query, nextStart, pageLength, parseInt(year));
        }else{
            if(year < endingYear){
               springerLink(key, subject, startingYear, endingYear, query, 1, pageLength, parseInt(year)+1);
           }else{
               $(".btn-send").prop("disabled", false); 
               Console.println("----------------------------");
               Console.println("Done!");
           }
       }

       console.log(data);
   }).fail(function(a,b,c) {
        console.log( a );
        console.log( b  );
        console.log( c );
    });
}
