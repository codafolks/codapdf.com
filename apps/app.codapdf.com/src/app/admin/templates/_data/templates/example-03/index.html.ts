export const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice Template</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="invoice">
    <div class="invoice-header">
      <div class="invoice-title">Invoice</div>
      <button class="print-button" onclick="window.print()">Print</button>
    </div>
    <div class="invoice-body">
      <div class="invoice-info">
        <div class="client-info">
          <h2>Invoice To:</h2>
          <p>Client Name</p>
          <p>123 Client Street</p>
          <p>City, State 12345</p>
        </div>
        <div class="invoice-details">
          <p>Date: <span id="current-date"></span></p>
          <p>Invoice #: INV-001</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Web Development</td>
            <td>1</td>
            <td>$1,000.00</td>
            <td>$1,000.00</td>
          </tr>
          <tr>
            <td>UI/UX Design</td>
            <td>1</td>
            <td>$500.00</td>
            <td>$500.00</td>
          </tr>
        </tbody>
      </table>
        <div class="totals">
          <table class="totals-table">
            <tr>
              <td>Subtotal:</td>
              <td>$1,500.00</td>
            </tr>
            <tr>
              <td>Tax (10%):</td>
              <td>$150.00</td>
            </tr>
            <tr class="total">
              <td>Total:</td>
              <td>$1,650.00</td>
            </tr>
          </table>
        </div>
        <div class="payment-terms">
          <h3>Payment Terms:</h3>
          <p>Please pay within 30 days of receiving this invoice.</p>
        </div>
    </div>
  </div>
  <script>
    document.getElementById('current-date').textContent = new Date().toLocaleDateString();
  </script>
</body>
</html>
`;
