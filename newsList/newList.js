var $warp = $('.warp');
var perPageCount = 9;
var curPage = 1;
var warpWidth = $warp.width();
var itemWidth = $('.item').outerWidth(true);
var colNum = parseInt(warpWidth/itemWidth);
var colArr = [];
for(var i = 0; i < colNum; i++){
    colArr[i] = 0;
}
var $loader = $('.loader');
var isLoading = false;
// 第一次进入时页面的渲染
getData();
// 滚动页面时页面的渲染，并加状态锁：防止二次点击（还有一种时间锁）
$(window).on('scroll', function () {
    if(isLoading){
        return
    }
    if( checkShow($loader) ){
        getData();
    }
});
// 检查目标元素是否曝光，若是便会执行曝光加载功能，懒加载的一种应用
function checkShow($ele) {
    // 此处可以给曝光模块增加样式或者loading图片，但本次未添加
    var winTop = $(window).height();
    var scrollTop = $(window).scrollTop();
    var loaderTop = $ele.offset().top;
    if(loaderTop < winTop + scrollTop){
        return true;
    }else {
        return false;
    }
}
// 使用 jsonp 向后台请求数据
function getData() {
    isLoading = true;
    $.ajax({
        // 因为犯懒，所以没有自己mock数据，而是使用的线上接口
        url: 'http://platform.sina.com.cn/slide/album_tech',
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data: {
            app_key: '1271687855',
            num: perPageCount,
            page: curPage
        }
    }).done(function (ret) {
        // 为防止数据出错，验证 status 是否正确
        if(ret.status.code === '0'){
            render(ret.data);
            curPage++;
        }
    }).fail(function () {
        alert('系统异常，请稍后再试！')
    })
}
// 获得后台数据后，元素渲染的核心逻辑：遍历数据，一个个处理
// 重点就在此处，首先要理解核心逻辑才行，其次就是参数的传递
function render(newsData) {
    $.each(newsData, function (idx, val) {
        var $nodes = getHtmls(val);
        // 防止图片为加载完全时得不到正确高度，所以要监听 load 事件
        $nodes.find('img').on('load', function () {
            $nodes.appendTo($warp);
            waterFall($nodes);
        });
    });
    isLoading = false;
}
// 将数据拼装成 HTML 的逻辑
function getHtmls(news) {
    var htmls='';
    htmls += '<li class="item">';
    htmls += '  <img src='+news.img_url+'>';
    htmls += '  <h4 class="title">'+news.name+'</h4>';
    htmls += '  <p class="intor">'+news.short_intro+'</p>';
    htmls += '</li>';
    return $(htmls);
}
// 将拼装好的 HTML 以瀑布流的规则进行排列
function waterFall(node) {
    var itemHeight = node.outerHeight(true);
    var minIdx = 0,
        minVal = colArr[0];
    for(var i=0;i<colArr.length; i++){
        if(colArr[i] < minVal){
            minIdx = i;
            minVal = colArr[i];
        }
    }
    node.css({
        left: itemWidth * minIdx,
        top: minVal,
        opacity: 1
    });
    // 设置整个新闻列表宽度，为了让容器居中显示
    $('.page').css({
        width: colNum * itemWidth
    });
    colArr[minIdx] = colArr[minIdx] + itemHeight;
    $warp.height(Math.max.apply(null,colArr));
}