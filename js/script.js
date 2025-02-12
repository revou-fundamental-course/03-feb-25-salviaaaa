document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('temperatureForm');
    const mercury = document.querySelector('.mercury');
    const resultDiv = document.getElementById('result');
    const explanationDiv = document.getElementById('explanation');
    const conversionStepsDiv = document.getElementById('conversion-steps');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const temperature = parseFloat(document.getElementById('temperature').value);
        const unit = document.querySelector('input[name="unit"]:checked').value;
        
        // Validasi suhu
        let celsiusTemp;
        if (unit === 'celsius') {
            celsiusTemp = temperature;
            if (celsiusTemp < -40 || celsiusTemp > 50) {
                alert('Suhu harus berada antara -40°C dan 50°C');
                return;
            }
        } else {
            celsiusTemp = (temperature - 32) * 5/9;
            if (celsiusTemp < -40 || celsiusTemp > 50) {
                alert('Suhu harus berada antara -40°F dan 122°F');
                return;
            }
        }

        // Konversi suhu dan tampilkan langkah-langkah
        let convertedTemp;
        let resultText;
        let steps;
        
        if (unit === 'celsius') {
            convertedTemp = (temperature * 9/5) + 32;
            resultText = `${temperature}°C = ${convertedTemp.toFixed(1)}°F`;
            steps = `Langkah-langkah konversi Celsius ke Fahrenheit:
1. Ambil suhu dalam Celsius: ${temperature}°C
2. Kalikan dengan 9/5: ${temperature} × 9/5 = ${(temperature * 9/5).toFixed(1)}
3. Tambahkan 32: ${(temperature * 9/5).toFixed(1)} + 32 = ${convertedTemp.toFixed(1)}°F`;
        } else {
            convertedTemp = (temperature - 32) * 5/9;
            resultText = `${temperature}°F = ${convertedTemp.toFixed(1)}°C`;
            steps = `Langkah-langkah konversi Fahrenheit ke Celsius:
1. Ambil suhu dalam Fahrenheit: ${temperature}°F
2. Kurangi dengan 32: ${temperature} - 32 = ${(temperature - 32).toFixed(1)}
3. Kalikan dengan 5/9: ${(temperature - 32).toFixed(1)} × 5/9 = ${convertedTemp.toFixed(1)}°C`;
        }

        // Update termometer dan tampilan
        const percentage = ((celsiusTemp + 40) / 90) * 100;
        mercury.style.height = `${percentage}%`;

        // Update warna termometer berdasarkan suhu
        let color;
        if (celsiusTemp < 0) {
            color = '#4a90e2';
        } else if (celsiusTemp < 20) {
            color = '#4ae2b9';
        } else if (celsiusTemp < 35) {
            color = '#ffd700';
        } else {
            color = '#ff4444';
        }
        mercury.style.background = color;
        document.querySelector('.thermometer-bulb').style.background = color;

        // Tampilkan hasil
        resultDiv.textContent = resultText;
        conversionStepsDiv.innerHTML = steps.replace(/\n/g, '<br>');
        
        // Tampilkan penjelasan
        let explanation = '';
        if (celsiusTemp < 0) {
            explanation = 'Suhu sangat dingin! Berhati-hatilah terhadap pembekuan.';
        } else if (celsiusTemp < 20) {
            explanation = 'Suhu sejuk, mungkin perlu menggunakan jaket.';
        } else if (celsiusTemp < 35) {
            explanation = 'Suhu nyaman dan normal.';
        } else {
            explanation = 'Suhu panas! Jangan lupa minum air yang cukup.';
        }
        explanationDiv.textContent = explanation;
    });
});
