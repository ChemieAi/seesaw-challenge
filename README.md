# Seesaw Simulation

Pure JavaScript ile geliştirilmiş fizik tabanlı tahterevalli simülasyonu.

## Özellikler

- Torque tabanlı denge hesaplaması
- Smooth tilt animasyonu
- LocalStorage ile state persistence
- Sol/sağ ağırlık ve torque göstergeleri
- Reset butonu
- Tamamen **frameworksüz** (pure JS)

## Fizik Hesabı

Torque formülü:

torque = weight × distance

Seesaw açısı:

angle = clamp((rightTorque - leftTorque) / 10, -30°, 30°)

## Teknik Kararlar

- Canvas yerine DOM + CSS transform kullanıldı
- State localStorage’ta tutuldu
- Her özellik küçük commitlerle geliştirildi

## Geliştirme Süreci

1. Layout kurulumu  
2. Click & distance hesabı  
3. Object rendering  
4. Torque fiziği  
5. LocalStorage  
6. UI göstergeleri  
7. Reset & final polish  

## AI Kullanımı

AI yalnızca yönlendirme ve debugging amacıyla kullanılmıştır.  
Tüm implementasyon mantığı tarafımdan geliştirilmiştir.
