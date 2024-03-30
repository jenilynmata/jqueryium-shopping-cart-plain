var updateSubtotal = function (ele) {
    var itemPrice = parseFloat($(ele).find('.price').text());
    var itemQty = parseFloat($(ele).find('.qty').val());

    var itemSubtotal = itemPrice * itemQty;
    $(ele).children('.totalPrice').html(itemSubtotal.toFixed(2));

    return itemSubtotal;
}

var sum = function (acc, x) { return acc + x; };

var updateTotal = function () {
    var subtotal = [];

    $('tbody tr').each(function (i, ele) {
        var itemSubtotal = updateSubtotal(ele);
        subtotal.push(itemSubtotal);
    });

    var total = subtotal.reduce(sum);
    $('#total').html(total.toFixed(2));
}

$(document).ready(function () {
    updateTotal();

    $(document).on('click', '.btn.remove', function (event) {
        $(this).closest('tr').remove();
        updateTotal();
    });

    var timeout;
    $(document).on('input', 'tr input', function() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            updateTotal();
        }, 1000);
    });
});
