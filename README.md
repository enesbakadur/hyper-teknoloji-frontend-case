# Hyper Teknoloji Frontend Case

Bu proje, Hyper Teknoloji için hazırlanan bir frontend case çalışmasıdır. Proje, gerçek bir API üzerinden ürünleri listeleyen, listelenen ürünler arasında arama yapılabilmesini sağlayan ve header/footer barındıran bir web uygulamasıdır.

## Özellikler

-   Modern ve responsive tasarım
-   Kullanıcı deneyimi gözetilmiş bir arayüz
-   Verilen API üzerinden ürün listesi görüntüleme
-   Listelenen ürünler arasından arama fonksiyonu

### Kullanılan Teknolojiler

-   HTML5
-   CSS3 (Tailwind CSS)
-   JavaScript (Vanilla)

### Kullanılan Araçlar

-   Remixicon
-   Undraw
-   Logoipsum

### API Entegrasyonu

-   API URL: `https://api.hyperteknoloji.com.tr/products/list`
-   POST metodu ile veri çekme

### Ürün Listesi Özellikleri

-   Fiyatı 0'dan büyük olan ilk 10 ürün listemize geliyor
-   Ürün kartlarında:
    -   Ürün görseli (API'den geliyor)
    -   Ürün adı (API'den geliyor)
    -   Ürün fiyatı (API'den geliyor)
    -   Yıldız değerlendirmesi (Statik)
    -   İncele butonu (İşlevsel değil)

### Arama Fonksiyonu

-   Minimum 3 karakter ile arama yapılabiliyor
-   Arama sonuçları anlık görüntüleniyor
-   Sonuç bulunamadığında ürünün bulunamadığına dair özel bir uyarı gösteriliyor

## Kurulum

1. Projeyi klonlayın:

git clone https://github.com/yourusername/hyper-teknoloji-frontend-case.git

2. Proje dizinine gidin:

cd hyper-teknoloji-frontend-case

3. 'index.html' dosyasını bir web tarayıcısında açın veya bir local server kullanın.
