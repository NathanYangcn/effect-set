var $header = $('.header'),
    $panals = $('.panals'),
    $cover = $('.tab .cover');

$header.on('click', 'li', function () {
    var $this = $(this),
        $index = $this.index();
    $this.siblings().removeClass('active');
    $this.addClass('active');
    $this.parents('.tab').find($panals)
            .removeClass('active');
    $this.parents('.tab').find($panals).eq($index)
            .addClass('active');
});
$panals.on('mouseenter', 'li', function () {
    var $this = $(this);
    $this.find($cover)
            .addClass('active');
});
$panals.on('mouseleave', 'li', function () {
    var $this = $(this);
    $this.find($cover)
            .removeClass('active');
})