// expense.js

// Array to store expenses
const expenses = [];

// Function to add an expense
function addExpense(category, amount, date) {
    const expense = { category, amount, date };
    expenses.push(expense);
    displayExpenses();
}

// Function to display expenses in the table
function displayExpenses() {
    const tbody = document.querySelector('#expenses-table tbody');
    tbody.innerHTML = ''; // Clear existing table rows

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount}</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        
        tbody.appendChild(row);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1); // Remove expense from array
    displayExpenses(); // Update the displayed expenses
}

// Handle form submission
document.getElementById('expense-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const category = document.getElementById('expense-category').value;
    const amount = document.getElementById('expense-amount').value;
    const date = document.getElementById('expense-date').value;

    // Add expense to the list
    addExpense(category, amount, date);

    // Reset form fields
    this.reset();
});
