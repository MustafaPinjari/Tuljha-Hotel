// Sample data for organizations
let organizations = [];

// Function to render organizations
const renderOrganizations = () => {
  const tableBody = document.getElementById('organization-table-body');
  tableBody.innerHTML = '';
  organizations.forEach((org, index) => {
    const row = `<tr>
      <td>${org.name}</td>
      <td>${org.contact}</td>
      <td>${org.email}</td>
      <td>${org.totalOrdered}</td>
      <td><button onclick="deleteOrganization(${index})">Delete</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
};

// Function to delete organization
const deleteOrganization = (index) => {
  organizations.splice(index, 1);
  renderOrganizations();
};

// Handle form submission
document.getElementById("organization-form").onsubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById("org-name").value;
  const contact = document.getElementById("contact-person").value;
  const email = document.getElementById("email").value;

  // Add organization to the list
  organizations.push({ name, contact, email, totalOrdered: 0 });
  renderOrganizations();

  // Clear the form fields
  document.getElementById("org-name").value = '';
  document.getElementById("contact-person").value = '';
  document.getElementById("email").value = '';
};

// Function to download organizations as CSV
document.getElementById("download-btn").onclick = function() {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Organization Name,Contact Person,Email,Total Ordered\n"
    + organizations.map(org => `${org.name},${org.contact},${org.email},${org.totalOrdered}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "organizations.csv");
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "organizations.csv".
  document.body.removeChild(link); // Clean up
};

// Initial render
renderOrganizations();