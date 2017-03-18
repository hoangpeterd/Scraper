$( document ).ready(function() {
    // get scrape

    $(document).on("click", ".saveBtn", function (){
        var savedNews = {
            title: $(this).attr("data-title"),
            link: $(this).attr("data-link")
        }

        $.post("/save", savedNews).done(function (result){});
    });

    $("#scrapeButton").on("click", function() {
            $("#articleAppend").empty();
            $.get("/scrape").done(function (result) {
                    $.each(result, function (index, value) {
                        var title = value.title;
                        var link = value.link;
                    $("#articleAppend").append("<div class='well'><p><a href=" + link + " target='_blank'>" + title + "</a><button data-title='"+title+"' data-link='"+link+"' type='submit' class='saveBtn btn btn-default pull-right' type='submit'>Save</button></p></div>");
                        return index < 9;
                    }); //End each result
            }); //End get Route
    }); //End Scrape Articles click listener

    $(".delNews").on("click", function(){
        console.log($(this).attr("data-id"))
        var id = $(this).attr("data-id")
        $.post("/delete/"+id)
    })
});
