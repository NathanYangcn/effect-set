var products = [
    {
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金手 猴哥款',
        price: '￥405.00'
    },{
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金转运珠 猴哥款',
        price: '￥100.00'
    },{
        img: 'http://img10.360buyimg.com/N3/jfs/t2242/92/1446546284/374195/9196ac66/56af0958N1a723458.jpg',
        name: '珂兰 黄金手链 3D猴哥款',
        price: '￥45.00'
    }
];
// 加载更多、事件代理
var $prod = $('.prod'),
        $load = $('.load'),
        $cover = $('.cover');
$prod.on('mouseenter', 'li', function () {
    var $this = $(this);
    $this.children($cover).addClass('active');
});
$prod.on('mouseleave', 'li', function () {
    var $this = $(this);
    $this.children($cover).removeClass('active');
});
$load.on('click',function (e) {
    e.preventDefault();
    $.each(products, function (idx, value) {
        var prodHtml = appendHtmls(value);
        $(prodHtml).appendTo($prod);
    });
});
function appendHtmls(value) {
    var htmls = '';
    htmls += '<li>';
    htmls +=    '<div class="cover">';
    htmls +=       '<a href="" class="btn">立即抢购</a>';
    htmls +=    '</div>';
    htmls +=    '<a href="#">';
    htmls +=       '<img src="' + value.img + '" alt="' + value.name + '">';
    htmls +=       '<h4>' + value.name + '</h4>';
     htmls +=       '<p>' + value.price + '</p>';
     htmls +=    '</a>';
     htmls += '</li>';
    return htmls;
}
// 回到顶部
var $backBtn = $('.back-btn'),
    $window = $(window);
$window.on('scroll', function () {
    // 记住 窗口高度 获取方式
    var top = $window.scrollTop();
    if(top > 150){
        $backBtn.addClass('active');
    }else {
        $backBtn.removeClass('active');
    }
});
$backBtn.on('click', function () {
    $window.scrollTop(0);
})