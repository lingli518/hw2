$('#query').on('click', function() {
    $.get('https://js.kchen.club/B12345678/query', function(response) {
        if (response) {
            // 伺服器有回傳資料
            if (response.result) {
                $('#product-list').empty();
                // 資料庫有回傳資料
                items = response.items
                pagenumber(items.length)

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
})

function pagenumber(i) {
    alert(i)






}