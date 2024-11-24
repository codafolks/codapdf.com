export const styles = `
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f8f8;
}

.invoice-container {
  width: 800px;
  margin: 20px auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
}

.logo-name {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  background-color: #000;
  border-radius: 50%;
  margin-right: 10px;
}

.name {
  font-size: 24px;
  font-weight: bold;
}

.invoice-info {
  text-align: right;
}

.invoice-number {
  font-weight: bold;
}

.invoice-date {
  color: #888;
}

.invoice-details {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  background-color: #e0f7fa;
}

.invoice-to,
.due-date-amount {
  width: 48%;
}

.due-date-amount {
  display: flex;
  justify-content: space-between;
}

h3 {
  margin: 0;
  font-weight: bold;
  color: #00acc1;
}

p {
  margin: 5px 0;
  color: #333;
}

.invoice-table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

.invoice-table table {
  width: 100%;
}

.invoice-table th,
.invoice-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.invoice-table th {
  background-color: #e0f7fa;
  color: #00acc1;
  font-weight: bold;
}

.invoice-table td {
  color: #333;
}

.invoice-table .subtotal td,
.invoice-table .tax td,
.invoice-table .total td {
  text-align: right;
  font-weight: bold;
}

.invoice-table .total td {
  color: #00acc1;
  font-size: 18px;
}

.invoice-table td span {
  display: block;
  color: #888;
  font-size: 14px;
}

.invoice-footer {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  margin-top: 20px;
  border-top: 2px solid #e0e0e0;
}

.footer {
  text-align: center;
  font-size: 14px;
  color: #888;
  padding-top: 10px;
  border-top: 2px solid #e0e0e0;
}

`;
