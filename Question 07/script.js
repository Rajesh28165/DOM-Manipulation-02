const productForm = document.getElementById('productForm');
const priceGraph = document.getElementById('priceGraph');
const ratingGraph = document.getElementById('ratingGraph');
let products = [];

productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const rating = parseFloat(document.getElementById('rating').value);

    const product = { name, price, rating };

    products.push(product);

    updateGraphs();

    productForm.reset();
});

function updateGraphs() {
    priceGraph.innerHTML = '';
    ratingGraph.innerHTML = '';

    products.forEach(product => {
        const priceBar = document.createElement('div');
        priceBar.classList.add('bar', 'price');
        priceBar.style.width = `${product.price}px`;
        priceBar.innerHTML = `<span class="bar-label">${product.name}</span>$${product.price}`;
        priceGraph.appendChild(priceBar);
    });

    products.forEach(product => {
        const ratingBar = document.createElement('div');
        ratingBar.classList.add('bar', 'rating');
        ratingBar.style.width = `${product.rating * 50}px`;
        ratingBar.innerHTML = `<span class="bar-label">${product.name}</span>${product.rating}★`;
        ratingGraph.appendChild(ratingBar);
    });
}

document.getElementById('sortByPrice').addEventListener('click', function() {
    products.sort((a, b) => a.price - b.price);
    updateGraphs();
});

document.getElementById('sortByRating').addEventListener('click', function() {
    products.sort((a, b) => a.rating - b.rating);
    updateGraphs();
});
