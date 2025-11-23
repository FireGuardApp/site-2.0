// Регистрация сервис-воркера
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/site-2.0/sw.js");

    // Слушаем сообщение от SW
    navigator.serviceWorker.addEventListener("message", event => {
        if (event.data?.type === "NEW_VERSION") {
            showUpdateBanner();
        }
    });
}

// Показываем баннер обновления
function showUpdateBanner() {
    const banner = document.getElementById("update-banner");
    banner.style.display = "flex";

    document.getElementById("update-btn").addEventListener("click", () => {
        window.location.reload();
    });
}