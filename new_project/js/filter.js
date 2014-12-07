/**
 * Created by junxie on 12/6/14.
 */
$(function(){
    $('#filter li').click(function(){
        var category=$(this).html();

        $("#filter li").removeClass("active");

        $(this).addClass("active");

        $("#portfolio li").hide();// or fadeOut();

        $('#portfolio li').each(function()  //a loop to execute
        {

           if($(this).hasClass(category)){
               $(this).show();  // or fadeIn();
           }
        });


    })
});