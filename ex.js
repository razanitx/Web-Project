document.addEventListener("DOMContentLoaded", function () {
    const kidsSelect = document.getElementById("child");
    const skillSelect = document.getElementById("skill");
    const ageSelect = document.getElementById("age");
    const heightSelect = document.getElementById("height");
    const activityFilter = document.getElementById("activity-filter");
    const submitBtn = document.querySelector(".submit-btn");
    const resultDiv = document.getElementById("result");
    const activityCheckboxes = document.querySelectorAll(".activity-card input[type='checkbox']");

   
    const activities = [
        { name: "Ballet", coach: "Kim Laton", prerequisite: "None" },
        { name: "Cooking", coach: "Nadia Bell", prerequisite: "Basic Cooking" },
        { name: "Drawing", coach: "Kristin Watson", prerequisite: "None" },
        { name: "Makeup", coach: "Kelly Bell", prerequisite: "Basic makeup" },
        { name: "Sewing", coach: "Rebekah Marvin", prerequisite: "None" },
        { name: "Planting", coach: "Kim Laton", prerequisite: "Basic Planting" }
    ];

    
    const uniqueCoaches = [...new Set(activities.map(a => a.coach))];
    const uniquePrereqs = [...new Set(activities.map(a => a.prerequisite).filter(p => p !== "None"))];

    // تعبئة الفلتر
    activityFilter.innerHTML = `<option value="">No Filter</option>`;
    uniqueCoaches.forEach(coach => {
        activityFilter.innerHTML += `<option value="${coach}">${coach}</option>`;
    });
    uniquePrereqs.forEach(prereq => {
        activityFilter.innerHTML += `<option value="${prereq}">${prereq}</option>`;
    });

    // استرجاع أسماء الأطفال من Local Storage
    if (!localStorage.getItem("kids")) {
        const defaultKids = ["Nora", "Anna", "Lily"];
        localStorage.setItem("kids", JSON.stringify(defaultKids));
    }

    const kids = JSON.parse(localStorage.getItem("kids"));
    kidsSelect.innerHTML = `<option value="" disabled selected>Choose your kid</option>`;
    kids.forEach(kid => {
        kidsSelect.innerHTML += `<option value="${kid}">${kid}</option>`;
    });

    // إخفاء وتعطيل الأنشطة في البداية
    activityCheckboxes.forEach((checkbox) => {
        checkbox.parentElement.style.display = "none"; // إخفاء النشاط
        checkbox.disabled = true; // تعطيل الاختيار
    });

    // فلترة الأنشطة حسب Coach أو Prerequisite
    activityFilter.addEventListener("change", function () {
        const filterValue = activityFilter.value.toLowerCase();

        let anyMatch = false;

        activityCheckboxes.forEach((checkbox, index) => {
            const activity = activities[index];
            const coachMatch = activity.coach.toLowerCase().includes(filterValue);
            const prereqMatch = activity.prerequisite.toLowerCase().includes(filterValue);

            if (filterValue === "" || (!coachMatch && !prereqMatch)) {
                checkbox.parentElement.style.display = "none"; // إخفاء النشاط
                checkbox.checked = false;
                checkbox.disabled = true; // تعطيل الاختيار
            } else {
                checkbox.parentElement.style.display = "block"; // إظهار النشاط
                checkbox.disabled = false; // تفعيل الاختيار
                anyMatch = true;
            }
        });

        if (!anyMatch && filterValue !== "") {
            alert("No matching activities found.");
        }
    });

    // التحقق والإرسال
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const selectedKid = kidsSelect.value;
        const selectedSkill = skillSelect.value;
        const selectedAge = ageSelect.value;
        const selectedHeight = heightSelect.value;

        const selectedActivities = [];
        activityCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedActivities.push(activities[index]);
            }
        });

        // تحقق من الإدخالات
        if (selectedKid === "") {
            alert("Please select a kid.");
            return;
        }

        if (selectedActivities.length === 0) {
            alert("Please select at least one activity.");
            return;
        }

        // عرض النتيجة الكاملة
        let resultHTML = `<p>${selectedKid} has been successfully enrolled in the following activities:</p><ul>`;
        selectedActivities.forEach(activity => {
            resultHTML += `<li>${activity.name} 
            (Coach: ${activity.coach}, Skill Level: ${selectedSkill || "N/A"}, Age: ${selectedAge || "N/A"}, Height: ${selectedHeight || "N/A"})</li>`;
        });
        resultHTML += "</ul>";

        resultDiv.innerHTML = resultHTML;

        
        resultDiv.style.border = "2px solid #ccc";
        resultDiv.style.padding = "15px";
        resultDiv.style.marginTop = "20px";
        resultDiv.style.backgroundColor = "#f9f9f9";
        resultDiv.style.width = "fit-content";

        // مسح النموذج
        kidsSelect.selectedIndex = 0;
        skillSelect.selectedIndex = 0;
        ageSelect.selectedIndex = 0;
        heightSelect.selectedIndex = 0;
        activityFilter.selectedIndex = 0;
        activityCheckboxes.forEach(checkbox => checkbox.checked = false);
        activityCheckboxes.forEach(checkbox => {
            checkbox.parentElement.style.display = "none"; // إخفاء الكل بعد الإرسال
            checkbox.disabled = true; // تعطيل بعد الإرسال
        });
    });
});