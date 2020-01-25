$(document)
    .ready(function () {

        var total = 0;

        var sum = function () {
            var prices = $('.product-price');
            var qty = $('.quantity');
            total = 0;

            for (i = 0; i < qty.length; i++) {
                var price = Number($(prices[i])
                    .text()
                    .replace(/\$/, ''));
                var subtotal = (Number($(qty[i])
                    .val())) * price;
                if (subtotal != 0) {
                    $($('.product-subtotal')[i])
                        .text("$" + subtotal);
                } else {
                    $($('.product-subtotal')[i])
                        .text("$--.--");
                }
                total += subtotal
            }

            $('#total-price')
                .text("$ " + total);
            var addspace = "";
            var spaces = total.toString();
            spaces = spaces.length;
            spaces = 12 - spaces;
            for (i = 0; i < spaces; i++) {
                addspace += " ";
            }
            if (total != 0) {
                $('#display')
                    .val("$" + addspace + total)
                    .change();
            }
            return total;
        }

        var addProduct = function (name, price) {
            name = name.charAt(0)
                .toUpperCase() + name.slice(1);
            $('#product-list')
                .prepend('<div class="row product"> \
                <div class="product-name col-xs-3"> \ ' + name + '\
                </div> \
                <div class="product-price col-xs-3"> \
                $' + price + '.00 \
                </div> \
                <div class="product-qty col-xs-3"> \
                <label>QTY</label> \
                <input class="quantity"> \
                </div> \
                <div class="col-xs-1"> \
                <button class="remove"> \Remove\</button> \
                </div> \
                <div class="product-subtotal col-xs-2"> \
                $--.-- \
                </div> \
                </div>'
              );
            }

        var sortProduct = function () {
            var prices = $('.product-price');
            var names = $('.product-name');
            var priceName = [];
            for (i = 0; i < prices.length; i++) {
                var price = $(prices[i])
                    .text()
                    .trim();
                var name = $(names[i])
                    .text()
                    .trim();
                priceName.push([name, price]);
            }
            priceName.sort();
            console.log(priceName);
            for (i = 0; i < priceName.length; i++) {
                $($('.product-name')[i])
                    .text(priceName[i][0]);
                $($('.product-price')[i])
                    .text(priceName[i][1]);
            }
        }

        $(document)
            .on('click', '#fork', function () {
                addProduct($('#name')
                    .val(), $('#price')
                    .val());
            });

        $(document)
            .on('click', '.remove', function () {
                $(this)
                    .parents('.row')
                    .remove();
                sum();
            });


        $(document)
            .on('keyup', '.quantity', function () {
                sum();
            });

    });
