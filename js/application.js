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

    $('#addItem').on('submit', function(event) {
        event.preventDefault();
        var name = $(this).children('[name=name]').val();
        var price = $(this).children('[name=price]').val();
        var qty = $(this).children('[name=qty]').val();
        
        $('tbody').append('<tr>' +
        '<td class="name">' + name + '</td>' + 
        '<td class="price">' + price + '</td>' + 
        '<td><input class="qty" name="qty" type="number" value="' + qty + '" /></td>' + 
        '<td><button class="btn btn-light btn-sm remove">remove</button></td>' + 
        '<td class="totalPrice">$-.--</td>'
        );

        updateTotal();
        $(this).children('[name=name]').val('');
        $(this).children('[name=price]').val('');
        $(this).children('[name=qty]').val('');
    });
});    
