var $menuLis = $('.menu>li'),
    $detail = $('.detail');
$menuLis.on('mouseenter',  function () {
    var $this = $(this);
    $this.addClass('hover');
    $this.children($detail).addClass('active clearfix');
});
$menuLis.on('mouseleave', function () {
    var $this = $(this);
    $this.removeClass('hover');
    $this.children($detail).removeClass('active clearfix');
})