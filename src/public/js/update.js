const preventSumitForm = () => {
    ocument.getElementById('updateForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent the form from submitting the traditional way
    });
}