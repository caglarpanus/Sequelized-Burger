$(function () {
    $('#submit-button').click(function(event){
        event.preventDefault();
        var burgerName = $('#burger-text').val().trim();
        $.ajax("/api/burgers/", {
            type: "POST",
            data: { 'name': burgerName}
        }).then(
            function () {
                location.reload();
            }
        );
    });

    $('.devour-button').click(function(event){
        event.preventDefault();
        var id = $(this).attr('data-id');
        $.ajax("/api/burgers/" + id, {
            type:"PUT",
            data: {"devoured": true}
        }).then(
            function () {
                console.log("Item devoured!");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});