var $window = $(window);
var $images = $('.item>a>img');
var clock;
var $goTop = $('.go-top');

$window.on('scroll', function () {
//当滑动时，触发图片懒加载功能；防止重复触发，只执行最后一次触发
    if(clock){
        clearTimeout(clock)
    }
    clock = setTimeout(function () {
        lazyLoad()
    }, 500)
});
lazyLoad();
function lazyLoad() {
//定义函数：懒加载效果核心逻辑
    $images.each(function () {
        if( checkShow($(this)) && !isLoaded($(this)) ){
            loadImg($(this));
        }
    })
}

function checkShow($img) {
//检测：元素是否出现在屏幕中
    var eleTop = $img.offset().top;
    var scrollTop = $window.scrollTop();
    var winTop = $window.height();
    if( (eleTop < winTop + scrollTop) && (eleTop > scrollTop) ){
        return true;
    }else {
        return false;
    }
}
function isLoaded($img) {
//检测：元素是否已被加载过
    if( $img.hasClass('isLoaded') ){
        return true
    }else {
        return false
    }
}
function loadImg($img) {
//加载元素图片资源
    var newSrc = $img.attr('data-src');
    $img.attr('src', newSrc);
    $img.attr('iaLoaded', 'true')
}

//回到顶部功能
$window.on('scroll', function () {
            var scrollTop = $window.scrollTop();
    if(scrollTop > 300) {
        $goTop.show()
    }else {
        $goTop.hide()
    }
});
$goTop.on('click', function () {
    //设置整个文档的顶部，而不是window的顶部
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
})