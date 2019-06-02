// 當文件已經全載入至記憶體時，開始執行程式

var items = null
var new_items = []
var pageCount = 12
var now_page = 1
var page = null;
$('#product-list').empty();
$('#page-number').empty();

$('#show_query').show();
$('#show_insert').hide();

$('#insert').on('click', function() {

    // 取得商品資料
    var data = {
        item: {
            name: $('#inputProductName').val(),
            price: Number($('#inputProductPrice').val()),
            count: +$('#inputProductCount').val(),
            image: $('#inputProductImage').val(),
        }
    }

    // 新增商品
    $.post('https://js.kchen.club/B07106045/insert', data, function(response) {
        if (response) {
            // 伺服器有回傳資料
            if (response.result) {
                $('#message').text('新增成功')
                console.log(response.item)
                $('#dialog').modal('show')
            } else {
                $('#message').text('新增失敗')
                console.log(response.message)
                $('#dialog').modal('show')
            }
        } else {
            $('#message').text('伺服器出錯')
            $('#dialog').modal('show')
        }
    })
})

function show_query_click() {
    $('#show_query').show();
    $('#show_insert').hide();
    new_items = []
    play();
}

function show_insert_click() {

    $('#show_query').hide();
    $('#show_insert').show();

}


function play() {

    $.get('https://js.kchen.club/B07106045/query', function(response) {
        if (response) {
            // 伺服器有回傳資料
            if (response.result) {
                $('#product-list').empty();
                // 資料庫有回傳資料
                items = response.items
                console.log(items.length);
                new_product(items.length);

            } else {
                $('#message').text('查無相關資料')
                $('#dialog').modal('show')
            }
        } else {
            $('#message').text('伺服器出錯')
            $('#dialog').modal('show')
        }

        console.log(response)
    }, "json")


}
play();


function new_product(x) {


    for (var i = 0; i <= x - 1; i++) {



        var name = items[i].name;

        if (name.match('麗麗') != null) {
            //console.log(i]);
            new_items.push(items[i]);

        }


    }
    console.log(new_items);
    pro_return(new_items.length);
}

function pro_return(page_length) {


    console.log(page_length);
    page = Math.ceil(page_length / pageCount);


    $('#page-number').empty()

    $la = $('<a>').attr('class', 'page-link').attr('onclick', 'de_page(0)').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
    $lli = $('<li>').attr('id', 'prev').attr('class', 'page-item').addClass('disabled').append($la)

    $('#page-number').append($lli)

    // 插入分頁數字
    for (var i = 1; i <= page; i++) {
        $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

        $a.on('click', function() {
            var i = $(this).text()
                //alert($(this).text());

            $(".active").removeClass("active");

            $("#page" + i).removeClass("page-item");

            $("#page" + i).addClass("page-item active");

            now_page = i;

            query_product(i)
        })

        var strActive = ((i == 1) ? ' active' : '')
        $li = $('<li>').attr('class', 'page-item' + strActive).attr('id', 'page' + i).append($a)
        $('#page-number').append($li)
    }

    $ra = $('<a>').attr('class', 'page-link').attr('onclick', 'de_page(1)').text('»')
    $rli = $('<li>').attr('id', 'next').attr('class', 'page-item').append($ra)
    $('#page-number').append($rli)



    query_product(1)


}

function de_page(x) {

    if (x == 1) {
        now_page++;
    } else {

        now_page--;
    }



    $(".active").removeClass("active");

    $(".disabled").removeClass("disabled");

    $("#page" + now_page).removeClass("page-item");

    $("#page" + now_page).addClass("page-item active");


    if (now_page == page) {
        $('#next').addClass('disabled');
        $('#prev').removeClass('disabled');
    }
    if (now_page == 1) {
        $('#prev').addClass('disabled');
        $('#next').removeClass('disabled');
    }


    query_product(now_page);
    console.log(now_page);

}



function query_product(x) {

    $('#product-list').empty();

    var s = (x - 1) * pageCount

    var e = s + pageCount - 1


    for (var i = s; i <= e; i++) {


        var item = new_items[i]
        console.log(item.image);
        $img = $('<img>').attr('class', 'image').attr('src', item.image);
        $h3 = $('<h3>').attr('class', 'name').text(item.name);
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price);
        $c = $('<p>').attr('class', 'count').text('數量: ' + item.count);
        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p).append($c);
        $col = $('<div>').attr('class', 'col-*').append($item);
        console.log($col);
        $('#product-list').append($col);

    }

}