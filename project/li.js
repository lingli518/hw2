// �訜���辣撌脩�枏�刻�匧�亥秐閮䀹�園�娍�嚗屸�见�见嘑銵𣬚�见��

var items = null
var pageCount = 20
$('#product-list').empty();
$('#page-number').empty()
$(document).ready(function() {

    // 皜�蝛� product-list



    $('#query').on('click', function() {
        $.get('https://js.kchen.club/B12345678/query', function(response) {
            if (response) {
                // 隡箸�滚膥��匧�𧼮�唾����
                if (response.result) {
                    $('#product-list').empty();
                    // 鞈��坔澈��匧�𧼮�唾����
                    items = response.items

                    pro_return(items.length)

                    /*
                                     showItems(1)
                                    $('#page').show()
                                    newPage(items.length)
                    */
                } else {
                    $('#message').text('�䰻�∠㮾��𡏭����')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('隡箸�滚膥�枂�𥲤')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

})

function pro_return(page_length) {



    var page = Math.ceil(page_length / pageCount);


    $('#page-number').empty()

    $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('竄')
    $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)

    $('#page-number').append($lli)

    // ��鍦�亙����彍摮�
    for (var i = 1; i <= page; i++) {
        $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

        $a.on('click', function() {
            var i = $(this).text()
                //alert($(this).text());

            $(".active").removeClass("active");

            $("#page" + i).removeClass("page-item");

            $("#page" + i).addClass("page-item active");

            query_product(i)
        })

        var strActive = ((i == 1) ? ' active' : '')
        $li = $('<li>').attr('class', 'page-item' + strActive).attr('id', 'page' + i).append($a)
        $('#page-number').append($li)
    }

    $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('罈')
    $rli = $('<li>').attr('class', 'page-item').append($ra)
    $('#page-number').append($rli)



    query_product(1)
        //alert(page);

}




function query_product(x) {

    $('#product-list').empty();

    var s = items.lengthx - 16

    var e = items.lengthx - 1

    alert
    for (var i = s; i <= e; i++) {


        var item = items[i]

        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').append($item)
        console.log($col)
        $('#product-list').append($col)

    }

}