var VK = {
    Share: {
        count: function (value, count) {
            $('#vkontakte_count').html(count);
        }
    }
};


function numbers(page_url) {


    $.getJSON('http://vkontakte.ru/share.php?act=count&index=1&url=' + encodeURI(page_url) + '&callback=?', function (response) {
    });


    $.getJSON('http://graph.facebook.com/' + encodeURI(page_url), function (response) {
        if (response.shares !== undefined) {
            b = response.shares;
            $('#fb_count').html(response.shares);

        } else {
            $('#fb_count').html(0);
        }
    });

    $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url=' + encodeURI(page_url) + '&callback=?', function (response) {
        if (response.count !== undefined) {

            $('#tw_count').html(response.count);
        }

        else {
            $('#tw_count').html(0);

        }

    });


};


$(function () {
    $("#shares").click(function () {



        $(".row").addClass("valign-topper");
        $(".counters").addClass("counters-topper");

        numbers($("#url").val());



        console.log($('#fb_count').html());

        $('#datafb').animateNumber({number: b});


    });


});

