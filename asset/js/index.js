// Executes when document is loaded
document.addEventListener("DOMContentLoaded", (ev) => {
  // Recent Orders Data
  document.getElementById("recent-orders--table").appendChild(buildTableBody());

  // Updates Data
  document
    .getElementsByClassName("recent-updates")
    .item(0)
    .appendChild(buildUpdatesList());

  // Sales Analytics
  const salesAnalytics = document.getElementById("analytics");
  buildSalesAnalytics(salesAnalytics);
});

// Document Builder
const buildTableBody = () => {
  const recentOrderData = RECENT_ORDER_DATA;

  const tbody = document.createElement("tbody");

  let bodyContent = "";
  for (const row of recentOrderData) {
    bodyContent += `
      <tr>
        <td>${row.productName}</td>
        <td>${row.productNumber}</td>
        <td>${row.payment}</td>
        <td class="${row.statusColor}">${row.status}</td>
        <td class="primary">Details</td>
      </tr>
    `;
  }

  tbody.innerHTML = bodyContent;

  return tbody;
};

const buildUpdatesList = () => {
  const updateData = UPDATE_DATA;

  const div = document.createElement("div");
  div.classList.add("updates");

  let updateContent = "";
  for (const update of updateData) {
    updateContent += `
      <div class="update">
        <div class="profile-photo">
          <img src="${update.imgSrc}" />
        </div>
        <div class="message">
          <p><b>${update.profileName}</b> ${update.message}</p>
          <small class="text-muted">${update.updatedTime}</small>
        </div>
      </div>
    `;
  }

  div.innerHTML = updateContent;

  return div;
};

const buildSalesAnalytics = (element) => {
  const salesAnalyticsData = SALES_ANALYTICS_DATA;

  for (const analytic of salesAnalyticsData) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.classList.add(analytic.itemClass);

    const itemHtml = `
      <div class="icon">
        <span class="material-icons-sharp"> ${analytic.icon} </span>
      </div>
      <div class="right">
        <div class="info">
          <h3>${analytic.title}</h3>
          <small class="text-muted"> Last 24 Hours </small>
        </div>
        <h5 class="${analytic.colorClass}">${analytic.percentage}%</h5>
        <h3>${analytic.sales}</h3>
      </div>
    `;

    item.innerHTML = itemHtml;

    element.appendChild(item);
  }
};

// Document operation functions
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Show Sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Hide Sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// Change Theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

// Sample data for organizations and invoices
let organizations = []
let invoices = []

// Function to add organization
const addOrganization = (name, contact, email) => {
  organizations.push({ name, contact, email, totalOrdered: 0 })
  renderOrganizations()
}

// Function to render organizations
const renderOrganizations = () => {
  const tableBody = document.getElementById('organization-table-body')
  tableBody.innerHTML = ''
  organizations.forEach((org, index) => {
    const row = `<tr>
      <td>${org.name}</td>
      <td>${org.contact}</td>
      <td>${org.email}</td>
      <td>${org.totalOrdered}</td>
      <td><button onclick="deleteOrganization(${index})">Delete</button></td>
    </tr>`
    tableBody.innerHTML += row
  })
}

// Function to delete organization
const deleteOrganization = (index) => {
  organizations.splice(index, 1)
  renderOrganizations()
}

// Function to handle food order submission
const handleFoodOrderSubmit = (event) => {
  event.preventDefault()
  const organization = document.getElementById('organization').value
  const peopleServed = document.getElementById('people-served').value
  const foodItems = document.getElementById('food-items').value
  const totalCost = document.getElementById('total-cost').value

  // Update organization total ordered
  const org = organizations.find(org => org.name === organization)
  if (org) {
    org.totalOrdered += parseFloat(totalCost)
  }

  // Add to invoices
  invoices.push({ organization, totalCost, status: 'Unpaid' })
  renderInvoices()
  renderOrganizations()
}

// Function to render invoices
const renderInvoices = () => {
  const tableBody = document.getElementById('invoice-table-body')
  tableBody.innerHTML = ''
  invoices.forEach((invoice, index) => {
    const row = `<tr>
      <td>${invoice.organization}</td>
      <td>${invoice.totalCost}</td>
      <td>${invoice.status}</td>
      <td><button onclick="markAsPaid(${index})">Mark as Paid</button></td>
    </tr>`
    tableBody.innerHTML += row
  })
}

// Function to mark invoice as paid
const markAsPaid = (index) => {
  invoices[index].status = 'Paid'
  renderInvoices()
}

// Event listeners
document.getElementById('food-order-form').addEventListener('submit', handleFoodOrderSubmit)
document.getElementById('add-organization-btn').addEventListener('click', () => {
  const name = prompt('Enter organization name:')
  const contact = prompt('Enter contact person:')
  const email = prompt('Enter email:')
  addOrganization(name, contact, email)
})

// Initial render
renderOrganizations();