document.addEventListener("DOMContentLoaded", function() {
            // Fungsi untuk mendapatkan jumlah request dari local storage
            function getRequestCount() {
                let requestCount = localStorage.getItem('requestCount');
                if (!requestCount) {
                    requestCount = 0;
                }
                return parseInt(requestCount, 10);
            }

            // Fungsi untuk menyimpan jumlah request ke local storage
            function saveRequestCount(count) {
                localStorage.setItem('requestCount', count);
            }

            // Fungsi untuk menambah jumlah request
            function increaseRequestCount() {
                let requestCount = getRequestCount();
                requestCount++;
                saveRequestCount(requestCount);
                document.getElementById('requestCount').textContent = `${requestCount}`;
            }

            // Dapatkan dan tampilkan jumlah request saat halaman dimuat
            let currentCount = getRequestCount();
            document.getElementById('requestCount').textContent = `${currentCount}`;

            // Tambahkan jumlah request saat halaman diakses
            increaseRequestCount();
        });