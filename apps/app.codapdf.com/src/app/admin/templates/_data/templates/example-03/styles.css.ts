export const styles = `
body {
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.invoice {
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  overflow: hidden;
}
.invoice-header {
  background-color: #2563eb;
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.invoice-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.print-button {
  background-color: white;
  color: #2563eb;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: bold;
}
.invoice-body {
  padding: 2rem;
}
.invoice-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.client-info h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.invoice-details {
  text-align: right;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}
th, td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}
th {
  background-color: #f9fafb;
  font-weight: bold;
}
.totals {
  display: flex;
  justify-content: flex-end;
}
.totals-table {
  width: 33%;
}
.totals-table td {
  padding: 0.25rem 0;
}
.totals-table td:last-child {
  text-align: right;
}
.total {
  font-weight: bold;
  font-size: 1.125rem;
}
.payment-terms {
  margin-top: 2rem;
  color: #4b5563;
}
.payment-terms h3 {
  margin-bottom: 0.5rem;
}
`;
