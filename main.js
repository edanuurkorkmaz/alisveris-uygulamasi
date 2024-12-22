/* Yapılacaklar:
Ürün Listesi Oluşturma: Ürünlerin adı, fiyatı ve stok miktarını içeren bir ürün listesi oluşturulacaktır. Örnek ürünler Ürün A, Ürün B, vb. olacak ve her ürün için fiyat ve stok miktarı belirlenecektir.
Sepet Fonksiyonu: Kullanıcı, satın aldığı ürünleri sepete ekleyebilir. Sepetteki ürünlerin adı, fiyatı ve miktarı gösterilecektir.
Ürün Satın Alma İşlemi: Kullanıcı, ürünleri listeleyip bir ürün seçtikten sonra, kaç adet almak istediğini girecek. Stok ve bakiye kontrol edilecek, yeterli stok ve bakiye varsa ürün sepete eklenecek, stok ve bakiye güncellenecektir.
Bakiye Ekle:Bakiye ekleme yapılabilecek
Bakiyeyi Görüntüleme: Kullanıcı mevcut bakiyesini herhangi bir zamanda görüntüleyebilir.
Menü Seçenekleri: Ana menüde 5 seçenek olacak:
Ürünleri listele
Sepeti göster
Ürün satın al
Bakiye Ekle
Bakiyeyi göster
Çıkış yap
Geçersiz Seçenek Kontrolü: Kullanıcı geçerli olmayan bir seçenek girerse, hata mesajı gösterilecektir. */

const products = [
    {
        id: 1,
        productName: "Watch",
        productPrice: 175,
        productStock: 10
    },
    {
        id: 2,
        productName: "Earphone",
        productPrice: 200,
        productStock: 25
    },
    {
        id: 3,
        productName: "Macbook",
        productPrice: 1500,
        productStock: 5
    },
    {
        id:4,
        productName: "Iphone 15",
        productPrice: 1750,
        productStock: 0
    }
]

function isAccepted(msg, ...keys){
    const value = prompt(msg);
    if (keys.includes(value)) {
        return value;
    }else {
        alert("Hatali tuslama yaptiniz.");
        return isAccepted(msg, ...keys);
    }
}

function listProducts(){
    const productList = products.map((product,index) => `${index + 1}. Ürün Adı: ${product.productName}\n Ürün Fiyatı: ${product.productPrice}$ \n Ürün Stok Sayısı: ${product.productStock}\n`).join("\n");

    alert(productList);

    return nextAction();
}

function mainMenu(){
    const value = isAccepted("Yapmak istediginiz islemi seçiniz. \n 1- Ürünleri Listele. \n 2-Sepete Ürün Ekle \n 3- Sepeti Göster. \n 4- Ürün Satin Al. \n 5- Bakiye Ekle. \n 6- Bakiye Göster. \n 7-Çikiş Yap.", "1","2","3","4","5","6","7");

    if (value == 1) {
        return listProducts();
    }else if (value == 2) {
        return addToCart();
    }else if ( value == 3){
        return showTheCart();
    }else if (value == 4){
        return buyProduct();
    }else if (value == 5){
        return addBalance();
    }else if (value == 6){
        return showBalance();
    }else{
        alert("Güle Güle...");
        return;
    }
}

function nextAction(){
    const value = isAccepted("Başka bir işlem yapmak ister misiniz? (e/h)", "e", "h", "E", "H");
    if (value.toLowerCase() === "e") {
        return mainMenu();
    }else {
        alert("Güle Güle...");
        return;
    }
}

const shoppingCart = [];

function showTheCart(){
    if (shoppingCart.length > 0) {
        const cart = shoppingCart.map(item => `Ürün: ${item.productName} - ${item.productPrice}$`).join("\n");
        alert(`Sepetinizdeki ürünler: \n ${cart}`);
    }else {
        alert("Sepetiniz boş.");
    }
    return nextAction();
}
function addToCart(){
    const productList = products.map((product,index) => `ID: ${product.id} - Ürün Adı: ${product.productName} \n Ürün Fiyatı: ${product.productPrice}$ \n Ürün Stok Sayısı: ${product.productStock}`).join("\n");

    const value = prompt(`Sepete eklemek istediginiz ürünün id'sini giriniz. Vazgeçmek istiyorsanız x'e basınız. \n ${productList}`);
    const findProduct = products.findIndex(product => product.id == value);
    

    if (findProduct == -1 && value.toLowerCase() !== "x") {
        if (value.toLowerCase() == "x") {
            return mainMenu();
        }
        alert("Yanlis bir id girdiniz.");
        return addToCart();
    }else{
        shoppingCart.push(products[findProduct]);
    }

   return nextAction();
}
function buyProduct(){
    if (shoppingCart.length === 0) {
        alert("Sepetiniz boş.")
        return nextAction();
    }
    const cart = shoppingCart.map(item => `Ürün: ${item.productName} - ${item.productPrice}$`).join("\n");
    alert(`Sepetinizdeki ürünler: \n ${cart}`);
    const value = isAccepted("Ürünleri almak istediginize emin misiniz? (e/h)", "e", "h" , "E" , "H" );
    if (value.toLowerCase() === "e") {
        shoppingCart.forEach(item => {
            const productIndex = products.findIndex(product => product.id === item.id);
            if(productIndex !== -1 && products[productIndex].productStock > 0){
                if (balance >= products[productIndex].productPrice) {
                    products[productIndex].productStock -= 1;
                    balance -= products[productIndex].productPrice;
                    alert(`${item.productName} satin aldiniz. Kalan bakiyeniz ${balance}`); 
                }else{
                    alert(`Bakiyeniz ${item.productName} için yeterli değil.`);
                }
            }else {
                alert(`${item.productName} stokta yok.`);
            }
        })
        shoppingCart.length = 0;

        return nextAction();
    }else {
        return nextAction();
    }
}
let balance = 0;
function addBalance(){
    const value = Number(prompt("Ne kadar bakiye yüklemek istiyorsunuz?"));
    if (!isNaN(value) && value > 0)  {
        balance += value;
        alert(`Yeni bakiyeniz: ${balance}`);
    } else {
        alert("Geçersiz miktar girdiniz.");
    }
    return nextAction();
}

function showBalance(){
    alert(`Bakiyeniz : ${balance}`);
    return nextAction();
}
mainMenu();