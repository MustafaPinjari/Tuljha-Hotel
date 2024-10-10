document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('organization-form');
  const tableBody = document.getElementById('organization-table-body');
  let organizations = [];

  // Handle form submission
  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the form from refreshing the page

      // Get form values
      const orgName = document.getElementById('org-name').value;
      const contactPerson = document.getElementById('contact-person').value;
      const email = document.getElementById('email').value;

      // Create a new row in the table
      const newRow = document.createElement('tr');

      newRow.innerHTML = `
          <td>${orgName}</td>
          <td>${contactPerson}</td>
          <td>${email}</td>
          <td>0</td>  <!-- Assuming 'Total Ordered' is 0 initially -->
          <td><button class="delete-btn">Delete</button></td>
      `;

      // Append the new row to the table body
      tableBody.appendChild(newRow);

      // Clear form fields
      form.reset();

      // Optional: Handle row deletion
      const deleteBtn = newRow.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', function () {
          tableBody.removeChild(newRow);
      });
  });
});
