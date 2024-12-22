let products = [
    {
        productName: "Şampuan",
        productPrice: 130,
        productStock: 5,
    },
    {
        productName: "Elma",
        productPrice: 25,
        productStock: 2
    },
    {
        productName: "Gazoz",
        productPrice: 45,
        productStock: 10,
    },
    {
        productName: "Top Kek",
        productPrice: 10,
        productStock: 20,
    },
    {
        productName: "Terlik",
        productPrice: 70,
        productStock: 3
    },
    {
        productName: "Puding",
        productPrice: 30,
        productStock: 5,
    },
    {
        productName: "Süt",
        productPrice: 35,
        productStock: 10,
    }
];

let balance = 0;
let toteBag = {};

function addBalance(amount) {
    if (amount <= 0) 
        {
        alert("Lütfen pozitif bir sayı miktarı girin.");
    } 
    else {
        balance += amount;
        alert(`${amount} TL eklendi. Mevcut bakiye: ${balance} TL.`);
    }
}

function listProducts() {
    let productList = "";
    if (products.length === 0) {
        productList = "Ürün listesi boş.";
    } else {
        products.forEach((p, index) => {
            productList += `${index + 1}. ${p.productName}: ${p.productPrice} TL, STOK: ${p.productStock}\n`;
        });
    }
    alert(productList);  
}

function toteAddBag(productName, quantity) {
    let product = products.find(p => p.productName === productName);

    if (!product) {
        alert("Bu ürün mevcut değil.");
        return;
    }

    if (product.productStock < quantity) 
        {
        alert("Yeterli stok yok.");
        return;
         }

    let totalCost = product.productPrice * quantity;
    if (balance < totalCost) 
        {
        alert("Limitiniz yetersiz.");
        return;
        }

    if (toteBag[productName]) 
        {
        toteBag[productName].quantity += quantity;
        } 
    else  {
        toteBag[productName] = { quantity, price: product.productPrice };
    }

    product.productStock -= quantity;
    balance -= totalCost;
    alert(`${productName} sepete eklendi. Toplam fiyat: ${totalCost} TL. Mevcut bakiye: ${balance} TL.`);
    }

function showBalance() {
    alert(`Mevcut bakiye: ${balance} TL`);
  }

function showToteBag() {
    let toteList = "";
    if (Object.values(toteBag).length === 0) 
        {
        toteList = "Sepetiniz boş.";
    } 
    else 
    {
        for (let productName in toteBag) {
            let item = toteBag[productName];
            toteList += `${productName}: ${item.quantity} adet, Fiyat: ${item.price} TL, Toplam: ${item.quantity * item.price} TL\n`;
        }
    }
    alert(toteList);
}

function checkout() {
    let totalAmount = 0;
    for (let productName in toteBag) {
        let item = toteBag[productName];
        totalAmount += item.quantity * item.price;
        }

    if (totalAmount === 0) 
        {
        alert("Sepetiniz boş. Satın alma işlemi yapılamaz.");
        return;
        }

    if (balance < totalAmount) 
        {
        alert("Bakiye yetersiz. Satın alma işlemi yapılamaz.");
        return;
        }

    balance -= totalAmount;
    toteBag = {};  
    alert(`Satın alma işlemi başarıyla tamamlandı! Ödenen tutar: ${totalAmount} TL. Yeni bakiye: ${balance} TL.`);
}

function startProgram() 
{
let choice = Number(prompt("Bir seçenek girin (1-7):\n1: Ürünleri Listele\n2: Bakiye Ekle\n3: Sepete Ürün Ekle\n4: Bakiyeyi Göster\n5: Sepeti Göster\n6: Satın Al\n7: Çıkış"));

if (choice === 1) 
    {
    listProducts();
} 
else if (choice === 2) 
    {
    let amount = Number(prompt("Ne kadar bakiye eklemek istersiniz?"));
    addBalance(amount);
} 
else if (choice === 3) {
    let productName = prompt("Sepete eklemek istediğiniz ürünün adını girin:");
    let quantity = Number(prompt("Kaç adet almak istersiniz?"));
    toteAddBag(productName, quantity);
 } 
 else if (choice === 4) {
    showBalance();
} 
else if (choice === 5) {
    showToteBag();
  } 
  else if (choice === 6) {
      checkout();
  } 
  else if (choice === 7) {
      alert("Çıkış yapılıyor.");
      return;
  } 
  else {
       alert("Geçersiz seçenek, lütfen tekrar deneyin.");
   }
   startProgram();

}
   
   startProgram();
