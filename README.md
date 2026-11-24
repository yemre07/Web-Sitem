# Yunus Emre Ersoy · Kişisel Portfolyo

Türkçe / İngilizce kişisel portfolyo ve tarayıcı tabanlı hafif bir CMS. Sunucu gerektirmez; GitHub Pages, Vercel veya doğrudan dosyadan açılarak çalışır.

## Klasör yapısı

```
index.html          İngilizce anasayfa (giriş noktası)
en/                 İngilizce alt sayfalar: about, projects, gallery, blog, contact
tr/                 Türkçe sayfalar: index (anasayfa), hakkimda, projeler, galeri, blog, iletisim
admin/index.html    Yönetim paneli (/admin/ adresiyle açılır)
app/                MVC kaynakları
  models/
    content.js      Model: tüm içerik (projeler, galeri, blog, hakkımda, iletişim) — tek veri kaynağı
    store.js        Model: localStorage kaydı, varsayılanlara dönüş, iletişim formu gelen kutusu
  views/
    render.js       View: bölüm şablonları (kartlar, galeri, blog, iletişim…) — tarayıcı ve build ortak kullanır
    pages.mjs       View: site haritası (PAGES), sayfa iskeletleri (navbar, footer, admin paneli) — build sırasında
  controllers/
    page.js         Controller: modelden veriyi alıp view ile sayfadaki data-cms alanlarını çizer
    site.js         Controller: menü, filtreler, blog yönlendirme, lightbox, iletişim formu, görsel efektler
    admin.js        Controller: yönetim paneli (giriş, ekle/düzenle/sil, profil, gelen kutusu, arama)
assets/             Statik dosyalar: css/, fonts/, img/
tools/build.mjs     Tüm sayfaları app/ kaynaklarından statik HTML olarak üretir
docs/               Tasarım/ürün notları (DESIGN.md, PRODUCT.md) ve eski sürüm arşivi (arsiv/)
```

Kök dışındaki ve kökteki tüm HTML dosyaları **üretilir**; elle düzenlemeyin. Sayfa adresleri `app/views/pages.mjs` içindeki `PAGES` listesinden gelir ve her bağlantı (navbar, footer, TR/EN dil düğmesi, hreflang) bulunduğu klasöre göre göreceli yazılır.

**Yollar:** `content.js` içindeki görsel yolları köke göre yazılır (`assets/img/...`). Her sayfanın `<html data-base="../">` niteliği köke olan uzaklığı verir; `SiteRender.resolve()` bu yolları hem build sırasında hem tarayıcıda doğru klasöre çevirir. Panelde yeni görsel eklerken de `assets/...` biçimini kullanın.

Sayfalardaki script sırası: `content.js → store.js → render.js → page.js → site.js` (admin panelinde ek olarak `admin.js`).

## Komutlar

```
node tools/build.mjs .
```

`app/models/content.js` veya şablonlar değiştiğinde HTML sayfalarını yeniden üretir. Böylece JavaScript kapalıyken görünen içerik de güncel kalır.

## Yönetim paneli

`admin/index.html` — tarayıcıda `/admin/` (footer'daki küçük "Admin" bağlantısı). Paneldeki değişiklikler yalnızca o tarayıcının hafızasında (localStorage) tutulur; herkese yayınlamak için panelden "content.js olarak indir" ile alınan dosyayı `app/models/content.js` yerine koyup build alın ve siteyi yeniden yayınlayın.
