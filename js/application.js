var formatPrice = function(price) {
    return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var formatAmount = function(amount) {
    return parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var updateSubtotal = function (ele) {
    var itemPriceString = $(ele).find('.price').text();
    var itemPrice = parseFloat(itemPriceString.replace(/\$|,/g, ''));
    var itemQty = parseFloat($(ele).find('.qty').val());

    var itemSubtotal = itemPrice * itemQty;

    var formattedItemPrice = formatPrice(itemPrice);

    $(ele).find('.price').text(formattedItemPrice);
    $(ele).children('.totalPrice').html(formatPrice(itemSubtotal));

    return itemSubtotal;
}

var updateTotal = function () {
    var total = 0;

    $('tbody tr').each(function (i, ele) {
        var itemSubtotal = updateSubtotal(ele);
        total += itemSubtotal;
    });

    if ($('tbody tr').length === 0) {
        $('#total').html("0.00");
    } else {
        $('#total').html(formatAmount(total));
    }
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
        
        price = formatPrice(price);

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
