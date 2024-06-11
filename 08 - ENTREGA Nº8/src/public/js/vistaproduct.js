console.log("Script vistaproduct.js is running!");  

document.addEventListener('DOMContentLoaded', function () {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const productId = addToCartBtn.dataset.productId; 

    console.log("Product ID:", productId);  
    const productStock = parseInt("{{product.stock}}", 10);

    
    addToCartBtn.addEventListener('click', function () {
        console.log("Clicked on 'Agregar al Carrito' button");
        console.log("Product ID in click event:", productId);  
        Swal.fire({
            title: '¿Estás seguro que quieres agregar este producto al carrito?',
            input: 'number',
            inputAttributes: {
                max: productStock,
                min: 1,
                step: 1,
            },
            inputValue: 1,
            text: 'Selecciona la cantidad de unidades:',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value || value < 1) {
                    return 'Debes ingresar una cantidad válida.';
                }
                if (value > productStock) {
                    return 'No hay suficiente stock disponible.';
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const quantity = result.value;
                fetch('/add-to-cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        productId: productId,
                        quantity: quantity,
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    alert(`Producto agregado al carrito con ${quantity} unidades.`);
                })
                .catch(error => {
                    console.error('Error al agregar el producto al carrito:', error);
                    alert('Hubo un error al agregar el producto al carrito.');
                });
            }
        });
    });
});
