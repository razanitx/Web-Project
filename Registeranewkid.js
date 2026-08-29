document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("kidForm");
        const submittedInfo = document.getElementById("submittedInfo");
    
        form.addEventListener("submit", function (e) {
            e.preventDefault();
    
            const firstName = document.getElementById("first-name").value.trim();
            const lastName = document.getElementById("last-name").value.trim();
            const gender = document.querySelector('input[name="gender"]:checked');
            const photo = document.getElementById("photo").files[0];
            const age = document.getElementById("age").value.trim();
            const dob = document.getElementById("date").value;
            const height = document.getElementById("height").value.trim();
            const weight = document.getElementById("weight").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
    
            if (!firstName || !lastName || !gender || !age || !dob || !height || !weight || !email || !phone || !photo) {
                alert("❗ Please fill all fields and upload a photo.");
                return;
            }
    
            const nameRegex = /^[A-Za-z]/;
            const phoneRegex = /^\d{10}$/;
    
            if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
                alert("❗ Name must start with a letter.");
                return;
            }
    
            if (!phoneRegex.test(phone)) {
                alert("❗ Phone number must be exactly 10 digits.");
                return;
       }
    
            const reader = new FileReader();
    
            reader.onload = function (event) {
                const base64Photo = event.target.result;
                const fullName = `${firstName} ${lastName}`;
    
                const newKid = {
                    name: fullName,
                    age: parseInt(age),
                    photo: base64Photo
                };
    
                let kidsData = JSON.parse(localStorage.getItem("kidsData")) || [];
                kidsData.push(newKid);
                localStorage.setItem("kidsData", JSON.stringify(kidsData));
    
                submittedInfo.innerHTML = `
                    <div id="print-section" style="margin-top: 20px;">
                        <img src="${base64Photo}" alt="${fullName}" style="width:150px; height:150px; object-fit:cover; border-radius: 10px;">
                        <p><strong>Child Name:</strong> ${fullName}</p>
                        <p><strong>Date of Birth:</strong> ${dob}</p>
                        <p><strong>Gender:</strong> ${gender.value}</p>
                        <p><strong>Age:</strong> ${age}</p>
                        <p><strong>Height:</strong> ${height} cm</p>
                        <p><strong>Weight:</strong> ${weight} kg</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                    </div>
                `;
    
                // ✅ الطباعة بعد التأكد من أن الصورة ظاهرة
                setTimeout(() => {
                    window.print();
                    form.reset();
                }, 500); // تأخير بسيط لتفادي مشكلة الصورة البيضاء
            };
    
            reader.readAsDataURL(photo);
        });
    });
    