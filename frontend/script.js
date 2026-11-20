
const profileImage = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");
const profileForm = document.getElementById("profileForm");
const message = document.getElementById("message");

// Preview selected image
profileImage.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        if (!file.type.startsWith("image/")) {
            message.textContent = "Please select an image.";
            return;
        }

        profilePreview.src = URL.createObjectURL(file);
        message.textContent = "";
    }
});

// Submit profile to backend
profileForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const hobbies = document.getElementById("hobbies").value.trim();
    const file = profileImage.files[0];

    if (!name || !hobbies) {
        message.textContent = "Please complete all fields.";
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("hobbies", hobbies);

    if (file) {
        formData.append("profileImage", file);
    }

    try {
        message.textContent = "Saving profile...";

        const response = await fetch("http://localhost:3000/api/profiles", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to save profile.");
        }

        message.textContent = result.message;
        console.log("Saved profile:", result.profile);

    } catch (error) {
        console.error("Error:", error);
        message.textContent = error.message;
    }
});
