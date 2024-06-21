document.addEventListener("DOMContentLoaded", function() {
    // Fungsi untuk memperbarui visitor counter
    function updateVisitorCounter() {
        const visitsElement = document.getElementById('visits');
        
        // Mendapatkan data visitor dari Local Storage
        let visitorCount = localStorage.getItem('visitorCount');

        // Jika data visitor tidak ada, inisialisasi dengan 0
        if (!visitorCount) {
            visitorCount = 0;
        }

        // Menambah jumlah visitor
        visitorCount++;

        // Menyimpan kembali jumlah visitor ke Local Storage
        localStorage.setItem('visitorCount', visitorCount);

        // Menampilkan jumlah visitor di halaman
        visitsElement.textContent = `${visitorCount}`;
    }

    // Panggil fungsi untuk memperbarui visitor counter
    updateVisitorCounter();
});