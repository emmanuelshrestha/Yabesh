document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".signup-form");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); // prevent default form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if(name === "" || email === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);

        // Send data to PHP via fetch
        fetch("signup.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // show response from PHP
            form.reset(); // clear the form
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
    });
});