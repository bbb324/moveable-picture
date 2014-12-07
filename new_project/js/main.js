/**
 * Created by junxie on 12/5/14.
 */
$(function()
{

    var current_li;

    $("#search").keyup(function() //keyup: instance act
    {
        var current_query=$("#search").val();

        if(current_query!="") {  //if the input text field is empty, show all images
            $("#portfolio li").hide();
            $("#portfolio li").each(function () {
                var current_keyword = $(this).attr("data-keyword");

                if (current_keyword.indexOf(current_query) >= 0) {  //only show images that match key-word
                    $(this).show();
                }

            });
        }
        else{
            $('#portfolio li').show();
        }
    });

    jQuery('#portfolio').sortable() //allow to put image to anyplace you want

    function setImg(src, id)
    {
        $("#main").attr("src", src);

        var path="text/"+id+".txt";
        $.get(path, function(data)   //ajax
        {
            console.log(data);
            $('#description p').html(data);
        });
    }


   $("#portfolio img").click(function()
   {
       var src = $(this).attr("src"); //get selected element
       var id=$(this).attr("id");
       current_li=$(this).parent();   //"this stand for img", this.parent will return its li,  <li> <img> <li> in this relation
       setImg(src, id);
       $("#frame").fadeIn();
       $("#overlay").fadeIn();
   });

    $("#overlay").click(function()
    {
        $(this).fadeOut();
        $("#frame").fadeOut();
    });



    $('#right').click(function()
    {
        if(current_li.is(":last-child"))
        {
            var next_li = $("#portfolio li").first();
        }
        else
        {
            var next_li=current_li.next();
        }

        var next_src=next_li.children('img').attr("src");
        var id=next_li.children('img').attr("id");
        $("#main").attr("src", next_src);
        setImg(next_src, id);
        current_li=next_li;
    });


    $('#left').click(function()
    {
        if(current_li.is(":first-child")) //if current li is the first one, its prev li will be the last one.
        {
            var prev_li=$('#portfolio li').last();
        }
        else
        {
            var prev_li=current_li.prev();
        }


        var prev_src=prev_li.children('img').attr('src');
        var id=prev_li.children('img').attr('id');
        setImg(prev_src, id);
        $("#main").attr('src', prev_src);
        current_li=prev_li;
    });

    $("#left img, #right img").mouseover(function()  //mouse in, highlight
    {
        $(this).css("opacity", "0.95");
    });

    $("#left img, #right img").mouseout(function()  //mouse leave, opacity
    {
        $(this).css("opacity", "0.5");
    })


});