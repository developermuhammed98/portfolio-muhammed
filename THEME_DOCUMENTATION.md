# Tema ve DotField Arka Plan Sistemi Dökümantasyonu

Bu dökümantasyon, Muhammed Bülbül portfolyo web uygulamasında kullanılan **premium karanlık tema**, **interaktif DotField nokta alanı** ve **akıcı mouse takip efektinin** teknik detaylarını ve çalışma prensiplerini açıklamaktadır.

---

## 1. Genel Tasarım Felsefesi

Uygulamanın arayüzü **"gece açık kalmış sakin bir VS Code penceresi"** fikri üzerine kurulmuştur. Arayüz elemanları (glassmorphism kartlar, monospace yazı tipleri, satır numaraları ve alt durum çubuğu) ön planda teknolojik bir atmosfer sunarken; arka planda derin lacivert/siyah renk geçişi ve fare hareketine tepki veren akıllı nokta ağı derinlik algısı yaratır.

---

## 2. DotField Arka Plan Sistemi

Geleneksel durağan veya basit yıldız arka planları yerine React Bits'in **DotField** bileşeni entegre edilmiştir. Bu sistem, HTML5 Canvas API'si aracılığıyla donanım hızlandırmalı (GPU) bir parçacık ağı çizer.

### A. Çalışma Prensibi ve Etkileşim
* **Dinamik Hücre Ağı (Grid):** Ekran çözünürlüğüne bağlı olarak otomatik ölçeklenen, her biri kendi başlangıç koordinatına (`ax, ay`) sahip binlerce minik parçacık.
* **Fareye Tepki (Bulge/İtme Efekti):** Fare imlecinin hareket hızı (`speed`) ve pozisyonuna bağlı olarak noktalar imlecin çevresinden yumuşak bir eğriyle dışarı doğru itilir (`bulgeStrength = 50`). Fare durduğunda veya sayfadan ayrıldığında noktalar eski konumlarına geri döner.
* **Çift Renk Gradyanı:** Noktalar tek renk değildir. Ekranın sol üstünden sağ altına uzanan dinamik bir renk geçişi kullanılır:
  - Başlangıç: `rgba(34, 211, 238, 0.22)` (Cyan parıltı)
  - Bitiş: `rgba(139, 92, 246, 0.12)` (Violet parıltı)
* **Alt Katman SVG Glow:** İmleci arkadan takip eden, farenin hareket hızına göre büyüyüp küçülen çok soluk ve devasa bir radial gradyan dairesi (`glowRadius = 180`) bulunur.

### B. Performans Tasarımı
* **Canvas API Kullanımı:** Binlerce ayrı DOM elementi oluşturmak yerine her şey tek bir `<canvas>` üzerinde çizilir.
* **Hızlandırılmış Döngü (requestAnimationFrame):** Çizim işlemleri tarayıcının ekran yenileme hızıyla (FPS) tam uyumlu şekilde `requestAnimationFrame` kullanılarak gerçekleştirilir.
* **Throttled Resize:** Ekran boyutu değiştiğinde grid yapısının yeniden oluşturulması `setTimeout` ile optimize edilerek tarayıcının çökmesi engellenir.

---


## 3. VS Code Atmosfer Çizgileri

Arka planda gerçek bir kod editörü hissiyatı uyandırmak amacıyla şu katmanlar kullanılmıştır:

* **Yatay Satır Çizgileri (`body::before`):** Ekranı kaplayan ve her 24px'te bir tekrarlayan ultra soluk yatay çizgiler.
* **Dikey Panel Ayraçları (`border-r`/`border-l`):** Masaüstünde 3 sütunlu yapının sınırlarını belirleyen soluk dikey çizgiler.
* **Satır Numaraları:** Sol kolonda 24px satır yüksekliğiyle yatay çizgilerle pikseli pikseline çakışan satır numaraları (01'den 99'a kadar).
* **Noise Overlay:** `layout.tsx` içerisinde bulunan SVG filtre katmanı, zemin degradelerine pürüzsüz ve kadifemsi bir dijital grain/parazit efekti verir.

---

## 4. Akıcı Mouse Takip Efekti (Ambient Glow) & Fare İzi (Cursor Trail)

Masaüstü cihazlarda ekran genelinde gezinen yumuşak cyan/violet karışımı bir ışık (`#ambient-glow`) ve fare hareketini takip eden parıltılı bir iz sistemi bulunur.

* **Linear Interpolation (Lerp / Easing):** Işık, mouse imlecini doğrudan yapışarak takip etmez. Aralarında yumuşak bir gecikme (lerp hızı `0.06`) vardır. Bu sayede mouse hızlıca kaydırılsa dahi ışık arkadan süzülerek (sıvı hissi) gelir.
* **Akıllı Uyku (Idle CPU Save Mode):** Fare hareket etmeyi bıraktığında ve ışık hedefine ulaştığında animasyon döngüsü (`requestAnimationFrame`) tamamen durdurulur (CPU/GPU tüketimi %0'a indirilir). Fare yeniden hareket ettiği anda döngü uykudan uyanır.
* **Fare Sayfadan Çıkınca:** `mouseleave` ve `mouseenter` olayları dinlenerek fare tarayıcı penceresinden çıktığında ışık yumuşak bir şekilde gizlenir (`opacity: 0`), geri girdiğinde ise tekrar belirir (`opacity: 1`).
* **Fare İzi (Cursor Trail):** Fare hareket ederken arkasında kısa süreli parlayan, renk değiştiren cyan, violet, indigo ve emerald renkli küçük ışık halkaları (`.cursor-trail-dot`) bırakır. Bu izler 20ms'lik bir zaman eşiğiyle (throttle) sınırlandırılarak tarayıcının DOM yükü korunmuş ve 620ms sonra kendiliğinden silinecek şekilde bellek sızıntısız (`garbage collection friendly`) kodlanmıştır.
* **translate3d:** Konumlandırma `top`/`left` gibi tarayıcıda yeniden layout çizdiren (reflow) özellikler yerine, doğrudan GPU ivmeli `translate3d` (donanım hızlandırma) ile yapılır.

---

## 5. Performans ve Erişilebilirlik Optimizasyonları

1. **GPU Optimizasyonu:** Animasyon potansiyeli yüksek olan katmanlarda `will-change: transform` kullanılarak tarayıcının önceden hazırlık yapması sağlanmıştır.
2. **Erişilebilirlik (Reduced Motion):** Bilgisayarında animasyonları kapatmış olan (prefers-reduced-motion) kullanıcılar için tüm titreşim, kayma, mouse takip ve fare izi animasyonları otomatik olarak devre dışı bırakılır.
3. **Responsive Davranış:** Mouse takip ışığı ve fare izi, dokunmatik (Touch) cihazlarda gereksiz işlemci yükü oluşturmaması için CSS ve JS düzeyinde kapatılmıştır.
