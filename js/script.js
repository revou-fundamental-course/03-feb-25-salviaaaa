// Menunggu hingga seluruh konten halaman selesai dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', function() {
    // Mengambil elemen form berdasarkan ID
    const form = document.getElementById('temperatureForm');
    // Mengambil elemen yang merepresentasikan air raksa pada termometer
    const mercury = document.querySelector('.mercury');
    // Mengambil elemen untuk menampilkan hasil konversi
    const resultDiv = document.getElementById('result');
    // Mengambil elemen untuk menampilkan penjelasan suhu
    const explanationDiv = document.getElementById('explanation');
    // Mengambil elemen untuk menampilkan langkah-langkah konversi suhu
    const conversionStepsDiv = document.getElementById('conversion-steps');

    // Menambahkan event listener untuk menangani pengiriman formulir
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah halaman refresh saat form dikirim
        
        // Mengambil nilai suhu dari input pengguna dan mengubahnya menjadi angka
        const temperature = parseFloat(document.getElementById('temperature').value);
        // Mengambil unit suhu yang dipilih oleh pengguna (Celsius atau Fahrenheit)
        const unit = document.querySelector('input[name="unit"]:checked').value;
        
        // Variabel untuk menyimpan suhu dalam Celsius
        let celsiusTemp;

        // Jika unit yang dipilih adalah Celsius, langsung gunakan nilai suhu
        if (unit === 'celsius') {
            celsiusTemp = temperature;
            // Memeriksa apakah suhu berada dalam rentang yang valid
            if (celsiusTemp < -40 || celsiusTemp > 50) {
                alert('Suhu harus berada antara -40°C dan 50°C'); // Menampilkan peringatan jika suhu di luar batas
                return;
            }
        } else {
            // Jika unit Fahrenheit, konversi ke Celsius menggunakan rumus (°F - 32) × 5/9
            celsiusTemp = (temperature - 32) * 5/9;
            // Memeriksa apakah suhu dalam rentang yang valid
            if (celsiusTemp < -40 || celsiusTemp > 50) {
                alert('Suhu harus berada antara -40°F dan 122°F');
                return;
            }
        }

        // Variabel untuk menyimpan suhu yang dikonversi dan hasil teks
        let convertedTemp;
        let resultText;
        let steps;
        
        // Jika input dalam Celsius, konversi ke Fahrenheit
        if (unit === 'celsius') {
            convertedTemp = (temperature * 9/5) + 32; // Rumus konversi °C ke °F
            resultText = `${temperature}°C = ${convertedTemp.toFixed(1)}°F`; // Menampilkan hasil dengan 1 angka desimal
            
            // Menyusun langkah-langkah konversi untuk ditampilkan ke pengguna
            steps = `Langkah-langkah konversi Celsius ke Fahrenheit:
1. Ambil suhu dalam Celsius: ${temperature}°C
2. Kalikan dengan 9/5: ${temperature} × 9/5 = ${(temperature * 9/5).toFixed(1)}
3. Tambahkan 32: ${(temperature * 9/5).toFixed(1)} + 32 = ${convertedTemp.toFixed(1)}°F`;
        } else {
            // Jika input dalam Fahrenheit, konversi ke Celsius
            convertedTemp = (temperature - 32) * 5/9; // Rumus konversi °F ke °C
            resultText = `${temperature}°F = ${convertedTemp.toFixed(1)}°C`;
            
            // Menyusun langkah-langkah konversi untuk ditampilkan ke pengguna
            steps = `Langkah-langkah konversi Fahrenheit ke Celsius:
1. Ambil suhu dalam Fahrenheit: ${temperature}°F
2. Kurangi dengan 32: ${temperature} - 32 = ${(temperature - 32).toFixed(1)}
3. Kalikan dengan 5/9: ${(temperature - 32).toFixed(1)} × 5/9 = ${convertedTemp.toFixed(1)}°C`;
        }

        // Menghitung persentase tinggi air raksa berdasarkan suhu dalam Celsius
        const percentage = ((celsiusTemp + 40) / 90) * 100;
        mercury.style.height = `${percentage}%`; // Menyesuaikan tinggi air raksa dalam termometer

        // Menentukan warna air raksa berdasarkan rentang suhu
        let color;
        if (celsiusTemp < 0) {
            color = '#4a90e2'; // Warna biru untuk suhu dingin (di bawah 0°C)
        } else if (celsiusTemp < 20) {
            color = '#4ae2b9'; // Warna hijau kebiruan untuk suhu sejuk (0°C - 20°C)
        } else if (celsiusTemp < 35) {
            color = '#ffd700'; // Warna kuning untuk suhu hangat (20°C - 35°C)
        } else {
            color = '#ff4444'; // Warna merah untuk suhu panas (di atas 35°C)
        }
        mercury.style.background = color; // Menerapkan warna pada air raksa
        document.querySelector('.thermometer-bulb').style.background = color; // Menerapkan warna ke bola termometer

        // Menampilkan hasil konversi suhu di halaman
        resultDiv.textContent = resultText;
        // Menampilkan langkah-langkah konversi di halaman dengan mengganti newline (\n) menjadi <br>
        conversionStepsDiv.innerHTML = steps.replace(/\n/g, '<br>');
        
        // Menentukan pesan penjelasan berdasarkan suhu dalam Celsius
        let explanation = '';
        if (celsiusTemp < 0) {
            explanation = 'Suhu sangat dingin! Berhati-hatilah terhadap pembekuan.'; // Jika suhu di bawah 0°C
        } else if (celsiusTemp < 20) {
            explanation = 'Suhu sejuk, mungkin perlu menggunakan jaket.'; // Jika suhu antara 0°C dan 20°C
        } else if (celsiusTemp < 35) {
            explanation = 'Suhu nyaman dan normal.'; // Jika suhu antara 20°C dan 35°C
        } else {
            explanation = 'Suhu panas! Jangan lupa minum air yang cukup.'; // Jika suhu di atas 35°C
        }
        explanationDiv.textContent = explanation; // Menampilkan pesan penjelasan di halaman
    });
});
