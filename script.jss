const button = document.getElementById("startButton");
const message = document.getElementById("message");

button.addEventListener("click", function () {
    message.textContent = "تم تشغيل الموقع بنجاح!";
});