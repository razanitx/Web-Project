document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const activitySelect = document.getElementById("activity-select");
    const stars = document.querySelectorAll(".rating span");
    const activityTitle = document.querySelector(".selected-activity p");
    const activityImage = document.querySelector(".selected-activity img");
    let selectedRating = 0;

    // تحديث الصورة والنص حسب النشاط
    activitySelect.addEventListener("change", function () {
        const selectedOption = activitySelect.options[activitySelect.selectedIndex].text;

        // تحديث النص
        activityTitle.textContent = selectedOption;

        // تحديث الصورة حسب النشاط
        let imageFile = "";
        switch (selectedOption.toLowerCase()) {
            case "ballet":
                imageFile = "Ballet.jpg";
                break;
            case "drawing":
                imageFile = "draw.jpg";
                break;
            case "makeup":
                imageFile = "makeup.jpg";
                break;
            case "planting":
                imageFile = "Agriculture.jpg";
                break;
            case "cooking":
                imageFile = "cooking.jpg";
                break;
            case "sewing":
                imageFile = "sewing.jpg";
                break;
            default:
                imageFile = "default.jpg"; // في حال مافيه اختيار
        }

        activityImage.src = imageFile;
        activityImage.alt = selectedOption;
    });

    // تقييم النجوم
    stars.forEach((star, index) => {
        star.addEventListener("click", function () {
            selectedRating = index + 1;
            updateStarDisplay(selectedRating);
        });
    });

    function updateStarDisplay(rating) {
        stars.forEach((star, index) => {
            star.style.color = index < rating ? "gold" : "gray";
        });
    }

    // عند الإرسال
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedActivity = activitySelect.value;

        if (selectedActivity === "") {
            alert("Please select an activity.");
            return;
        }

        if (selectedRating === 0) {
            alert("Please provide a rating.");
            return;
        }

        const activityText = activitySelect.options[activitySelect.selectedIndex].text;
        alert(`Thank you for your feedback!\nYou’re rating for activity ${activityText} is ${selectedRating}`);

        // التحويل للصفحة الرئيسية
        window.location.href = "home.html";
    });
});