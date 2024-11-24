export const styles = `
body{
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
.invoice-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.brand img {
  max-width: 150px;
}
.invoice-details {
  text-align: right;
}

.company-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.company-info h3 {
  margin-bottom: 5px;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.invoice-table th, .invoice-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.invoice-table th {
  background-color: #f0f0f0;
}

.invoice-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.totals {
  text-align: right;
  margin-bottom: 20px;
}

.totals p {
  margin: 5px 0;
  font-size: 16px;
}

.payment-details {
  margin-bottom: 20px;
}

.notes {
  font-size: 12px;
  color: #777;
  margin-bottom: 20px;
}
.invoice-footer {
  text-align: center;
  font-size: 12px;
  color: #777;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}
`;
