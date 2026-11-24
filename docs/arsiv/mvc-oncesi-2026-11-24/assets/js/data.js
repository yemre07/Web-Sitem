/* Yunus Emre Ersoy · site content (the single source of truth).
   Default data for every page. The admin panel (admin.html) saves edits to
   localStorage on top of this; "data.js olarak indir" in the panel produces a
   replacement for this file so edits can be published for every visitor.
   Fields marked html/body may contain HTML; everything else is plain text. */
globalThis.SITE_DEFAULTS = {
  "version": 2,
  "projects": [
    {
      "id": "karakalem",
      "cat": "design",
      "img": "assets/img/projects/boyum-sonrasi.png",
      "tools": "Adobe Photoshop",
      "featured": 1,
      "tr": {
        "title": "Karakalem Renklendirme",
        "desc": "İki aşamalı bir çalışma: önce karakalemle kontur ve form, ardından dijital fırçalarla katman katman renk. Işık ve gölgeyi renkle zenginleştirerek çizime derinlik ve canlılık kazandırdım.",
        "alt": "Wolverine karakterinin Photoshop'ta renklendirilmiş karakalem çizimi"
      },
      "en": {
        "title": "Charcoal Colorization",
        "desc": "A two-stage piece: first contour and form in charcoal, then colour added layer by layer with digital brushes. Enriching light and shadow with colour gave the drawing depth and life.",
        "alt": "Charcoal drawing of the Wolverine character, colorized in Photoshop"
      }
    },
    {
      "id": "akilli-obje",
      "cat": "design",
      "img": "assets/img/projects/smart-obje.jpg",
      "tools": "Adobe Photoshop",
      "featured": 0,
      "tr": {
        "title": "Akıllı Obje",
        "desc": "Smart Object yöntemiyle hazırlanan uzay kompozisyonu. Bağlantılı katmanlar sayesinde tek bir düzenleme, aynı objeyi kullanan tüm tasarımları eşzamanlı günceller.",
        "alt": "Dünya yörüngesinde astronotlar ve uçan dairelerden oluşan Photoshop kompozisyonu"
      },
      "en": {
        "title": "Smart Object",
        "desc": "A space composition built with Photoshop Smart Objects. Thanks to linked layers, a single edit updates every design that uses the same object at once.",
        "alt": "Photoshop composition of astronauts and flying saucers above Earth"
      }
    },
    {
      "id": "siyah-beyaz",
      "cat": "design",
      "img": "assets/img/projects/siyah-beyaz-sonrasi.jpg",
      "tools": "Adobe Photoshop",
      "featured": 0,
      "tr": {
        "title": "Siyah Beyaz Kontrast",
        "desc": "Görsel önce siyah beyaza çevrildi, ardından seçilen alanlar orijinal renklerine döndürüldü. Böylece göz, fotoğrafta öne çıkmasını istediğim noktaya yöneliyor.",
        "alt": "Siyah beyaz bir Amerikan futbolu fotoğrafında yalnızca oyuncunun renkli bırakıldığı çalışma"
      },
      "en": {
        "title": "Black & White Contrast",
        "desc": "The image was first turned black and white, then selected areas were restored to their original colours, so the eye goes straight to the part I wanted to highlight.",
        "alt": "Black and white American football photo with only the leaping player left in colour"
      }
    },
    {
      "id": "urun-tanitimi",
      "cat": "design",
      "img": "assets/img/projects/urun-tanitimi.png",
      "tools": "Adobe Photoshop",
      "featured": 3,
      "tr": {
        "title": "Ürün Tanıtımı",
        "desc": "Photoshop'ta sıfırdan tasarlanan güneş kremi tanıtım afişi. Katman stilleri, maskeleme ve özel fırçalarla oluşturulan vurgular kullanıldı; sarı palet ürünün güneşle ilişkisini anlatıyor.",
        "alt": "Sarı zemin üzerinde güneş kremi tüpü ve slogan içeren ürün tanıtım afişi"
      },
      "en": {
        "title": "Product Promotion",
        "desc": "A sunscreen promotion poster designed from scratch in Photoshop, using layer styles, masking and highlights made with custom brushes; the yellow palette tells the product's story with the sun.",
        "alt": "Product promotion poster with a sunscreen tube and slogan on a yellow background"
      }
    },
    {
      "id": "hesap-makinesi",
      "cat": "code",
      "img": "assets/img/projects/hesap-makinesi.jpg",
      "tools": "",
      "featured": 0,
      "tr": {
        "title": "Hesap Makinesi",
        "desc": "Temel matematik işlemlerini yapan basit bir hesap makinesi uygulaması. Sade arayüzü ile günlük hesaplamaları hızlı yapmayı amaçlıyor.",
        "alt": "Hesap makinesi uygulamasının simgesi"
      },
      "en": {
        "title": "Calculator",
        "desc": "A simple calculator app covering the basic arithmetic operations, with a clean interface for quick everyday calculations.",
        "alt": "Icon of the calculator app"
      }
    },
    {
      "id": "yilan-oyunu",
      "cat": "code",
      "img": "assets/img/projects/yilan-oyunu.jpg",
      "tools": "Python / JavaScript",
      "featured": 2,
      "tr": {
        "title": "Yılan Oyunu",
        "desc": "Klasikler asla ölmez! Kodlamaya başladığımda yaptığım ilk oyunlardan biri. Yön tuşlarıyla yılanı yönlendir, kuyruğuna çarpma ve elmaları topla; skor takibi ve hız ayarı da var.",
        "alt": "Elmaya uzanan yeşil yılan çizimi"
      },
      "en": {
        "title": "Snake Game",
        "desc": "Classics never die! One of the first games I made when I started coding. Steer the snake with the arrow keys, don't hit your tail and collect the apples; with score tracking and speed settings.",
        "alt": "Illustration of a green snake reaching for an apple"
      }
    }
  ],
  "gallery": [
    {
      "id": "calisma-masasi",
      "img": "assets/img/gallery/calisma-masasi.jpg",
      "w": 1600,
      "h": 1073,
      "tr": {
        "title": "Çalışma Masam",
        "caption": "Kod ekranları açık, bilgisayar kucağımda: projelerimin çoğu bu masada doğuyor.",
        "tag": "Masa başı",
        "alt": "Ekran ve dizüstü bilgisayar başında gülümseyen Yunus Emre"
      },
      "en": {
        "title": "My Desk",
        "caption": "Code on the screens, laptop on my lap: most of my projects start at this desk.",
        "tag": "Workspace",
        "alt": "Yunus Emre smiling at a desk with monitors and a laptop"
      }
    },
    {
      "id": "basketbol",
      "img": "assets/img/gallery/basketbol.jpg",
      "w": 1309,
      "h": 1600,
      "tr": {
        "title": "Sahilde Basketbol",
        "caption": "Palmiyeler ve deniz manzarası eşliğinde bir sahil sahasında turnike anı.",
        "tag": "Antalya sahili",
        "alt": "Palmiyelerle çevrili sahil sahasında potaya turnike atan Yunus Emre"
      },
      "en": {
        "title": "Basketball by the Sea",
        "caption": "Going for a layup on a seaside court, with palm trees and the sea behind.",
        "tag": "Antalya coast",
        "alt": "Yunus Emre going for a layup on a seaside court lined with palm trees"
      }
    },
    {
      "id": "yegen-atakan",
      "img": "assets/img/gallery/yegen-atakan.jpg",
      "w": 1091,
      "h": 997,
      "tr": {
        "title": "Yeğenim Atakan",
        "caption": "Omuzlarımda yeğenim Atakan. Bana dayılık görevi verildiğinden beri en sevdiğim unvan bu.",
        "tag": "Aile",
        "alt": "Gece parkta omuzlarında gülen yeğenini taşıyan Yunus Emre"
      },
      "en": {
        "title": "My Nephew Atakan",
        "caption": "My nephew Atakan on my shoulders. Being his uncle is my favourite title.",
        "tag": "Family",
        "alt": "Yunus Emre at night in a park carrying his laughing nephew on his shoulders"
      }
    },
    {
      "id": "okul-takimi",
      "img": "assets/img/gallery/okul-takimi.jpg",
      "w": 543,
      "h": 543,
      "tr": {
        "title": "Okul Futbol Takımı",
        "caption": "Mavi beyaz formalarla takım arkadaşlarım ve ben; yıllar sonra bile unutulmayacak bir takım ruhu.",
        "tag": "Futbol",
        "alt": "Mavi beyaz çizgili formalı lise futbol takımı oyuncuları"
      },
      "en": {
        "title": "School Football Team",
        "caption": "My teammates and me in blue-and-white kits; a team spirit I won't forget even years later.",
        "tag": "Football",
        "alt": "High-school football players in blue-and-white striped kits"
      }
    },
    {
      "id": "mezuniyet",
      "img": "assets/img/gallery/mezuniyet.jpg",
      "w": 552,
      "h": 1153,
      "tr": {
        "title": "Mezuniyet",
        "caption": "Lise diplomasını aldıktan sonra sahil yolunda. Sırada üniversite vardı.",
        "tag": "Lise mezuniyeti",
        "alt": "Deniz kenarındaki yürüyüş yolunda siyah takım elbiseli Yunus Emre"
      },
      "en": {
        "title": "Graduation",
        "caption": "On the seaside promenade after getting my high-school diploma. University was next.",
        "tag": "High-school graduation",
        "alt": "Yunus Emre in a black suit on a seaside promenade"
      }
    },
    {
      "id": "kahve",
      "img": "assets/img/gallery/kahve.jpg",
      "w": 1600,
      "h": 1521,
      "tr": {
        "title": "Kahve Molası",
        "caption": "Ders arasında sıcak bir kahve ve sakin bir an.",
        "tag": "Sosyal",
        "alt": "Bir kafede karton bardaktan kahve içen Yunus Emre"
      },
      "en": {
        "title": "Coffee Break",
        "caption": "A warm coffee and a quiet moment between classes.",
        "tag": "Social",
        "alt": "Yunus Emre drinking coffee from a paper cup in a café"
      }
    },
    {
      "id": "motor-kask",
      "img": "assets/img/gallery/motor-kask.jpg",
      "w": 1123,
      "h": 1600,
      "tr": {
        "title": "Motor Tutkusu",
        "caption": "Kask takıldı, yol başlıyor: dört duvar değil, asfalt.",
        "tag": "Yol",
        "alt": "Gece motosiklet kaskıyla çekilmiş yakın plan fotoğraf"
      },
      "en": {
        "title": "On Two Wheels",
        "caption": "Helmet on, the road begins: asphalt instead of four walls.",
        "tag": "On the road",
        "alt": "Night close-up of Yunus Emre wearing a motorcycle helmet"
      }
    },
    {
      "id": "otopark",
      "img": "assets/img/gallery/otopark.jpg",
      "w": 604,
      "h": 484,
      "tr": {
        "title": "Otopark Çekimi",
        "caption": "Gri betona inat renkli bir duruş; basketbol topu ve özgüvenle yakalanan bir kare.",
        "tag": "Fotoğraf çekimi",
        "alt": "Kapalı otoparkta basketbol topuyla çömelmiş, yüzü bandanalı Yunus Emre"
      },
      "en": {
        "title": "Car Park Shoot",
        "caption": "A colourful stance against the grey concrete, caught with a basketball and some confidence.",
        "tag": "Photo shoot",
        "alt": "Yunus Emre crouching with a basketball in an underground car park, face covered with a bandana"
      }
    },
    {
      "id": "cocukluk",
      "img": "assets/img/gallery/cocukluk.jpg",
      "w": 424,
      "h": 524,
      "tr": {
        "title": "Çocukluk",
        "caption": "İlkokul yıllarımdan bir kare; formayla poz vermek o zamandan başlamış.",
        "tag": "Anı",
        "alt": "Beyaz formalı, elleri belinde poz veren çocuk Yunus Emre"
      },
      "en": {
        "title": "Childhood",
        "caption": "A shot from my primary-school years; posing in a kit started early.",
        "tag": "Memory",
        "alt": "Young Yunus Emre posing in a white kit with hands on his hips"
      }
    },
    {
      "id": "ayna",
      "img": "assets/img/gallery/ayna.jpg",
      "w": 1600,
      "h": 1600,
      "tr": {
        "title": "Ayna Pozu",
        "caption": "Sade bir tişört ve ayna önünde gündelik bir kare.",
        "tag": "Gündelik",
        "alt": "Ayna karşısında telefonla fotoğraf çeken Yunus Emre"
      },
      "en": {
        "title": "Mirror Shot",
        "caption": "A plain T-shirt and an everyday shot in front of the mirror.",
        "tag": "Everyday",
        "alt": "Yunus Emre taking a mirror selfie with his phone"
      }
    }
  ],
  "blog": [
    {
      "id": "modern-cms-mimarileri",
      "date": "2026-11-22",
      "unit": "diamond",
      "tr": {
        "title": "Modern CMS Mimarileri: Monolitten Headless ve JAMstack'e",
        "cat": "Yazılım Mimarisi",
        "tags": [
          "#CMS",
          "#Headless",
          "#JAMstack",
          "#LocalStorage"
        ],
        "excerpt": "WordPress'ten headless sistemlere, statik site üreticilerinden bu sitenin kendi tarayıcı tabanlı CMS'ine: içerik yönetiminin nasıl değiştiğini ve hangi mimarinin ne zaman doğru olduğunu anlatıyorum.",
        "body": "<p>İçerik Yönetim Sistemi (CMS), kod bilmeyen birinin bile bir sitedeki yazıları, görselleri ve sayfaları düzenleyebilmesini sağlayan yazılımdır. Son on yılda bu sistemlerin mimarisi köklü biçimde değişti. Bu portfolyonun yönetim panelini yazarken bu farklı yaklaşımları yakından incelemem gerekti.</p>\n<h2>1. Monolitik CMS: her şey tek pakette</h2>\n<p>WordPress gibi klasik sistemlerde veritabanı, yönetim paneli ve sayfaları üreten tema aynı sunucuda, aynı uygulamanın içinde çalışır. Kurulumu kolaydır ve eklenti ekosistemi çok geniştir.</p>\n<ul>\n  <li><strong>Artısı:</strong> Hazır panel, kullanıcı yönetimi ve binlerce eklenti.</li>\n  <li><strong>Eksisi:</strong> İçerik ile görünüm birbirine sıkı bağlıdır; aynı içeriği bir mobil uygulamada kullanmak zorlaşır. Sunucu sürekli güncellenmeli ve güvenlik açıklarına karşı izlenmelidir.</li>\n</ul>\n<h2>2. Headless CMS: içerik sadece veri</h2>\n<p>“Başsız” CMS'te görünüm katmanı yoktur. İçerik bir API üzerinden JSON olarak sunulur; web sitesi, mobil uygulama ya da akıllı saat bu veriyi alıp kendi arayüzüyle gösterir. Strapi, Sanity ve Contentful bu yaklaşımın bilinen örnekleridir.</p>\n<blockquote><p>Headless düşüncenin özü şudur: içerik bir kez yazılır, her yerde gösterilir.</p></blockquote>\n<h2>3. JAMstack ve statik üretim</h2>\n<p>JAMstack (JavaScript, API'ler ve hazır işaretleme) yaklaşımında sayfalar yayından önce HTML olarak üretilir ve bir CDN üzerinden dağıtılır. Sunucuda her istekte sayfa oluşturulmadığı için siteler çok hızlı açılır ve saldırı yüzeyi küçülür. Dinamik ihtiyaçlar (form, arama, ödeme) ayrı API'lerle karşılanır.</p>\n<h2>4. Bu sitenin yaklaşımı: tarayıcı tabanlı hafif CMS</h2>\n<p>Bu portfolyo GitHub Pages ya da Vercel gibi sunucusuz ortamlarda çalışabilmeli. Bu yüzden üç katmanlı küçük bir yapı kurdum:</p>\n<ol>\n  <li><strong>Tek veri kaynağı:</strong> Tüm projeler, yazılar ve fotoğraflar <code>data.js</code> dosyasında JSON olarak durur.</li>\n  <li><strong>Ortak çizim katmanı:</strong> Aynı <code>render.js</code> fonksiyonları hem derleme sırasında statik HTML üretir hem de tarayıcıda içeriği yeniden çizer. Böylece JavaScript kapalı olsa bile içerik görünür.</li>\n  <li><strong>Yerel kayıt:</strong> Yönetim panelindeki değişiklikler <code>localStorage</code> içine kaydedilir; “data.js olarak indir” düğmesiyle yayına alınacak dosya üretilir.</li>\n</ol>\n<p>Bu yapının dürüst bir sınırı var: localStorage yalnızca o tarayıcıya aittir. Panelde yapılan değişiklik, dosya dışa aktarılıp yeniden yayınlanana kadar diğer ziyaretçilere ulaşmaz. Gerçek çok kullanıcılı bir sistemde kimlik doğrulama ve sunucu tarafı veri saklama gerekir.</p>\n<h2>Hangi mimari ne zaman?</h2>\n<ul>\n  <li><strong>Kişisel portfolyo, küçük proje:</strong> Statik site + JSON veri ya da Git tabanlı bir CMS yeterlidir.</li>\n  <li><strong>Blog veya kurumsal site, teknik olmayan editörler:</strong> Monolitik ya da yönetilen bir headless CMS.</li>\n  <li><strong>Web, mobil ve diğer kanallara aynı içerik:</strong> Headless CMS ve API öncelikli tasarım.</li>\n</ul>\n<p>Mimari seçimi bir moda değil, ihtiyaç sorusudur. Önce kimin, hangi sıklıkla ve hangi kanala içerik ürettiğini sormak, en doğru yapıyı kendiliğinden gösterir.</p>",
        "read": "2 dk okuma"
      },
      "en": {
        "title": "Modern CMS Architectures: From Monoliths to Headless and JAMstack",
        "cat": "Software Architecture",
        "tags": [
          "#CMS",
          "#Headless",
          "#JAMstack",
          "#LocalStorage"
        ],
        "excerpt": "From WordPress to headless systems, from static site generators to this site's own browser-based CMS: how content management has changed and which architecture fits when.",
        "body": "<p>A Content Management System (CMS) lets someone who doesn't write code edit the articles, images and pages of a website. Over the last decade the architecture of these systems has changed fundamentally, and building the admin panel for this portfolio made me look closely at the different approaches.</p>\n<h2>1. The monolithic CMS: everything in one package</h2>\n<p>In classic systems such as WordPress, the database, the admin panel and the theme that renders pages all run inside the same application on the same server. Setup is easy and the plugin ecosystem is huge.</p>\n<ul>\n  <li><strong>Pros:</strong> A ready-made panel, user management and thousands of plugins.</li>\n  <li><strong>Cons:</strong> Content and presentation are tightly coupled, so reusing the same content in a mobile app is awkward. The server has to be patched and watched for vulnerabilities all the time.</li>\n</ul>\n<h2>2. The headless CMS: content as pure data</h2>\n<p>A headless CMS has no presentation layer. Content is served as JSON through an API, and a website, a mobile app or a smartwatch fetches it and renders it with its own interface. Strapi, Sanity and Contentful are well-known examples.</p>\n<blockquote><p>The core idea of headless: write the content once, show it everywhere.</p></blockquote>\n<h2>3. JAMstack and static generation</h2>\n<p>With JAMstack (JavaScript, APIs and prebuilt Markup), pages are generated as HTML before deployment and served from a CDN. Because nothing is rendered on the server per request, sites load very fast and the attack surface shrinks. Dynamic needs such as forms, search or payments are handled by separate APIs.</p>\n<h2>4. This site's approach: a lightweight browser-based CMS</h2>\n<p>This portfolio has to run on serverless hosts such as GitHub Pages or Vercel, so I built a small three-layer setup:</p>\n<ol>\n  <li><strong>A single source of data:</strong> every project, article and photo lives as JSON in <code>data.js</code>.</li>\n  <li><strong>A shared rendering layer:</strong> the same <code>render.js</code> functions generate static HTML at build time and re-render content in the browser, so the content is visible even with JavaScript turned off.</li>\n  <li><strong>Local saving:</strong> edits made in the admin panel are stored in <code>localStorage</code>, and the “download as data.js” button produces the file to publish.</li>\n</ol>\n<p>This setup has an honest limit: localStorage belongs to one browser. A change made in the panel doesn't reach other visitors until the file is exported and the site is redeployed. A real multi-user system needs authentication and server-side storage.</p>\n<h2>Which architecture, when?</h2>\n<ul>\n  <li><strong>Personal portfolio or small project:</strong> a static site with JSON data, or a Git-based CMS, is enough.</li>\n  <li><strong>Blog or company site with non-technical editors:</strong> a monolithic or managed headless CMS.</li>\n  <li><strong>The same content on web, mobile and other channels:</strong> a headless CMS and API-first design.</li>\n</ul>\n<p>Choosing an architecture is a question of need, not fashion. Asking who produces content, how often and for which channels points to the right structure on its own.</p>",
        "read": "2 min read"
      }
    },
    {
      "id": "mikro-etkilesimler-glassmorphism",
      "date": "2026-11-20",
      "unit": "eye",
      "tr": {
        "title": "Modern UI/UX Tasarımında Mikro Etkileşimler ve Glassmorphism",
        "cat": "UI/UX Tasarım",
        "tags": [
          "#UIUX",
          "#MikroEtkileşim",
          "#Glassmorphism",
          "#CSS"
        ],
        "excerpt": "Bir düğmenin hafifçe parlaması ya da kartın mouse'a göre eğilmesi neden önemli? Mikro etkileşimlerin anatomisi, buzlu cam efektinin doğru kullanımı ve erişilebilirlik dengesi.",
        "body": "<p>Kullanıcıların bir arayüzü “kaliteli” bulmasının arkasında çoğu zaman fark edilmeyen küçük ayrıntılar vardır: bir düğmenin basıldığında hafifçe içe göçmesi, bir giriş kutusunun odaklandığında parlaması, bir kartın mouse'u takip ederek eğilmesi. Bunlara <strong>mikro etkileşim</strong> denir. Bu portfolyoyu tasarlarken neredeyse her öğede bu fikirden yararlandım.</p>\n<h2>Mikro etkileşimin dört parçası</h2>\n<p>Tasarımcı Dan Saffer, mikro etkileşimleri dört bileşenle tanımlar:</p>\n<ol>\n  <li><strong>Tetikleyici:</strong> Etkileşimi başlatan olay; tıklama, üzerine gelme ya da bir verinin değişmesi.</li>\n  <li><strong>Kurallar:</strong> Tetiklendiğinde ne olacağı.</li>\n  <li><strong>Geri bildirim:</strong> Kullanıcının sonucu gördüğü, duyduğu ya da hissettiği an.</li>\n  <li><strong>Döngüler ve modlar:</strong> Etkileşimin zamanla ya da farklı durumlarda nasıl değiştiği.</li>\n</ol>\n<p>Örneğin bu sitenin iletişim formunda tetikleyici alana odaklanmaktır; kural, kenarlığın renkli bir ışığa dönüşmesidir; geri bildirim ise kullanıcının hangi alanda olduğunu anında görmesidir.</p>\n<h2>Zamanlama her şeydir</h2>\n<ul>\n  <li>Küçük durum değişimleri için <strong>100–300 ms</strong> genellikle yeterlidir; daha uzunu yavaş hissettirir.</li>\n  <li>Girişte yavaşlayan (ease-out) eğriler doğal görünür; nesne “yerine oturuyor” hissi verir.</li>\n  <li>Animasyonlarda yalnızca <code>transform</code> ve <code>opacity</code> değiştirmek, tarayıcının işi ekran kartına devretmesini sağlar ve akıcılığı korur.</li>\n</ul>\n<h2>Glassmorphism: buzlu cam etkisi</h2>\n<p>Glassmorphism, yarı saydam yüzeylerin arkasındaki içeriği bulanıklaştırarak derinlik hissi yaratan bir tasarım dilidir. CSS'te temel tarifi kısadır: yarı saydam bir arka plan, ince açık renkli bir kenarlık ve <code>backdrop-filter: blur()</code>.</p>\n<blockquote><p>Cam efekti arkasında hareketli ya da renkli bir şey olduğunda anlam kazanır; düz bir zeminde yalnızca gri bir kutudur.</p></blockquote>\n<p>Bu yüzden sitede camın arkasına renkli ışık topları ve hareketli bir ağ animasyonu yerleştirdim. Ancak bu efektin iki bedeli var:</p>\n<ul>\n  <li><strong>Okunabilirlik:</strong> Arka plan değiştikçe metin kontrastı da değişir. Metnin altına yeterince koyu bir katman koymak ve WCAG kontrast oranlarını kontrol etmek gerekir.</li>\n  <li><strong>Performans:</strong> Bulanıklaştırma her karede yeniden hesaplanabilir. Ekranda aynı anda çok fazla cam yüzey olmamalı ve bulanıklık yarıçapı makul tutulmalıdır.</li>\n</ul>\n<h2>Erişilebilirlik unutulmamalı</h2>\n<p>Bazı kullanıcılar hareketli içerikten rahatsız olur ya da baş dönmesi yaşar. İşletim sistemindeki “hareketi azalt” ayarı CSS'te <code>prefers-reduced-motion</code> ile okunabilir. Bu sitede bu ayar açıksa arka plan animasyonu durur, kartlar eğilmez ve kayan yazılar sabitlenir. İyi bir mikro etkileşim, onu istemeyen kullanıcıyı da düşünür.</p>\n<p>Kısacası mikro etkileşimler arayüzün beden dilidir: doğru dozda kullanıldığında kullanıcıya ne olduğunu sessizce anlatır, fazlası ise dikkat dağıtır.</p>",
        "read": "2 dk okuma"
      },
      "en": {
        "title": "Micro-interactions and Glassmorphism in Modern UI/UX Design",
        "cat": "UI/UX Design",
        "tags": [
          "#UIUX",
          "#MicroInteractions",
          "#Glassmorphism",
          "#CSS"
        ],
        "excerpt": "Why does it matter that a button glows slightly or a card tilts with the mouse? The anatomy of micro-interactions, using frosted glass well, and the balance with accessibility.",
        "body": "<p>Behind a user's feeling that an interface is “polished” there are usually small details nobody consciously notices: a button that sinks slightly when pressed, an input that glows when focused, a card that tilts to follow the mouse. These are called <strong>micro-interactions</strong>, and I used the idea in almost every element of this portfolio.</p>\n<h2>The four parts of a micro-interaction</h2>\n<p>Designer Dan Saffer describes micro-interactions with four components:</p>\n<ol>\n  <li><strong>Trigger:</strong> the event that starts it — a click, a hover or a change in data.</li>\n  <li><strong>Rules:</strong> what happens once it is triggered.</li>\n  <li><strong>Feedback:</strong> the moment the user sees, hears or feels the result.</li>\n  <li><strong>Loops and modes:</strong> how the interaction changes over time or in different states.</li>\n</ol>\n<p>In this site's contact form, for example, the trigger is focusing a field, the rule is that the border turns into a coloured light, and the feedback is that the user instantly sees which field they are in.</p>\n<h2>Timing is everything</h2>\n<ul>\n  <li>For small state changes, <strong>100–300 ms</strong> is usually enough; anything longer feels slow.</li>\n  <li>Ease-out curves look natural because the object seems to “settle into place”.</li>\n  <li>Animating only <code>transform</code> and <code>opacity</code> lets the browser hand the work to the GPU and keeps motion smooth.</li>\n</ul>\n<h2>Glassmorphism: the frosted-glass effect</h2>\n<p>Glassmorphism is a visual language that creates depth by blurring the content behind semi-transparent surfaces. The basic CSS recipe is short: a translucent background, a thin light border and <code>backdrop-filter: blur()</code>.</p>\n<blockquote><p>Glass only means something when there is colour or motion behind it; on a flat background it is just a grey box.</p></blockquote>\n<p>That's why this site places coloured light orbs and an animated network behind the glass. The effect has two costs, though:</p>\n<ul>\n  <li><strong>Readability:</strong> as the background changes, so does text contrast. Text needs a dark enough layer beneath it, and WCAG contrast ratios should be checked.</li>\n  <li><strong>Performance:</strong> the blur may be recomputed every frame. Keep the number of glass surfaces on screen low and the blur radius reasonable.</li>\n</ul>\n<h2>Don't forget accessibility</h2>\n<p>Some people are bothered by motion or get dizzy from it. The operating system's “reduce motion” setting can be read in CSS with <code>prefers-reduced-motion</code>. When it is on, this site stops the background animation, cards no longer tilt and the marquees stand still. A good micro-interaction also respects the user who doesn't want it.</p>\n<p>In short, micro-interactions are the body language of an interface: in the right dose they quietly tell users what is happening; too much of them is just distraction.</p>",
        "read": "2 min read"
      }
    },
    {
      "id": "web-performans-optimizasyonu",
      "date": "2026-11-17",
      "unit": "cross",
      "tr": {
        "title": "Web Performans Optimizasyonu: Core Web Vitals'tan 60 FPS'e",
        "cat": "Web Geliştirme",
        "tags": [
          "#Performans",
          "#CoreWebVitals",
          "#JavaScript",
          "#Optimizasyon"
        ],
        "excerpt": "Görsel açıdan zengin bir site nasıl hızlı kalır? Google'ın Core Web Vitals ölçütleri, görsel ve font optimizasyonu, akıcı animasyonun kuralları ve canvas için pratik ipuçları.",
        "body": "<p>Bu portfolyoda arka planda sürekli hareket eden bir ağ animasyonu, buzlu cam kartlar ve onlarca fotoğraf var. Görsel olarak zengin bir sitenin yavaş olması kaçınılmaz mı? Hayır; ama performansı baştan düşünmek gerekiyor.</p>\n<h2>Core Web Vitals: hızı ölçmenin ortak dili</h2>\n<p>Google, kullanıcı deneyimini üç temel ölçütle değerlendirir. “İyi” kabul edilen eşikler şunlardır:</p>\n<ul>\n  <li><strong>LCP (Largest Contentful Paint) ≤ 2,5 sn:</strong> Sayfadaki en büyük görsel ya da metin bloğunun ekrana gelme süresi.</li>\n  <li><strong>INP (Interaction to Next Paint) ≤ 200 ms:</strong> Tıklama ve tuş basma gibi etkileşimlere sayfanın ne kadar hızlı tepki verdiği. Mart 2024'te FID ölçütünün yerini aldı.</li>\n  <li><strong>CLS (Cumulative Layout Shift) ≤ 0,1:</strong> Sayfa yüklenirken öğelerin beklenmedik şekilde kayması.</li>\n</ul>\n<h2>Görseller: en büyük kazanç</h2>\n<ol>\n  <li>Her <code>&lt;img&gt;</code> etiketine <code>width</code> ve <code>height</code> vermek, tarayıcının yeri önceden ayırmasını sağlar ve CLS'yi önler.</li>\n  <li>Ekranın altında kalan görsellere <code>loading=\"lazy\"</code> eklemek, ilk yüklemeyi hafifletir.</li>\n  <li>Ana görsele (örneğin anasayfadaki portre) <code>fetchpriority=\"high\"</code> vermek LCP'yi iyileştirir.</li>\n  <li>Görselleri gösterileceği boyuta yakın ve modern formatlarda (WebP, AVIF) sunmak dosya boyutunu ciddi ölçüde küçültür.</li>\n</ol>\n<h2>Fontlar</h2>\n<p>Bu sitede yazı tipleri harici bir servisten değil, projenin içinden <code>woff2</code> olarak yükleniyor. En kritik font <code>preload</code> ile önceden isteniyor ve <code>font-display: swap</code> sayesinde font gelene kadar metin görünmez kalmıyor.</p>\n<h2>Akıcı animasyonun kuralları</h2>\n<ul>\n  <li>Yalnızca <code>transform</code> ve <code>opacity</code> özelliklerini canlandırın; <code>width</code>, <code>top</code> gibi özellikler her karede sayfa düzeninin yeniden hesaplanmasına yol açar.</li>\n  <li>JavaScript animasyonlarını <code>setInterval</code> ile değil <code>requestAnimationFrame</code> ile çalıştırın; tarayıcı sekme gizlendiğinde bunu kendiliğinden duraklatır.</li>\n  <li>Kaydırma ve mouse olaylarını <code>passive</code> dinleyin ve her olayda değil, karede bir kez işlem yapın.</li>\n</ul>\n<h2>Canvas için pratik ipuçları</h2>\n<p>60 FPS için her karenin yaklaşık 16,7 ms içinde çizilmesi gerekir. Arka plandaki ağ animasyonunda şu önlemleri aldım:</p>\n<ul>\n  <li>Nokta sayısını ekran alanına göre hesaplayıp bir üst sınır koydum; mobilde daha az nokta çiziliyor.</li>\n  <li>Yüksek çözünürlüklü ekranlarda piksel oranını en fazla 1,75 ile sınırladım.</li>\n  <li>İki nokta arasındaki mesafeyi hesaplamadan önce kaba bir kutu kontrolü yaparak gereksiz karekök işlemlerinden kaçındım.</li>\n  <li>“Hareketi azalt” ayarı açıksa animasyon tek bir kare çizip duruyor.</li>\n</ul>\n<blockquote><p>Ölçmediğiniz şeyi iyileştiremezsiniz: Lighthouse ve tarayıcının Performance paneli, tahminden çok daha dürüsttür.</p></blockquote>\n<p>Performans bir son kontrol değil, tasarımın bir parçasıdır. Görsel zenginlik ile hız arasındaki dengeyi kurmak, iyi bir ön yüz geliştiricisinin en değerli becerilerinden biridir.</p>",
        "read": "2 dk okuma"
      },
      "en": {
        "title": "Web Performance Optimization: From Core Web Vitals to 60 FPS",
        "cat": "Web Development",
        "tags": [
          "#Performance",
          "#CoreWebVitals",
          "#JavaScript",
          "#Optimization"
        ],
        "excerpt": "How does a visually rich site stay fast? Google's Core Web Vitals, image and font optimization, the rules of smooth animation, and practical tips for canvas.",
        "body": "<p>This portfolio has a constantly moving network animation in the background, frosted-glass cards and dozens of photos. Is a visually rich site doomed to be slow? No — but performance has to be considered from the start.</p>\n<h2>Core Web Vitals: a shared language for speed</h2>\n<p>Google evaluates user experience with three core metrics. The thresholds considered “good” are:</p>\n<ul>\n  <li><strong>LCP (Largest Contentful Paint) ≤ 2.5 s:</strong> how long the largest image or text block takes to appear.</li>\n  <li><strong>INP (Interaction to Next Paint) ≤ 200 ms:</strong> how quickly the page responds to clicks and key presses. It replaced FID in March 2024.</li>\n  <li><strong>CLS (Cumulative Layout Shift) ≤ 0.1:</strong> unexpected movement of elements while the page loads.</li>\n</ul>\n<h2>Images: the biggest win</h2>\n<ol>\n  <li>Giving every <code>&lt;img&gt;</code> a <code>width</code> and <code>height</code> lets the browser reserve space up front and prevents CLS.</li>\n  <li>Adding <code>loading=\"lazy\"</code> to images below the fold makes the first load lighter.</li>\n  <li>Giving the main image (such as the portrait on the home page) <code>fetchpriority=\"high\"</code> improves LCP.</li>\n  <li>Serving images close to their display size and in modern formats (WebP, AVIF) cuts file size dramatically.</li>\n</ol>\n<h2>Fonts</h2>\n<p>On this site, fonts are loaded as <code>woff2</code> files from the project itself rather than an external service. The most important font is requested early with <code>preload</code>, and <code>font-display: swap</code> keeps text visible while fonts arrive.</p>\n<h2>Rules for smooth animation</h2>\n<ul>\n  <li>Animate only <code>transform</code> and <code>opacity</code>; properties like <code>width</code> or <code>top</code> force the layout to be recalculated every frame.</li>\n  <li>Run JavaScript animation with <code>requestAnimationFrame</code>, not <code>setInterval</code>; the browser pauses it automatically when the tab is hidden.</li>\n  <li>Listen to scroll and mouse events as <code>passive</code>, and do the work once per frame rather than on every event.</li>\n</ul>\n<h2>Practical tips for canvas</h2>\n<p>For 60 FPS, each frame has to be drawn in roughly 16.7 ms. In the background network animation I took these measures:</p>\n<ul>\n  <li>The number of nodes is calculated from the screen area and capped; phones draw fewer nodes.</li>\n  <li>On high-density screens, the pixel ratio is capped at 1.75.</li>\n  <li>A cheap bounding-box check runs before computing the distance between two nodes, avoiding needless square roots.</li>\n  <li>When “reduce motion” is on, the animation draws a single frame and stops.</li>\n</ul>\n<blockquote><p>You can't improve what you don't measure: Lighthouse and the browser's Performance panel are far more honest than guesswork.</p></blockquote>\n<p>Performance isn't a final check; it is part of the design. Balancing visual richness with speed is one of the most valuable skills a front-end developer can have.</p>",
        "read": "2 min read"
      }
    },
    {
      "id": "vibe-coding",
      "date": "2026-11-14",
      "unit": "star",
      "tr": {
        "title": "Yapay Zekâ Destekli Yazılım Geliştirme: Vibe Coding Nedir?",
        "cat": "Yazılım Geliştirme",
        "tags": [
          "#YapayZeka",
          "#VibeCoding",
          "#Python",
          "#Verimlilik"
        ],
        "read": "6 dk okuma",
        "excerpt": "Kodu satır satır yazmak yerine ne istediğinizi anlatıp yapay zekâya yazdırmak: hızlı mı, riskli mi? Bir öğrenci gözüyle vibe coding'in artıları, tuzakları ve sağlıklı kullanım listesi.",
        "body": "<p>Şubat 2025'te yapay zekâ araştırmacısı Andrej Karpathy, kod yazmanın yeni bir biçimini tarif etmek için “vibe coding” ifadesini kullandı: Programcı ne istediğini doğal dille anlatıyor, kodu büyük ölçüde bir dil modeli yazıyor, insan ise sonucu çalıştırıp hissiyata göre yön veriyor. Terim kısa sürede yazılım dünyasının en çok konuşulan kavramlarından biri oldu.</p>\n<p>Bilgisayar programcılığı öğrencisi olarak bu konu beni doğrudan ilgilendiriyor. Çünkü bir yandan algoritma ve sözdizimi öğreniyoruz, öte yandan aynı işi saniyeler içinde yapabilen araçlar her gün daha iyi hâle geliyor. Peki bu araçları nasıl kullanmalıyız?</p>\n\n<h2>Vibe coding nasıl işler?</h2>\n<p>Süreç, klasik “yaz, derle, hata ayıkla” döngüsünün konuşmaya dönüşmüş hâlidir:</p>\n<ol>\n  <li><strong>İsteği tarif et:</strong> “Bir CSV dosyasındaki notların ortalamasını hesaplayan bir Python betiği yaz.”</li>\n  <li><strong>Üretilen kodu çalıştır:</strong> Model bir taslak verir, siz onu çalıştırırsınız.</li>\n  <li><strong>Geri bildirim ver:</strong> Hata mesajını ya da beklenmeyen çıktıyı modele geri yapıştırırsınız.</li>\n  <li><strong>Tekrarla:</strong> Program istediğiniz gibi çalışana kadar döngü sürer.</li>\n</ol>\n<p>Bu yaklaşımda klavyeden çok fikir ve doğrulama önemlidir. Ne istediğini net anlatabilen kişi daha iyi sonuç alır.</p>\n\n<h2>Nerede gerçekten işe yarıyor?</h2>\n<ul>\n  <li><strong>Hızlı prototipler:</strong> Bir fikrin işe yarayıp yaramadığını görmek için birkaç saatte çalışan bir taslak çıkarmak.</li>\n  <li><strong>Tekrarlayan kod:</strong> Form doğrulama, dosya okuma, basit API istekleri gibi her projede yazılan kalıplar.</li>\n  <li><strong>Öğrenme:</strong> Bilmediğiniz bir kütüphaneyi örnek kod üzerinden tanımak ve “bu satır ne yapıyor?” diye sormak.</li>\n  <li><strong>Küçük araçlar:</strong> Kendi işinizi kolaylaştıran tek seferlik betikler.</li>\n</ul>\n\n<h2>Dikkat edilmesi gereken tuzaklar</h2>\n<p>Yapay zekâ çok emin bir dille yanlış kod da yazabilir. En sık karşılaşılan sorunlar şunlar:</p>\n<ul>\n  <li><strong>Anlamadığın kodu teslim etmek:</strong> Çalışıyor diye kabul edilen ama mantığı bilinmeyen kod, ilk hatada içinden çıkılmaz hâle gelir.</li>\n  <li><strong>Güvenlik açıkları:</strong> Şifrelerin koda gömülmesi, kullanıcı girdisinin kontrol edilmemesi gibi hatalar sık görülür.</li>\n  <li><strong>Var olmayan kütüphaneler:</strong> Model bazen gerçekte olmayan bir paket ya da fonksiyon adı uydurabilir.</li>\n  <li><strong>Test eksikliği:</strong> Bir kez doğru sonuç veren kod, farklı girdilerde bozulabilir.</li>\n</ul>\n<blockquote>Yapay zekâ kodu yazabilir; ama o kodun sorumluluğu her zaman onu projeye ekleyen kişidedir.</blockquote>\n\n<h2>Bir öğrenci için sağlıklı kullanım listesi</h2>\n<ul>\n  <li>Üretilen her satırı oku; anlamadığın yeri modele açıklat.</li>\n  <li>Önce problemi kendin çözmeyi dene, sonra yapay zekânın çözümüyle karşılaştır.</li>\n  <li>Küçük adımlarla ilerle: tek seferde koca bir program yerine fonksiyon fonksiyon iste.</li>\n  <li>Her önemli fonksiyon için en az bir basit test yaz, örneğin <code>assert ortalama([2, 4]) == 3</code>.</li>\n  <li>Kişisel veriyi, şifreyi ya da API anahtarını asla sohbete yapıştırma.</li>\n  <li>Ödev ve sınav kurallarına uy; yapay zekâ kullanımına izin verilip verilmediğini öğren.</li>\n</ul>\n\n<h2>Sonuç</h2>\n<p>Vibe coding programlamayı bitirmiyor, programcının rolünü değiştiriyor. Artık iyi bir geliştirici yalnızca kod yazan değil; doğru soruyu soran, çıktıyı değerlendiren ve sistemi bütün olarak düşünen kişi. Bu yüzden temel bilgiyi öğrenmek eskisinden daha da önemli: Yapay zekânın hatasını ancak konuyu bilen biri yakalayabilir.</p>"
      },
      "en": {
        "title": "AI-Assisted Software Development: What Is Vibe Coding?",
        "cat": "Software Development",
        "tags": [
          "#AI",
          "#VibeCoding",
          "#Python",
          "#Productivity"
        ],
        "read": "6 min read",
        "excerpt": "Describing what you want and letting an AI write the code instead of typing it line by line: fast or risky? Vibe coding's upsides, traps and a healthy-use checklist, from a student's point of view.",
        "body": "<p>In February 2025, AI researcher Andrej Karpathy used the phrase “vibe coding” to describe a new way of writing software: the programmer explains what they want in plain language, a language model writes most of the code, and the human runs the result and steers by feel. The term quickly became one of the most talked-about ideas in software.</p>\n<p>As a computer programming student, this concerns me directly. On one hand we are learning algorithms and syntax; on the other, tools that can do the same job in seconds get better every day. So how should we use them?</p>\n\n<h2>How does vibe coding work?</h2>\n<p>It is the classic “write, compile, debug” loop turned into a conversation:</p>\n<ol>\n  <li><strong>Describe the goal:</strong> “Write a Python script that averages the grades in a CSV file.”</li>\n  <li><strong>Run the generated code:</strong> The model gives you a draft and you run it.</li>\n  <li><strong>Give feedback:</strong> You paste the error message or the unexpected output back to the model.</li>\n  <li><strong>Repeat:</strong> The loop continues until the program does what you want.</li>\n</ol>\n<p>Ideas and verification matter more than typing here. Whoever can describe the goal clearly gets the better result.</p>\n\n<h2>Where does it really help?</h2>\n<ul>\n  <li><strong>Quick prototypes:</strong> getting a working draft in a few hours to see whether an idea holds up.</li>\n  <li><strong>Repetitive code:</strong> form validation, file reading, simple API calls, the patterns every project needs.</li>\n  <li><strong>Learning:</strong> exploring an unfamiliar library through example code and asking “what does this line do?”</li>\n  <li><strong>Small tools:</strong> one-off scripts that make your own work easier.</li>\n</ul>\n\n<h2>Traps to watch for</h2>\n<p>An AI can write wrong code in a very confident voice. The most common problems are:</p>\n<ul>\n  <li><strong>Shipping code you don't understand:</strong> code accepted because it runs, without knowing its logic, becomes impossible to fix at the first bug.</li>\n  <li><strong>Security holes:</strong> passwords hard-coded into the source and unchecked user input show up often.</li>\n  <li><strong>Libraries that don't exist:</strong> a model sometimes invents a package or function name.</li>\n  <li><strong>Missing tests:</strong> code that gave the right answer once can break on different input.</li>\n</ul>\n<blockquote>The AI can write the code, but responsibility for it always stays with the person who adds it to the project.</blockquote>\n\n<h2>A healthy-use checklist for students</h2>\n<ul>\n  <li>Read every generated line, and ask the model to explain anything you don't understand.</li>\n  <li>Try to solve the problem yourself first, then compare with the AI's solution.</li>\n  <li>Move in small steps: ask for one function at a time instead of a whole program.</li>\n  <li>Write at least one simple test for each important function, e.g. <code>assert average([2, 4]) == 3</code>.</li>\n  <li>Never paste personal data, passwords or API keys into the chat.</li>\n  <li>Follow your course rules: find out whether AI use is allowed for each assignment or exam.</li>\n</ul>\n\n<h2>Conclusion</h2>\n<p>Vibe coding doesn't end programming; it changes the programmer's role. A good developer is no longer only someone who types code, but someone who asks the right question, judges the output and thinks about the system as a whole. That makes learning the fundamentals more important than ever: only someone who knows the subject can catch the AI's mistakes.</p>"
      }
    },
    {
      "id": "renk-teorisi",
      "date": "2026-10-29",
      "unit": "knot",
      "tr": {
        "title": "Adobe Photoshop ve Dijital Tasarımda Renk Teorisi",
        "cat": "Dijital Tasarım",
        "tags": [
          "#Photoshop",
          "#RenkTeorisi",
          "#GrafikTasarım",
          "#Afiş"
        ],
        "read": "7 dk okuma",
        "excerpt": "Renk çemberi, uyum şemaları, 60-30-10 kuralı ve Photoshop'ta rengi kontrol etmenin pratik yolları; renklendirme ve afiş projelerimden örneklerle.",
        "body": "<p>Bir tasarımı ilk bakışta “doğru” ya da “yanlış” hissettiren şeyin büyük kısmı renktir. Photoshop'ta yaptığım karakalem renklendirme, siyah beyaz kontrast ve ürün afişi çalışmalarında en çok zaman harcadığım konu da buydu. Bu yazıda renk teorisinin temellerini ve Photoshop'ta bunları uygulamanın pratik yollarını özetliyorum.</p>\n\n<h2>Renk çemberi ve üç temel özellik</h2>\n<p>Dijital tasarımda bir rengi üç özellikle düşünmek işi kolaylaştırır. Photoshop'un renk seçicisindeki <strong>HSB</strong> modeli de tam olarak bunu gösterir:</p>\n<ul>\n  <li><strong>Ton (Hue):</strong> Rengin kendisi; kırmızı, sarı, mavi… Çember üzerindeki açısıyla ifade edilir.</li>\n  <li><strong>Doygunluk (Saturation):</strong> Rengin ne kadar canlı ya da gri olduğu.</li>\n  <li><strong>Parlaklık (Brightness):</strong> Rengin ne kadar açık ya da koyu olduğu.</li>\n</ul>\n<p>Ekranda çalışırken renkler <strong>RGB</strong> ile, baskıya giden işlerde ise <strong>CMYK</strong> ile tanımlanır. Afişi baskıya göndermeden önce renk modunu kontrol etmek, ekranda canlı görünen bir rengin kâğıtta soluk çıkmasını önler.</p>\n\n<h2>Uyum şemaları</h2>\n<ul>\n  <li><strong>Tamamlayıcı:</strong> Çemberde karşı karşıya olan renkler (mavi ve turuncu gibi). En güçlü kontrastı verir; vurgu için idealdir.</li>\n  <li><strong>Komşu (analog):</strong> Yan yana duran renkler (sarı, turuncu, kırmızı). Sakin ve bütünlüklü bir his yaratır.</li>\n  <li><strong>Üçlü (triadik):</strong> Çemberde eşit aralıklı üç renk. Enerjik ama dengelenmesi zor.</li>\n  <li><strong>Tek renkli:</strong> Aynı tonun farklı açık-koyu değerleri. Minimal ve şık tasarımlar için güvenli seçim.</li>\n</ul>\n\n<h2>60-30-10 kuralı</h2>\n<p>Bir kompozisyonda renk ağırlığını dağıtmak için kullanılan basit bir kuraldır: Alanın yaklaşık %60'ı baskın renk, %30'u ikincil renk, %10'u vurgu rengi olur. Ürün tanıtım afişimde sarı zemin baskın renk, beyaz ürün tüpü ikincil renk, turuncu SPF etiketi ise vurgu rengiydi. Böylece göz önce ürüne, sonra slogana gidiyor.</p>\n\n<h2>Photoshop'ta rengi kontrol etmenin yolları</h2>\n<ul>\n  <li><strong>Ayarlama katmanları (Adjustment Layers):</strong> Hue/Saturation, Color Balance ve Curves ile rengi orijinal pikselleri bozmadan değiştirebilirsiniz. Beğenmezseniz katmanı silmeniz yeterli.</li>\n  <li><strong>Karışım modları:</strong> Karakalem bir çizimi renklendirirken renkleri ayrı bir katmana boyayıp katmanı <em>Color</em> ya da <em>Soft Light</em> moduna almak, çizgilerin ve gölgelerin korunmasını sağlar.</li>\n  <li><strong>Seçici renk:</strong> Görseli Black &amp; White ayarlama katmanıyla griye çevirip katman maskesinde istediğiniz alanı silerseniz, o bölge renkli kalır. Siyah beyaz kontrast projemde oyuncuyu bu yöntemle öne çıkardım.</li>\n  <li><strong>Gradient Map:</strong> Fotoğrafın açık ve koyu tonlarını seçtiğiniz renklere eşleyerek tutarlı bir atmosfer oluşturur.</li>\n  <li><strong>Örnek renk paletleri:</strong> Adobe Color gibi araçlarla bir fotoğraftan palet çıkarıp Swatches paneline kaydetmek, tüm tasarımda aynı renkleri kullanmanızı sağlar.</li>\n</ul>\n\n<h2>Renk psikolojisi ve erişilebilirlik</h2>\n<p>Renklerin çağrışımları vardır: Sarı enerji ve güneşi, mavi güveni ve sakinliği, kırmızı tutku ve aciliyeti anlatır. Ancak çağrışımdan önce okunabilirlik gelir. Metin ile arka plan arasında yeterli kontrast yoksa en güzel palet bile işe yaramaz. Web'de normal metin için en az <strong>4.5:1</strong> kontrast oranı önerilir. Ayrıca bilgiyi yalnızca renkle değil, şekil ya da yazıyla da vermek renk körlüğü olan kullanıcıları düşünmek demektir.</p>\n\n<blockquote>İyi bir palet az renkten oluşur; her rengin bir görevi vardır.</blockquote>\n\n<h2>Sonuç</h2>\n<p>Renk teorisi kural ezberlemekten çok bilinçli seçim yapmakla ilgili. Tasarıma başlamadan önce baskın, ikincil ve vurgu rengini belirlemek, Photoshop'ta ise değişiklikleri ayarlama katmanlarıyla tahribatsız yapmak hem zamandan kazandırıyor hem de sonucu daha profesyonel gösteriyor.</p>"
      },
      "en": {
        "title": "Color Theory in Adobe Photoshop and Digital Design",
        "cat": "Digital Design",
        "tags": [
          "#Photoshop",
          "#ColorTheory",
          "#GraphicDesign",
          "#Poster"
        ],
        "read": "7 min read",
        "excerpt": "The colour wheel, harmony schemes, the 60-30-10 rule and practical ways to control colour in Photoshop, with examples from my colorization and poster projects.",
        "body": "<p>Much of what makes a design feel “right” or “wrong” at first glance is colour. It was also what I spent the most time on in my Photoshop work: the charcoal colorization, the black-and-white contrast piece and the product poster. In this article I summarise the basics of colour theory and practical ways to apply them in Photoshop.</p>\n\n<h2>The colour wheel and three properties</h2>\n<p>In digital design it helps to think of a colour through three properties. The <strong>HSB</strong> model in Photoshop's colour picker shows exactly that:</p>\n<ul>\n  <li><strong>Hue:</strong> the colour itself, red, yellow, blue… expressed as its angle on the wheel.</li>\n  <li><strong>Saturation:</strong> how vivid or grey the colour is.</li>\n  <li><strong>Brightness:</strong> how light or dark it is.</li>\n</ul>\n<p>On screen, colours are defined in <strong>RGB</strong>; for print, in <strong>CMYK</strong>. Checking the colour mode before sending a poster to print prevents a colour that glows on screen from coming out dull on paper.</p>\n\n<h2>Harmony schemes</h2>\n<ul>\n  <li><strong>Complementary:</strong> colours opposite each other on the wheel (like blue and orange). The strongest contrast, ideal for emphasis.</li>\n  <li><strong>Analogous:</strong> neighbouring colours (yellow, orange, red). Calm and unified.</li>\n  <li><strong>Triadic:</strong> three evenly spaced colours. Energetic but hard to balance.</li>\n  <li><strong>Monochromatic:</strong> lighter and darker values of one hue. A safe choice for minimal, elegant designs.</li>\n</ul>\n\n<h2>The 60-30-10 rule</h2>\n<p>A simple rule for distributing colour weight: about 60% of the area is the dominant colour, 30% the secondary colour and 10% the accent. In my product poster, the yellow background was dominant, the white tube secondary and the orange SPF label the accent, so the eye goes to the product first and then to the slogan.</p>\n\n<h2>Ways to control colour in Photoshop</h2>\n<ul>\n  <li><strong>Adjustment layers:</strong> Hue/Saturation, Color Balance and Curves change colour without destroying the original pixels. If you don't like the result, just delete the layer.</li>\n  <li><strong>Blend modes:</strong> when colorizing a charcoal drawing, painting colour on a separate layer set to <em>Color</em> or <em>Soft Light</em> keeps the lines and shading intact.</li>\n  <li><strong>Selective colour:</strong> turn the image grey with a Black &amp; White adjustment layer, then erase the area you want in its mask, and that region stays in colour. That's how I made the player stand out in my black-and-white contrast project.</li>\n  <li><strong>Gradient Map:</strong> maps the light and dark tones of a photo to colours you choose, creating a consistent mood.</li>\n  <li><strong>Saved palettes:</strong> extracting a palette from a photo with a tool like Adobe Color and saving it to the Swatches panel keeps the same colours across the whole design.</li>\n</ul>\n\n<h2>Colour psychology and accessibility</h2>\n<p>Colours carry associations: yellow speaks of energy and sunshine, blue of trust and calm, red of passion and urgency. But readability comes before association. Without enough contrast between text and background, even the most beautiful palette fails. On the web, a contrast ratio of at least <strong>4.5:1</strong> is recommended for normal text. Conveying information through shape or text as well as colour also means thinking about colour-blind users.</p>\n\n<blockquote>A good palette has few colours, and every colour has a job.</blockquote>\n\n<h2>Conclusion</h2>\n<p>Colour theory is less about memorising rules and more about making deliberate choices. Deciding the dominant, secondary and accent colours before you start, and making changes non-destructively with adjustment layers in Photoshop, saves time and makes the result look more professional.</p>"
      }
    },
    {
      "id": "responsive-tasarim",
      "date": "2026-10-08",
      "unit": "hook",
      "tr": {
        "title": "Modern Web Geliştirmede Responsive Tasarım İlkeleri",
        "cat": "Web Geliştirme",
        "tags": [
          "#Responsive",
          "#CSS",
          "#MobilÖncelikli",
          "#Erişilebilirlik"
        ],
        "read": "8 dk okuma",
        "excerpt": "Viewport etiketinden clamp() ile akışkan yazıya, CSS Grid'den duyarlı görsellere: bir sitenin telefonda, tablette ve masaüstünde düzgün görünmesi için gereken temel ilkeler.",
        "body": "<p>Bugün bir web sitesine gelen ziyaretçilerin büyük bölümü telefondan bağlanıyor. Aynı sayfanın 360 piksellik bir ekranda da 1920 piksellik bir monitörde de rahat okunması gerekiyor. Responsive (duyarlı) tasarım, tek bir kod tabanıyla tüm ekranlara uyum sağlamanın yoludur. Bu portfolyo sitesini yeniden tasarlarken uyguladığım ilkeleri aşağıda topladım.</p>\n\n<h2>1. Viewport etiketiyle başla</h2>\n<p>Bu satır olmadan mobil tarayıcılar sayfayı masaüstü genişliğinde çizip küçültür:</p>\n<p><code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code></p>\n\n<h2>2. Mobil öncelikli düşün</h2>\n<p>Önce en küçük ekran için tasarlayıp genişledikçe özellik eklemek, tersinden daha kolaydır. Küçük ekran sizi neyin gerçekten önemli olduğuna karar vermeye zorlar. CSS'te bu, temel stilleri yazıp büyük ekranlar için <code>@media (min-width: …)</code> blokları eklemek anlamına gelir.</p>\n\n<h2>3. Akışkan ızgaralar: Grid ve Flexbox</h2>\n<p>Sabit piksel genişlikleri yerine oranlarla çalışmak gerekir. CSS Grid'in şu satırı, sütun sayısını ekran genişliğine göre kendiliğinden ayarlar:</p>\n<p><code>grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));</code></p>\n<p>Flexbox ise <code>flex-wrap: wrap</code> ile sığmayan öğeleri alt satıra taşır. Böylece çoğu durumda medya sorgusu yazmaya bile gerek kalmaz.</p>\n\n<h2>4. clamp() ile akışkan yazı boyutları</h2>\n<p>Başlıkların her ekranda orantılı görünmesi için <code>clamp()</code> fonksiyonu çok kullanışlıdır:</p>\n<p><code>font-size: clamp(2rem, 5vw, 4rem);</code></p>\n<p>Bu tanım, yazının en az 2rem, en fazla 4rem olmasını, arada ise ekran genişliğiyle büyümesini sağlar. Gövde metninde ise satır uzunluğunu 65–75 karakter civarında tutmak okumayı kolaylaştırır.</p>\n\n<h2>5. Kırılma noktalarını içerik belirlesin</h2>\n<p>“iPhone genişliği”, “tablet genişliği” gibi cihaz ölçülerine göre değil, tasarımın bozulmaya başladığı yere göre kırılma noktası koyun. Tarayıcı penceresini yavaşça daraltın; düzen sıkıştığı anda bir medya sorgusu eklemenin zamanı gelmiştir.</p>\n\n<h2>6. Duyarlı görseller</h2>\n<ul>\n  <li><code>img { max-width: 100%; height: auto; }</code> görsellerin taşmasını engeller.</li>\n  <li><code>aspect-ratio</code> ve <code>object-fit: cover</code>, farklı boyuttaki fotoğrafları aynı çerçevede düzgün kırpar.</li>\n  <li><code>width</code> ve <code>height</code> niteliklerini yazmak, görsel yüklenirken sayfanın zıplamasını önler.</li>\n  <li><code>loading=\"lazy\"</code>, ekranın altında kalan görsellerin sonradan yüklenmesini sağlar.</li>\n  <li><code>srcset</code> ile küçük ekranlara daha küçük dosya göndermek veri tasarrufu sağlar.</li>\n</ul>\n\n<h2>7. Dokunmayı ve erişilebilirliği unutma</h2>\n<p>Telefonda fare yoktur; düğmeler ve bağlantılar parmakla rahat basılabilecek büyüklükte, yaklaşık 44×44 piksel olmalıdır. Klavye ile gezen kullanıcılar için odak çerçevesi görünür kalmalı, metin ile arka plan arasındaki kontrast yeterli olmalıdır.</p>\n\n<blockquote>Responsive tasarım bir özellik değil, bir zorunluluktur: Ziyaretçi sitenizi hangi cihazdan açacağını size sormaz.</blockquote>\n\n<h2>8. Gerçek cihazlarda test et</h2>\n<p>Tarayıcının geliştirici araçlarındaki cihaz görünümü iyi bir başlangıçtır, ancak sayfayı mutlaka gerçek bir telefonda da açın. Yazı boyutu, dokunma alanları ve kaydırma hissi ancak böyle anlaşılır.</p>\n\n<h2>Sonuç</h2>\n<p>Akışkan ızgaralar, <code>clamp()</code> ile ölçeklenen yazılar, içerikten doğan kırılma noktaları ve duyarlı görseller bir araya geldiğinde site her ekranda kendini doğal hisseder. Bu sitenin kenar menüsünün telefonda üst çubuğa dönüşmesi ve kartların tek sütuna inmesi de aynı ilkelerin sonucu.</p>"
      },
      "en": {
        "title": "Principles of Responsive Design in Modern Web Development",
        "cat": "Web Development",
        "tags": [
          "#Responsive",
          "#CSS",
          "#MobileFirst",
          "#Accessibility"
        ],
        "read": "8 min read",
        "excerpt": "From the viewport tag to fluid type with clamp(), from CSS Grid to responsive images: the core principles that make a site look right on phones, tablets and desktops.",
        "body": "<p>Today most visitors reach a website from a phone. The same page has to read comfortably on a 360-pixel screen and on a 1920-pixel monitor. Responsive design is how a single codebase adapts to every screen. Below are the principles I applied while redesigning this portfolio site.</p>\n\n<h2>1. Start with the viewport tag</h2>\n<p>Without this line, mobile browsers render the page at desktop width and shrink it:</p>\n<p><code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"&gt;</code></p>\n\n<h2>2. Think mobile-first</h2>\n<p>Designing for the smallest screen first and adding features as it grows is easier than the reverse. A small screen forces you to decide what really matters. In CSS, that means writing the base styles and adding <code>@media (min-width: …)</code> blocks for larger screens.</p>\n\n<h2>3. Fluid grids: Grid and Flexbox</h2>\n<p>Work with proportions instead of fixed pixel widths. This line of CSS Grid adjusts the number of columns to the screen width on its own:</p>\n<p><code>grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));</code></p>\n<p>Flexbox, with <code>flex-wrap: wrap</code>, moves items that don't fit to the next line. In many cases you don't even need a media query.</p>\n\n<h2>4. Fluid type with clamp()</h2>\n<p>To keep headings proportional on every screen, <code>clamp()</code> is very handy:</p>\n<p><code>font-size: clamp(2rem, 5vw, 4rem);</code></p>\n<p>This keeps the text at least 2rem and at most 4rem, growing with the screen width in between. For body text, keeping lines around 65–75 characters long makes reading easier.</p>\n\n<h2>5. Let content set the breakpoints</h2>\n<p>Place breakpoints where the design starts to break, not at device sizes like “iPhone width” or “tablet width”. Slowly narrow the browser window; the moment the layout gets cramped is the time to add a media query.</p>\n\n<h2>6. Responsive images</h2>\n<ul>\n  <li><code>img { max-width: 100%; height: auto; }</code> stops images from overflowing.</li>\n  <li><code>aspect-ratio</code> and <code>object-fit: cover</code> crop photos of different sizes neatly into the same frame.</li>\n  <li>Setting <code>width</code> and <code>height</code> attributes prevents the page from jumping while images load.</li>\n  <li><code>loading=\"lazy\"</code> delays images below the fold until they're needed.</li>\n  <li><code>srcset</code> sends smaller files to small screens and saves data.</li>\n</ul>\n\n<h2>7. Don't forget touch and accessibility</h2>\n<p>Phones have no mouse; buttons and links should be big enough to tap comfortably, about 44×44 pixels. For keyboard users the focus outline must stay visible, and text must have enough contrast against its background.</p>\n\n<blockquote>Responsive design isn't a feature, it's a requirement: visitors don't ask which device you'd like them to use.</blockquote>\n\n<h2>8. Test on real devices</h2>\n<p>The device view in the browser's developer tools is a good start, but always open the page on a real phone too. Text size, tap targets and the feel of scrolling only become clear that way.</p>\n\n<h2>Conclusion</h2>\n<p>Fluid grids, type that scales with <code>clamp()</code>, breakpoints that come from the content and responsive images together make a site feel natural on every screen. This site's side menu turning into a top bar on phones and its cards dropping to a single column are results of the same principles.</p>"
      }
    }
  ],
  "about": {
    "facts": [
      {
        "tr": [
          "Doğum",
          "25.07.2006, Antalya"
        ],
        "en": [
          "Born",
          "25 July 2006, Antalya"
        ]
      },
      {
        "tr": [
          "Okul",
          "Akdeniz Üniversitesi"
        ],
        "en": [
          "School",
          "Akdeniz University"
        ]
      },
      {
        "tr": [
          "Bölüm",
          "Bilgisayar Programcılığı"
        ],
        "en": [
          "Program",
          "Computer Programming"
        ]
      },
      {
        "tr": [
          "Odak",
          "Python · Yapay zekâ · Photoshop"
        ],
        "en": [
          "Focus",
          "Python · AI · Photoshop"
        ]
      }
    ],
    "summary": {
      "tr": "Teknik altyapımı Python ve yapay zekâ araştırmalarıyla birleştiriyor, boş zamanımda Photoshop'ta tasarlıyorum.",
      "en": "I combine my technical training with my own Python and AI research, and design in Photoshop in my spare time."
    },
    "bio": {
      "tr": [
        "25 Temmuz 2006'da Antalya'da doğdum. Yeniliklere açık, hem kod yazan hem tasarlayan bir uygulama geliştirici olmak için çalışıyorum.",
        "Akdeniz Üniversitesi Bilgisayar Programcılığı bölümünde edindiğim teknik altyapıyı Python ve yapay zekâ alanındaki kişisel araştırmalarımla birleştiriyorum. Amacım, karmaşık sorunlara estetik ve işlevsel yazılım çözümleri getirerek dijital dünyada fark yaratmak.",
        "Kod yazmadığım zamanlarda Photoshop'ta karakalem çizimleri renklendiriyor, afiş ve kompozisyonlar hazırlıyorum. Sahada ise futbol ve basketbol oynuyorum; takım oyunundan öğrendiğim disiplin, projelerimde de işime yarıyor."
      ],
      "en": [
        "I was born in Antalya on 25 July 2006. I'm working to become an application developer who is open to new ideas and who both codes and designs.",
        "I combine the technical foundation I'm building in Akdeniz University's Computer Programming program with my own research in Python and artificial intelligence. My goal is to make a difference in the digital world by bringing aesthetic and functional software solutions to complex problems.",
        "When I'm not coding, I colorize charcoal drawings and build posters and compositions in Photoshop. On the pitch I play football and basketball; the discipline I learned from team sports helps in my projects too."
      ]
    },
    "education": [
      {
        "years": "2025 –",
        "current": true,
        "tr": {
          "school": "Akdeniz Üniversitesi",
          "program": "Bilgisayar Programcılığı"
        },
        "en": {
          "school": "Akdeniz University",
          "program": "Computer Programming"
        }
      },
      {
        "years": "2019 – 2023",
        "tr": {
          "school": "Karatay Anadolu Lisesi",
          "program": "Lise"
        },
        "en": {
          "school": "Karatay Anatolian High School",
          "program": "High school"
        }
      },
      {
        "years": "2011 – 2019",
        "tr": {
          "school": "Mareşal Fevzi Çakmak",
          "program": "İlkokul ve Ortaokul"
        },
        "en": {
          "school": "Mareşal Fevzi Çakmak",
          "program": "Primary and secondary school"
        }
      }
    ],
    "personal": [
      {
        "tr": [
          "Ad Soyad",
          "Yunus Emre Ersoy"
        ],
        "en": [
          "Name",
          "Yunus Emre Ersoy"
        ]
      },
      {
        "tr": [
          "Doğum",
          "25.07.2006, Antalya"
        ],
        "en": [
          "Born",
          "25 July 2006, Antalya"
        ]
      },
      {
        "tr": [
          "Konum",
          "Antalya / Kepez, Türkiye"
        ],
        "en": [
          "Location",
          "Antalya / Kepez, Türkiye"
        ],
        "field": "location"
      },
      {
        "tr": [
          "E-posta",
          "yeersoy.0715@gmail.com"
        ],
        "en": [
          "Email",
          "yeersoy.0715@gmail.com"
        ],
        "field": "email"
      },
      {
        "tr": [
          "Teknik",
          "Python ve algoritma · Web tasarım (HTML/CSS) · Veri analizi · Proje yönetimi"
        ],
        "en": [
          "Technical",
          "Python and algorithms · Web design (HTML/CSS) · Data analysis · Project management"
        ]
      }
    ],
    "skills": [
      {
        "name": "Python",
        "value": 86,
        "tr": "Yapay zekâ ve veri bilimi projelerinin temelinde ilerliyorum.",
        "en": "Building the foundations for AI and data science projects."
      },
      {
        "name": "Photoshop",
        "value": 80,
        "tr": "Görsel düzenleme ve dijital illüstrasyon.",
        "en": "Photo editing and digital illustration."
      },
      {
        "name": "HTML · CSS",
        "value": 73,
        "tr": "Web sitelerinin yapısı ve tasarım estetiği.",
        "en": "Structure and visual design of websites."
      },
      {
        "name": "JavaScript",
        "value": 25,
        "tr": "Web sayfalarına etkileşim kazandırmayı öğreniyorum.",
        "en": "Learning to make web pages interactive."
      }
    ],
    "interests": [
      {
        "unit": "cross",
        "tr": {
          "title": "Futbol",
          "html": "<em>“Takım oyunu, bireysel yetenekten üstündür.”</em> Amatör futbol geçmişim disiplin ve ekip çalışması kazandırdı. Basketbolu da seviyorum."
        },
        "en": {
          "title": "Football",
          "html": "<em>“Teamwork beats individual talent.”</em> My amateur football background taught me discipline and teamwork. I love basketball too."
        }
      },
      {
        "unit": "star",
        "tr": {
          "title": "Kodlama",
          "html": "Geleceği <code>Python</code> ve yapay zekâ teknolojileriyle inşa etmeye odaklanıyorum."
        },
        "en": {
          "title": "Coding",
          "html": "I'm focused on building the future with <code>Python</code> and AI technologies."
        }
      },
      {
        "unit": "knot",
        "tr": {
          "title": "Dijital tasarım",
          "html": "Photoshop'ta renklendirme, Smart Object ile kompozisyon ve ürün afişleri."
        },
        "en": {
          "title": "Digital design",
          "html": "Colorizing in Photoshop, Smart Object compositions and product posters."
        }
      },
      {
        "unit": "hook",
        "tr": {
          "title": "Diğer",
          "html": "Bilim kurgu filmleri · Müzik dinlemek · Teknoloji blogları · Doğa yürüyüşleri · Motosiklet"
        },
        "en": {
          "title": "Other",
          "html": "Sci-fi films · Listening to music · Tech blogs · Nature walks · Motorcycles"
        }
      }
    ]
  },
  "profile": {
    "location": {
      "tr": "Antalya / Kepez, Türkiye",
      "en": "Antalya / Kepez, Türkiye"
    },
    "email": "yeersoy.0715@gmail.com",
    "phones": [
      "+90 544 739 15 07",
      "+90 539 356 18 99"
    ],
    "instagram": "https://www.instagram.com/e.mre0_0/",
    "linkedin": "https://www.linkedin.com/in/yunus-emre-ersoy-2a3b2638a/",
    "mapQuery": "Kepez, Antalya, Türkiye"
  }
};
