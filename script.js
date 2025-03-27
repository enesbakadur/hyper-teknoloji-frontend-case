document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuIcon = document.getElementById('mobile-menu-icon');
    const searchInput = document.getElementById('search-input');

    mobileMenu.style.display = 'none';
    mobileMenuOverlay.style.display = 'none';

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        if (searchTerm.length >= 3) {
            filterProducts(searchTerm);
        } else {
            filterProducts('');
        }
    });

    menuButton.addEventListener('click', () => {
        const isMenuVisible = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isMenuVisible ? 'none' : 'block';
        mobileMenuOverlay.style.display = isMenuVisible ? 'none' : 'block';

        menuIcon.classList.remove(
            isMenuVisible ? 'ri-close-large-line' : 'ri-menu-line'
        );
        menuIcon.classList.add(
            isMenuVisible ? 'ri-menu-line' : 'ri-close-large-line'
        );
    });

    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        mobileMenuOverlay.style.display = 'none';
        menuIcon.classList.remove('ri-close-large-line');
        menuIcon.classList.add('ri-menu-line');
    });

    fetchProducts();
});

const API_URL = 'https://api.hyperteknoloji.com.tr/products/list';
const API_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpblR5cGUiOiIxIiwiQ3VzdG9tZXJJRCI6IjU1NzI0IiwiRmlyc3ROYW1lIjoiRGVtbyIsIkxhc3ROYW1lIjoiSHlwZXIiLCJFbWFpbCI6ImRlbW9AaHlwZXIuY29tIiwiQ3VzdG9tZXJUeXBlSUQiOiIzMiIsIklzUmVzZWxsZXIiOiIwIiwiSXNBUEkiOiIxIiwiUmVmZXJhbmNlSUQiOiIiLCJSZWdpc3RlckRhdGUiOiIzLzI1LzIwMjUgMTowMDo0OCBQTSIsImV4cCI6MjA1NDA1MjI1MCwiaXNzIjoiaHR0cHM6Ly9oeXBlcnRla25vbG9qaS5jb20iLCJhdWQiOiJodHRwczovL2h5cGVydGVrbm9sb2ppLmNvbSJ9.MqpEcAgXqQw3mwT6UYprGl6kIkghSDM9UvJsPrRJX4s';

let displayedProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(
                `API Hatası: ${response.status} - ${response.statusText}`
            );
        }

        const data = await response.json();
        const products = Array.isArray(data) ? data : data.data;

        if (!Array.isArray(products)) {
            throw new Error("API'den doğru formatta ürünler alınamadı.");
        }

        // İlk 10 ürünü al ve global değişkende sakla
        displayedProducts = products.slice(0, 10);
        renderProducts(displayedProducts);
    } catch (error) {
        console.error('Ürünleri çekerken hata oluştu:', error);
        const productListContainer = document.getElementById('product-list');
        if (productListContainer) {
            productListContainer.innerHTML =
                '<div class="text-red-500 text-center p-4">Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</div>';
        }
    }
}

function filterProducts(searchTerm) {
    const filteredProducts = displayedProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm)
    );

    renderProducts(filteredProducts);
}

function renderProducts(products) {
    const productListContainer = document.getElementById('product-list');
    if (!Array.isArray(products) || products.length === 0) {
        productListContainer.innerHTML = `<div class="col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-6 flex flex-col justify-center items-center gap-4">
        <img src='/assets/not-found.svg' alt='Ürün Bulunamadı' class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"/>
        <p class="text-[#CDCDCD] text-center">Aradığınız ürün bulunamadı.</p>
        </div>`;
        return;
    }

    productListContainer.innerHTML = '';

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className =
            'p-2 md:p-3 lg:p-4 col-span-1 flex flex-col justify-between gap-2 rounded-xl border-1 border-[#5233DD] group';

        const productName = product.productName;
        const productPrice = product.buyPrice;

        const productImage = product.productData?.productMainImage;

        productCard.innerHTML = `
            <div class="flex flex-col justify-between gap-2">
                <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    <img 
                        src="${productImage}" 
                        alt="${productName}" 
                        class="object-cover w-full h-full"
                        loading="lazy"
                        crossorigin="anonymous"
                        referrerpolicy="no-referrer"
                    >
                </div>
                <div class="flex flex-col gap-1">
                    <h3 class="text-sm leading-snug text-[#CDCDCD]">${productName}</h3>
                    <div class="flex items-center gap-1">
                        <div class="flex text-[#EFA037]">
                            <i class="ri-star-s-fill"></i>
                            <i class="ri-star-s-fill"></i>
                            <i class="ri-star-s-fill"></i>
                            <i class="ri-star-s-fill"></i>
                            <i class="ri-star-half-s-fill"></i>
                        </div>
                        <span class="text-xs text-[#CDCDCD]">4,5/5</span>
                    </div>
                    <span class="text-lg text-white font-bold">₺${productPrice}</span>
                </div>
            </div>
            <a href="/" class="w-full text-center text-sm text-white bg-[#5233DD] rounded-lg py-2 lg:opacity-0 group-hover:opacity-100 hover:brightness-110 transition-all duration-150">İncele</a>
        `;

        productListContainer.appendChild(productCard);
    });
}
