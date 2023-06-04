document.addEventListener('DOMContentLoaded', function () {
    const submitbutton = document.querySelector('.submit');

    submitbutton.addEventListener('click', function () {
        const submitbutton = document.querySelector('.submit');
        const NameInput = document.getElementById('name');
        const exam1Input = document.getElementById('exam1');
        const exam2Input = document.getElementById('exam2');
        const exam3Input = document.getElementById('exam3');

        // Get the updated value from the input field
        const updatedName = NameInput.value;
        const updatedexam1 = exam1Input.value;
        const updatedexam2 = exam2Input.value;
        const updatedexam3 = exam3Input.value;
        // Validate the input fields
        if (updatedName.length < 3 || updatedName.length > 20) {
            const data = "Name must have at least 4 characters";
            const contentDiv = document.getElementById("errormessage");
            contentDiv.style.color = "red";
            contentDiv.innerHTML = data;
            return;
        }

        if (isNaN(Number(updatedexam1)) || isNaN(Number(updatedexam2)) || isNaN(Number(updatedexam3))) {
            const data = "Exam scores should only contain numbers";
            const contentDiv = document.getElementById("errormessage");
            contentDiv.style.color = "red";
            contentDiv.innerHTML = data;

            return;
        }
        if (Number(updatedexam1) > 100 || Number(updatedexam1) < 0 || Number(updatedexam1) > 100 || Number(updatedexam1) < 0 || Number(updatedexam1) > 100 || Number(updatedexam1) < 0) {
            const data = "Exam scores must be between 0 and 100";
            const contentDiv = document.getElementById("errormessage");
            contentDiv.innerHTML = data;
            contentDiv.style.color = "red";
            return;
        }
        // Send a request to the server to save the student
        fetch('/savestudent', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: updatedName,
                exam1: updatedexam1,
                exam2: updatedexam2,
                exam3: updatedexam3
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Student saved successfully!') {
                    const contentDiv = document.getElementById("errormessage");
                    contentDiv.style.color = "black";
                    const successMessage = "Details saved successfully!";
                    contentDiv.innerHTML = successMessage;
                }
                // Handle the response from the server if needed
                console.log(data);
                NameInput.value = '';
                exam1Input.value = '';
                exam2Input.value = '';
                exam3Input.value = '';
            })
            .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    });
});
