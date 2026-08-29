// Parentdashboard.js

document.addEventListener("DOMContentLoaded", function () {
        const kidsGrid = document.querySelector(".kids-grid");
        const sortDropdown = document.getElementById("sort-kids");
    
        // Default kids to insert if localStorage is empty
        const defaultKids = [
            { name: "Nora", age: 10, photo: "kid1.jpg" },
            { name: "Anna", age: 8, photo: "kid2.jpg" },
            { name: "Lily", age: 12, photo: "kid3.jpg" },
        ];
    
        // Initialize localStorage if empty
        if (!localStorage.getItem("kidsData")) {
            localStorage.setItem("kidsData", JSON.stringify(defaultKids));
        }
    
        // Load and display kids
        function renderKids(sortType = "name") {
            kidsGrid.innerHTML = ""; // Clear existing
    
            let kids = JSON.parse(localStorage.getItem("kidsData"));
    
            // Sorting logic
            if (sortType === "name") {
                kids.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortType === "age") {
                kids.sort((a, b) => a.age - b.age);
            } else if (sortType === "name-rev") {
                kids.sort((a, b) => b.name.localeCompare(a.name));
            }
    
            // Display cards
            kids.forEach(kid => {
                const card = document.createElement("div");
                card.className = "kid-card";
                card.innerHTML = `
                    <img src="${kid.photo}" alt="${kid.name}">
                    <p><strong>Name:</strong> ${kid.name}</p>
                    <p><strong>Age:</strong> ${kid.age}</p>
                `;
                kidsGrid.appendChild(card);
            });
        }
    
        // Initial render
        renderKids();
    
        // Sort dropdown logic
        sortDropdown.addEventListener("change", function () {
            const value = sortDropdown.value;
            if (value === "name") {
                renderKids("name");
            } else if (value === "age") {
                renderKids("age");
            } else if (value === "z-a") {
                renderKids("name-rev");
            }
        });
    });
    