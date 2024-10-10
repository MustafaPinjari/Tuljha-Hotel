# 🌟 Tuljha Hotel 🌟

Welcome to **Tuljha Hotel**, a hotel management dashboard for managing and tracking expenses, orders, and organizational food bills. This project is built with **Django** and provides a comprehensive dashboard for monitoring daily activities, generating invoices, and analyzing monthly profits and expenses. 🎉

---

## 🌐 Project Overview

**Tuljha Hotel** is designed to help hotel owners track the number of meals consumed by different organizations and generate monthly invoices, providing a summary of total expenses and earnings.

Key features include:
- **Organization Management**: Manage multiple organizations that dine at the hotel.
- **Food Orders**: Track the number of meals and total food expenses for each organization.
- **Expense Management**: Record and track various daily expenses.
- **Invoice Generation**: Generate invoices for organizations based on monthly food consumption.
- **Dashboard**: View daily, weekly, and monthly analytics such as total revenue, expenses, and net profit.
- **Email Integration**: Automatically send invoices to organizations.

---

## 🛠️ Tech Stack

- **Backend**: Django (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite (Django default)
- **Charts**: Chart.js for visualizing analytics
- **Email**: Django Email Backend (SMTP)

---

## 📁 Project Structure

Here's the structure of the project:

```
TuljhaHotel/
│
├─── TuljhaHotel/
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── __init__.py
│
├─── management/
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   └── migrations/
│       └── __init__.py
│
├─── templates/
│   ├── organization_list.html
│   ├── create_food_order.html
│   ├── create_expense.html
│   └── dashboard.html
│
└─── manage.py
```

---

## 🔄 Project Flow

Here's how the **Tuljha Hotel** project flows from user interaction to backend processing:

1. **Organization Management**: 
   - Organizations can be added, viewed, and edited from the organization management page.
   - Each organization can be associated with multiple food orders.

2. **Food Orders**: 
   - Hotel managers can create new food orders for an organization by specifying the number of people and the total cost.
   - Each food order is linked to a specific organization and recorded in the database.

3. **Expense Management**: 
   - Daily expenses, such as food purchases or utilities, can be recorded.
   - These expenses will factor into the net profit calculation.

4. **Invoice Generation**:
   - At the end of each month, invoices are generated for each organization.
   - The invoice includes all food orders for that organization and the total cost for the month.

5. **Email Notification**:
   - Invoices are sent to organizations via email at the end of each month, ensuring smooth billing.

6. **Dashboard**:
   - A daily summary of total earnings, expenses, and net profits.
   - Visual analytics using charts to display revenue, expenses, and profit trends.

---

## 📝 Models

The key models in the project are:

### 1. **Organization**
Represents the organizations that visit the hotel.
```python
class Organization(models.Model):
    name = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
```

### 2. **FoodOrder**
Tracks the food orders made by each organization.
```python
class FoodOrder(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    number_of_people = models.IntegerField()
    food_items = models.TextField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
```

### 3. **Expense**
Tracks expenses incurred by the hotel.
```python
class Expense(models.Model):
    category = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    description = models.TextField()
```

### 4. **Invoice**
Generates and tracks invoices for organizations.
```python
class Invoice(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    month = models.CharField(max_length=20)
    date_created = models.DateField(auto_now_add=True)
```


## 📊 Dashboard

The dashboard provides the following features:

- **Total Revenue**: The total income generated from food orders.
- **Total Expenses**: The total amount of expenses recorded for the hotel.
- **Net Profit**: Revenue minus expenses, showing the hotel's net profit.

A visual summary using **Chart.js** makes it easy to track revenue and expenses over time.

---

## 📩 Invoice System

The invoice system will generate a monthly invoice for each organization. The steps are as follows:
1. Gather all food orders for a specific organization for the month.
2. Calculate the total cost.
3. Generate a PDF invoice (optional).
4. Send the invoice via email using the Django email backend.

---

## 🚀 Getting Started

To get started with **Tuljha Hotel**, follow these steps:

### 1. Clone the repository
```bash
git clone <repository-url>
cd TuljhaHotel
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Apply migrations
```bash
python manage.py migrate
```

### 4. Run the server
```bash
python manage.py runserver
```

### 5. Access the dashboard
Visit http://127.0.0.1:8000/dashboard/ to see the dashboard.

---

## ✉️ Email Configuration

For the email invoice system, configure your email backend in `settings.py`:

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.your-email-provider.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your-email@example.com'
EMAIL_HOST_PASSWORD = 'your-password'
```

---

## 📈 Future Enhancements

- Add user authentication to secure the dashboard.
- Implement PDF invoice generation.
- Add filters to analyze data over custom time ranges.
- Implement role-based access for hotel staff.

---

## 🏅 Contributions

Contributions are welcome! If you'd like to add a feature or fix a bug, please submit a pull request. 

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
