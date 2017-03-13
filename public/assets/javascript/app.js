$( document ).ready(function() {
    console.log( "ready!" );
    // get scrape
    $("#scrapeButton").on("click", function() {
        console.log("click");
            $("#articleAppend").empty();
            $.get("/all").done(function (result) {
                console.log(result);
                    $.each(result, function (index, value) {
                        var title = value.title;
                        var link = value.link;
                    $("#articleAppend").append("<div class='well'><p><a href=" + link + " target='_blank'>" + title + "</a><button type='submit' class='saveBtn btn btn-default pull-right' type='submit'>Save</button></p></div>");
                        return index < 9;
                    }); //End each result
            }); //End get Route
    }); //End Scrape Articles click listener
});
