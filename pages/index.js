
//gallery

<script>
    $(document).ready(function () {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return '<h2>' + item.el.attr('title') + '</h2>' + '<small>' + item.el.children('.act-content').text() + '</small>';
                }
            }
        })
    });
</script>

// Select all links with hashes
$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });




//cart
/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change(function () {
    updateQuantity(this);
});

$('.product-removal button').click(function () {
    removeItem(this);
});


/* Recalculate cart */
function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}

