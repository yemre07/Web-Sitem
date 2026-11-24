export const ARTICLES = [
  {
    id: "vibe-coding",
    date: "2026-11-14",
    unit: "star",
    tr: {
      title: "Yapay Zekâ Destekli Yazılım Geliştirme: Vibe Coding Nedir?",
      cat: "Yazılım Geliştirme",
      tags: ["#YapayZeka", "#VibeCoding", "#Python", "#Verimlilik"],
      read: "6 dk okuma",
      excerpt: "Kodu satır satır yazmak yerine ne istediğinizi anlatıp yapay zekâya yazdırmak: hızlı mı, riskli mi? Bir öğrenci gözüyle vibe coding'in artıları, tuzakları ve sağlıklı kullanım listesi.",
      body: `
<p>Şubat 2025'te yapay zekâ araştırmacısı Andrej Karpathy, kod yazmanın yeni bir biçimini tarif etmek için “vibe coding” ifadesini kullandı: Programcı ne istediğini doğal dille anlatıyor, kodu büyük ölçüde bir dil modeli yazıyor, insan ise sonucu çalıştırıp hissiyata göre yön veriyor. Terim kısa sürede yazılım dünyasının en çok konuşulan kavramlarından biri oldu.</p>
<p>Bilgisayar programcılığı öğrencisi olarak bu konu beni doğrudan ilgilendiriyor. Çünkü bir yandan algoritma ve sözdizimi öğreniyoruz, öte yandan aynı işi saniyeler içinde yapabilen araçlar her gün daha iyi hâle geliyor. Peki bu araçları nasıl kullanmalıyız?</p>

<h2>Vibe coding nasıl işler?</h2>
<p>Süreç, klasik “yaz, derle, hata ayıkla” döngüsünün konuşmaya dönüşmüş hâlidir:</p>
<ol>
  <li><strong>İsteği tarif et:</strong> “Bir CSV dosyasındaki notların ortalamasını hesaplayan bir Python betiği yaz.”</li>
  <li><strong>Üretilen kodu çalıştır:</strong> Model bir taslak verir, siz onu çalıştırırsınız.</li>
  <li><strong>Geri bildirim ver:</strong> Hata mesajını ya da beklenmeyen çıktıyı modele geri yapıştırırsınız.</li>
  <li><strong>Tekrarla:</strong> Program istediğiniz gibi çalışana kadar döngü sürer.</li>
</ol>
<p>Bu yaklaşımda klavyeden çok fikir ve doğrulama önemlidir. Ne istediğini net anlatabilen kişi daha iyi sonuç alır.</p>

<h2>Nerede gerçekten işe yarıyor?</h2>
<ul>
  <li><strong>Hızlı prototipler:</strong> Bir fikrin işe yarayıp yaramadığını görmek için birkaç saatte çalışan bir taslak çıkarmak.</li>
  <li><strong>Tekrarlayan kod:</strong> Form doğrulama, dosya okuma, basit API istekleri gibi her projede yazılan kalıplar.</li>
  <li><strong>Öğrenme:</strong> Bilmediğiniz bir kütüphaneyi örnek kod üzerinden tanımak ve “bu satır ne yapıyor?” diye sormak.</li>
  <li><strong>Küçük araçlar:</strong> Kendi işinizi kolaylaştıran tek seferlik betikler.</li>
</ul>

<h2>Dikkat edilmesi gereken tuzaklar</h2>
<p>Yapay zekâ çok emin bir dille yanlış kod da yazabilir. En sık karşılaşılan sorunlar şunlar:</p>
<ul>
  <li><strong>Anlamadığın kodu teslim etmek:</strong> Çalışıyor diye kabul edilen ama mantığı bilinmeyen kod, ilk hatada içinden çıkılmaz hâle gelir.</li>
  <li><strong>Güvenlik açıkları:</strong> Şifrelerin koda gömülmesi, kullanıcı girdisinin kontrol edilmemesi gibi hatalar sık görülür.</li>
  <li><strong>Var olmayan kütüphaneler:</strong> Model bazen gerçekte olmayan bir paket ya da fonksiyon adı uydurabilir.</li>
  <li><strong>Test eksikliği:</strong> Bir kez doğru sonuç veren kod, farklı girdilerde bozulabilir.</li>
</ul>
<blockquote>Yapay zekâ kodu yazabilir; ama o kodun sorumluluğu her zaman onu projeye ekleyen kişidedir.</blockquote>

<h2>Bir öğrenci için sağlıklı kullanım listesi</h2>
<ul>
  <li>Üretilen her satırı oku; anlamadığın yeri modele açıklat.</li>
  <li>Önce problemi kendin çözmeyi dene, sonra yapay zekânın çözümüyle karşılaştır.</li>
  <li>Küçük adımlarla ilerle: tek seferde koca bir program yerine fonksiyon fonksiyon iste.</li>
  <li>Her önemli fonksiyon için en az bir basit test yaz, örneğin <code>assert ortalama([2, 4]) == 3</code>.</li>
  <li>Kişisel veriyi, şifreyi ya da API anahtarını asla sohbete yapıştırma.</li>
  <li>Ödev ve sınav kurallarına uy; yapay zekâ kullanımına izin verilip verilmediğini öğren.</li>
</ul>

<h2>Sonuç</h2>
<p>Vibe coding programlamayı bitirmiyor, programcının rolünü değiştiriyor. Artık iyi bir geliştirici yalnızca kod yazan değil; doğru soruyu soran, çıktıyı değerlendiren ve sistemi bütün olarak düşünen kişi. Bu yüzden temel bilgiyi öğrenmek eskisinden daha da önemli: Yapay zekânın hatasını ancak konuyu bilen biri yakalayabilir.</p>`,
    },
    en: {
      title: "AI-Assisted Software Development: What Is Vibe Coding?",
      cat: "Software Development",
      tags: ["#AI", "#VibeCoding", "#Python", "#Productivity"],
      read: "6 min read",
      excerpt: "Describing what you want and letting an AI write the code instead of typing it line by line: fast or risky? Vibe coding's upsides, traps and a healthy-use checklist, from a student's point of view.",
      body: `
<p>In February 2025, AI researcher Andrej Karpathy used the phrase “vibe coding” to describe a new way of writing software: the programmer explains what they want in plain language, a language model writes most of the code, and the human runs the result and steers by feel. The term quickly became one of the most talked-about ideas in software.</p>
<p>As a computer programming student, this concerns me directly. On one hand we are learning algorithms and syntax; on the other, tools that can do the same job in seconds get better every day. So how should we use them?</p>

<h2>How does vibe coding work?</h2>
<p>It is the classic “write, compile, debug” loop turned into a conversation:</p>
<ol>
  <li><strong>Describe the goal:</strong> “Write a Python script that averages the grades in a CSV file.”</li>
  <li><strong>Run the generated code:</strong> The model gives you a draft and you run it.</li>
  <li><strong>Give feedback:</strong> You paste the error message or the unexpected output back to the model.</li>
  <li><strong>Repeat:</strong> The loop continues until the program does what you want.</li>
</ol>
<p>Ideas and verification matter more than typing here. Whoever can describe the goal clearly gets the better result.</p>

<h2>Where does it really help?</h2>
<ul>
  <li><strong>Quick prototypes:</strong> getting a working draft in a few hours to see whether an idea holds up.</li>
  <li><strong>Repetitive code:</strong> form validation, file reading, simple API calls, the patterns every project needs.</li>
  <li><strong>Learning:</strong> exploring an unfamiliar library through example code and asking “what does this line do?”</li>
  <li><strong>Small tools:</strong> one-off scripts that make your own work easier.</li>
</ul>

<h2>Traps to watch for</h2>
<p>An AI can write wrong code in a very confident voice. The most common problems are:</p>
<ul>
  <li><strong>Shipping code you don't understand:</strong> code accepted because it runs, without knowing its logic, becomes impossible to fix at the first bug.</li>
  <li><strong>Security holes:</strong> passwords hard-coded into the source and unchecked user input show up often.</li>
  <li><strong>Libraries that don't exist:</strong> a model sometimes invents a package or function name.</li>
  <li><strong>Missing tests:</strong> code that gave the right answer once can break on different input.</li>
</ul>
<blockquote>The AI can write the code, but responsibility for it always stays with the person who adds it to the project.</blockquote>

<h2>A healthy-use checklist for students</h2>
<ul>
  <li>Read every generated line, and ask the model to explain anything you don't understand.</li>
  <li>Try to solve the problem yourself first, then compare with the AI's solution.</li>
  <li>Move in small steps: ask for one function at a time instead of a whole program.</li>
  <li>Write at least one simple test for each important function, e.g. <code>assert average([2, 4]) == 3</code>.</li>
  <li>Never paste personal data, passwords or API keys into the chat.</li>
  <li>Follow your course rules: find out whether AI use is allowed for each assignment or exam.</li>
</ul>

<h2>Conclusion</h2>
<p>Vibe coding doesn't end programming; it changes the programmer's role. A good developer is no longer only someone who types code, but someone who asks the right question, judges the output and thinks about the system as a whole. That makes learning the fundamentals more important than ever: only someone who knows the subject can catch the AI's mistakes.</p>`,
    },
  },
  {
    id: "renk-teorisi",
    date: "2026-10-29",
    unit: "knot",
    tr: {
      title: "Adobe Photoshop ve Dijital Tasarımda Renk Teorisi",
      cat: "Dijital Tasarım",
      tags: ["#Photoshop", "#RenkTeorisi", "#GrafikTasarım", "#Afiş"],
      read: "7 dk okuma",
      excerpt: "Renk çemberi, uyum şemaları, 60-30-10 kuralı ve Photoshop'ta rengi kontrol etmenin pratik yolları; renklendirme ve afiş projelerimden örneklerle.",
      body: `
<p>Bir tasarımı ilk bakışta “doğru” ya da “yanlış” hissettiren şeyin büyük kısmı renktir. Photoshop'ta yaptığım karakalem renklendirme, siyah beyaz kontrast ve ürün afişi çalışmalarında en çok zaman harcadığım konu da buydu. Bu yazıda renk teorisinin temellerini ve Photoshop'ta bunları uygulamanın pratik yollarını özetliyorum.</p>

<h2>Renk çemberi ve üç temel özellik</h2>
<p>Dijital tasarımda bir rengi üç özellikle düşünmek işi kolaylaştırır. Photoshop'un renk seçicisindeki <strong>HSB</strong> modeli de tam olarak bunu gösterir:</p>
<ul>
  <li><strong>Ton (Hue):</strong> Rengin kendisi; kırmızı, sarı, mavi… Çember üzerindeki açısıyla ifade edilir.</li>
  <li><strong>Doygunluk (Saturation):</strong> Rengin ne kadar canlı ya da gri olduğu.</li>
  <li><strong>Parlaklık (Brightness):</strong> Rengin ne kadar açık ya da koyu olduğu.</li>
</ul>
<p>Ekranda çalışırken renkler <strong>RGB</strong> ile, baskıya giden işlerde ise <strong>CMYK</strong> ile tanımlanır. Afişi baskıya göndermeden önce renk modunu kontrol etmek, ekranda canlı görünen bir rengin kâğıtta soluk çıkmasını önler.</p>

<h2>Uyum şemaları</h2>
<ul>
  <li><strong>Tamamlayıcı:</strong> Çemberde karşı karşıya olan renkler (mavi ve turuncu gibi). En güçlü kontrastı verir; vurgu için idealdir.</li>
  <li><strong>Komşu (analog):</strong> Yan yana duran renkler (sarı, turuncu, kırmızı). Sakin ve bütünlüklü bir his yaratır.</li>
  <li><strong>Üçlü (triadik):</strong> Çemberde eşit aralıklı üç renk. Enerjik ama dengelenmesi zor.</li>
  <li><strong>Tek renkli:</strong> Aynı tonun farklı açık-koyu değerleri. Minimal ve şık tasarımlar için güvenli seçim.</li>
</ul>

<h2>60-30-10 kuralı</h2>
<p>Bir kompozisyonda renk ağırlığını dağıtmak için kullanılan basit bir kuraldır: Alanın yaklaşık %60'ı baskın renk, %30'u ikincil renk, %10'u vurgu rengi olur. Ürün tanıtım afişimde sarı zemin baskın renk, beyaz ürün tüpü ikincil renk, turuncu SPF etiketi ise vurgu rengiydi. Böylece göz önce ürüne, sonra slogana gidiyor.</p>

<h2>Photoshop'ta rengi kontrol etmenin yolları</h2>
<ul>
  <li><strong>Ayarlama katmanları (Adjustment Layers):</strong> Hue/Saturation, Color Balance ve Curves ile rengi orijinal pikselleri bozmadan değiştirebilirsiniz. Beğenmezseniz katmanı silmeniz yeterli.</li>
  <li><strong>Karışım modları:</strong> Karakalem bir çizimi renklendirirken renkleri ayrı bir katmana boyayıp katmanı <em>Color</em> ya da <em>Soft Light</em> moduna almak, çizgilerin ve gölgelerin korunmasını sağlar.</li>
  <li><strong>Seçici renk:</strong> Görseli Black &amp; White ayarlama katmanıyla griye çevirip katman maskesinde istediğiniz alanı silerseniz, o bölge renkli kalır. Siyah beyaz kontrast projemde oyuncuyu bu yöntemle öne çıkardım.</li>
  <li><strong>Gradient Map:</strong> Fotoğrafın açık ve koyu tonlarını seçtiğiniz renklere eşleyerek tutarlı bir atmosfer oluşturur.</li>
  <li><strong>Örnek renk paletleri:</strong> Adobe Color gibi araçlarla bir fotoğraftan palet çıkarıp Swatches paneline kaydetmek, tüm tasarımda aynı renkleri kullanmanızı sağlar.</li>
</ul>

<h2>Renk psikolojisi ve erişilebilirlik</h2>
<p>Renklerin çağrışımları vardır: Sarı enerji ve güneşi, mavi güveni ve sakinliği, kırmızı tutku ve aciliyeti anlatır. Ancak çağrışımdan önce okunabilirlik gelir. Metin ile arka plan arasında yeterli kontrast yoksa en güzel palet bile işe yaramaz. Web'de normal metin için en az <strong>4.5:1</strong> kontrast oranı önerilir. Ayrıca bilgiyi yalnızca renkle değil, şekil ya da yazıyla da vermek renk körlüğü olan kullanıcıları düşünmek demektir.</p>

<blockquote>İyi bir palet az renkten oluşur; her rengin bir görevi vardır.</blockquote>

<h2>Sonuç</h2>
<p>Renk teorisi kural ezberlemekten çok bilinçli seçim yapmakla ilgili. Tasarıma başlamadan önce baskın, ikincil ve vurgu rengini belirlemek, Photoshop'ta ise değişiklikleri ayarlama katmanlarıyla tahribatsız yapmak hem zamandan kazandırıyor hem de sonucu daha profesyonel gösteriyor.</p>`,
    },
    en: {
      title: "Color Theory in Adobe Photoshop and Digital Design",
      cat: "Digital Design",
      tags: ["#Photoshop", "#ColorTheory", "#GraphicDesign", "#Poster"],
      read: "7 min read",
      excerpt: "The colour wheel, harmony schemes, the 60-30-10 rule and practical ways to control colour in Photoshop, with examples from my colorization and poster projects.",
      body: `
<p>Much of what makes a design feel “right” or “wrong” at first glance is colour. It was also what I spent the most time on in my Photoshop work: the charcoal colorization, the black-and-white contrast piece and the product poster. In this article I summarise the basics of colour theory and practical ways to apply them in Photoshop.</p>

<h2>The colour wheel and three properties</h2>
<p>In digital design it helps to think of a colour through three properties. The <strong>HSB</strong> model in Photoshop's colour picker shows exactly that:</p>
<ul>
  <li><strong>Hue:</strong> the colour itself, red, yellow, blue… expressed as its angle on the wheel.</li>
  <li><strong>Saturation:</strong> how vivid or grey the colour is.</li>
  <li><strong>Brightness:</strong> how light or dark it is.</li>
</ul>
<p>On screen, colours are defined in <strong>RGB</strong>; for print, in <strong>CMYK</strong>. Checking the colour mode before sending a poster to print prevents a colour that glows on screen from coming out dull on paper.</p>

<h2>Harmony schemes</h2>
<ul>
  <li><strong>Complementary:</strong> colours opposite each other on the wheel (like blue and orange). The strongest contrast, ideal for emphasis.</li>
  <li><strong>Analogous:</strong> neighbouring colours (yellow, orange, red). Calm and unified.</li>
  <li><strong>Triadic:</strong> three evenly spaced colours. Energetic but hard to balance.</li>
  <li><strong>Monochromatic:</strong> lighter and darker values of one hue. A safe choice for minimal, elegant designs.</li>
</ul>

<h2>The 60-30-10 rule</h2>
<p>A simple rule for distributing colour weight: about 60% of the area is the dominant colour, 30% the secondary colour and 10% the accent. In my product poster, the yellow background was dominant, the white tube secondary and the orange SPF label the accent, so the eye goes to the product first and then to the slogan.</p>

<h2>Ways to control colour in Photoshop</h2>
<ul>
  <li><strong>Adjustment layers:</strong> Hue/Saturation, Color Balance and Curves change colour without destroying the original pixels. If you don't like the result, just delete the layer.</li>
  <li><strong>Blend modes:</strong> when colorizing a charcoal drawing, painting colour on a separate layer set to <em>Color</em> or <em>Soft Light</em> keeps the lines and shading intact.</li>
  <li><strong>Selective colour:</strong> turn the image grey with a Black &amp; White adjustment layer, then erase the area you want in its mask, and that region stays in colour. That's how I made the player stand out in my black-and-white contrast project.</li>
  <li><strong>Gradient Map:</strong> maps the light and dark tones of a photo to colours you choose, creating a consistent mood.</li>
  <li><strong>Saved palettes:</strong> extracting a palette from a photo with a tool like Adobe Color and saving it to the Swatches panel keeps the same colours across the whole design.</li>
</ul>

<h2>Colour psychology and accessibility</h2>
<p>Colours carry associations: yellow speaks of energy and sunshine, blue of trust and calm, red of passion and urgency. But readability comes before association. Without enough contrast between text and background, even the most beautiful palette fails. On the web, a contrast ratio of at least <strong>4.5:1</strong> is recommended for normal text. Conveying information through shape or text as well as colour also means thinking about colour-blind users.</p>

<blockquote>A good palette has few colours, and every colour has a job.</blockquote>

<h2>Conclusion</h2>
<p>Colour theory is less about memorising rules and more about making deliberate choices. Deciding the dominant, secondary and accent colours before you start, and making changes non-destructively with adjustment layers in Photoshop, saves time and makes the result look more professional.</p>`,
    },
  },
  {
    id: "responsive-tasarim",
    date: "2026-10-08",
    unit: "hook",
    tr: {
      title: "Modern Web Geliştirmede Responsive Tasarım İlkeleri",
      cat: "Web Geliştirme",
      tags: ["#Responsive", "#CSS", "#MobilÖncelikli", "#Erişilebilirlik"],
      read: "8 dk okuma",
      excerpt: "Viewport etiketinden clamp() ile akışkan yazıya, CSS Grid'den duyarlı görsellere: bir sitenin telefonda, tablette ve masaüstünde düzgün görünmesi için gereken temel ilkeler.",
      body: `
<p>Bugün bir web sitesine gelen ziyaretçilerin büyük bölümü telefondan bağlanıyor. Aynı sayfanın 360 piksellik bir ekranda da 1920 piksellik bir monitörde de rahat okunması gerekiyor. Responsive (duyarlı) tasarım, tek bir kod tabanıyla tüm ekranlara uyum sağlamanın yoludur. Bu portfolyo sitesini yeniden tasarlarken uyguladığım ilkeleri aşağıda topladım.</p>

<h2>1. Viewport etiketiyle başla</h2>
<p>Bu satır olmadan mobil tarayıcılar sayfayı masaüstü genişliğinde çizip küçültür:</p>
<p><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code></p>

<h2>2. Mobil öncelikli düşün</h2>
<p>Önce en küçük ekran için tasarlayıp genişledikçe özellik eklemek, tersinden daha kolaydır. Küçük ekran sizi neyin gerçekten önemli olduğuna karar vermeye zorlar. CSS'te bu, temel stilleri yazıp büyük ekranlar için <code>@media (min-width: …)</code> blokları eklemek anlamına gelir.</p>

<h2>3. Akışkan ızgaralar: Grid ve Flexbox</h2>
<p>Sabit piksel genişlikleri yerine oranlarla çalışmak gerekir. CSS Grid'in şu satırı, sütun sayısını ekran genişliğine göre kendiliğinden ayarlar:</p>
<p><code>grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));</code></p>
<p>Flexbox ise <code>flex-wrap: wrap</code> ile sığmayan öğeleri alt satıra taşır. Böylece çoğu durumda medya sorgusu yazmaya bile gerek kalmaz.</p>

<h2>4. clamp() ile akışkan yazı boyutları</h2>
<p>Başlıkların her ekranda orantılı görünmesi için <code>clamp()</code> fonksiyonu çok kullanışlıdır:</p>
<p><code>font-size: clamp(2rem, 5vw, 4rem);</code></p>
<p>Bu tanım, yazının en az 2rem, en fazla 4rem olmasını, arada ise ekran genişliğiyle büyümesini sağlar. Gövde metninde ise satır uzunluğunu 65–75 karakter civarında tutmak okumayı kolaylaştırır.</p>

<h2>5. Kırılma noktalarını içerik belirlesin</h2>
<p>“iPhone genişliği”, “tablet genişliği” gibi cihaz ölçülerine göre değil, tasarımın bozulmaya başladığı yere göre kırılma noktası koyun. Tarayıcı penceresini yavaşça daraltın; düzen sıkıştığı anda bir medya sorgusu eklemenin zamanı gelmiştir.</p>

<h2>6. Duyarlı görseller</h2>
<ul>
  <li><code>img { max-width: 100%; height: auto; }</code> görsellerin taşmasını engeller.</li>
  <li><code>aspect-ratio</code> ve <code>object-fit: cover</code>, farklı boyuttaki fotoğrafları aynı çerçevede düzgün kırpar.</li>
  <li><code>width</code> ve <code>height</code> niteliklerini yazmak, görsel yüklenirken sayfanın zıplamasını önler.</li>
  <li><code>loading="lazy"</code>, ekranın altında kalan görsellerin sonradan yüklenmesini sağlar.</li>
  <li><code>srcset</code> ile küçük ekranlara daha küçük dosya göndermek veri tasarrufu sağlar.</li>
</ul>

<h2>7. Dokunmayı ve erişilebilirliği unutma</h2>
<p>Telefonda fare yoktur; düğmeler ve bağlantılar parmakla rahat basılabilecek büyüklükte, yaklaşık 44×44 piksel olmalıdır. Klavye ile gezen kullanıcılar için odak çerçevesi görünür kalmalı, metin ile arka plan arasındaki kontrast yeterli olmalıdır.</p>

<blockquote>Responsive tasarım bir özellik değil, bir zorunluluktur: Ziyaretçi sitenizi hangi cihazdan açacağını size sormaz.</blockquote>

<h2>8. Gerçek cihazlarda test et</h2>
<p>Tarayıcının geliştirici araçlarındaki cihaz görünümü iyi bir başlangıçtır, ancak sayfayı mutlaka gerçek bir telefonda da açın. Yazı boyutu, dokunma alanları ve kaydırma hissi ancak böyle anlaşılır.</p>

<h2>Sonuç</h2>
<p>Akışkan ızgaralar, <code>clamp()</code> ile ölçeklenen yazılar, içerikten doğan kırılma noktaları ve duyarlı görseller bir araya geldiğinde site her ekranda kendini doğal hisseder. Bu sitenin kenar menüsünün telefonda üst çubuğa dönüşmesi ve kartların tek sütuna inmesi de aynı ilkelerin sonucu.</p>`,
    },
    en: {
      title: "Principles of Responsive Design in Modern Web Development",
      cat: "Web Development",
      tags: ["#Responsive", "#CSS", "#MobileFirst", "#Accessibility"],
      read: "8 min read",
      excerpt: "From the viewport tag to fluid type with clamp(), from CSS Grid to responsive images: the core principles that make a site look right on phones, tablets and desktops.",
      body: `
<p>Today most visitors reach a website from a phone. The same page has to read comfortably on a 360-pixel screen and on a 1920-pixel monitor. Responsive design is how a single codebase adapts to every screen. Below are the principles I applied while redesigning this portfolio site.</p>

<h2>1. Start with the viewport tag</h2>
<p>Without this line, mobile browsers render the page at desktop width and shrink it:</p>
<p><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code></p>

<h2>2. Think mobile-first</h2>
<p>Designing for the smallest screen first and adding features as it grows is easier than the reverse. A small screen forces you to decide what really matters. In CSS, that means writing the base styles and adding <code>@media (min-width: …)</code> blocks for larger screens.</p>

<h2>3. Fluid grids: Grid and Flexbox</h2>
<p>Work with proportions instead of fixed pixel widths. This line of CSS Grid adjusts the number of columns to the screen width on its own:</p>
<p><code>grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));</code></p>
<p>Flexbox, with <code>flex-wrap: wrap</code>, moves items that don't fit to the next line. In many cases you don't even need a media query.</p>

<h2>4. Fluid type with clamp()</h2>
<p>To keep headings proportional on every screen, <code>clamp()</code> is very handy:</p>
<p><code>font-size: clamp(2rem, 5vw, 4rem);</code></p>
<p>This keeps the text at least 2rem and at most 4rem, growing with the screen width in between. For body text, keeping lines around 65–75 characters long makes reading easier.</p>

<h2>5. Let content set the breakpoints</h2>
<p>Place breakpoints where the design starts to break, not at device sizes like “iPhone width” or “tablet width”. Slowly narrow the browser window; the moment the layout gets cramped is the time to add a media query.</p>

<h2>6. Responsive images</h2>
<ul>
  <li><code>img { max-width: 100%; height: auto; }</code> stops images from overflowing.</li>
  <li><code>aspect-ratio</code> and <code>object-fit: cover</code> crop photos of different sizes neatly into the same frame.</li>
  <li>Setting <code>width</code> and <code>height</code> attributes prevents the page from jumping while images load.</li>
  <li><code>loading="lazy"</code> delays images below the fold until they're needed.</li>
  <li><code>srcset</code> sends smaller files to small screens and saves data.</li>
</ul>

<h2>7. Don't forget touch and accessibility</h2>
<p>Phones have no mouse; buttons and links should be big enough to tap comfortably, about 44×44 pixels. For keyboard users the focus outline must stay visible, and text must have enough contrast against its background.</p>

<blockquote>Responsive design isn't a feature, it's a requirement: visitors don't ask which device you'd like them to use.</blockquote>

<h2>8. Test on real devices</h2>
<p>The device view in the browser's developer tools is a good start, but always open the page on a real phone too. Text size, tap targets and the feel of scrolling only become clear that way.</p>

<h2>Conclusion</h2>
<p>Fluid grids, type that scales with <code>clamp()</code>, breakpoints that come from the content and responsive images together make a site feel natural on every screen. This site's side menu turning into a top bar on phones and its cards dropping to a single column are results of the same principles.</p>`,
    },
  },
];
