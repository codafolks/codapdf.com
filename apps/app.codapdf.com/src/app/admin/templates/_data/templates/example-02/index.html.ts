export const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="invoice-container">
    <div class="invoice-header">
      <div class="logo-name">
        <div class="logo"></div>
        <div class="name">Logo & Name</div>
      </div>
      <div class="invoice-info">
        <div class="invoice-number">Invoice #100</div>
        <div class="invoice-date">07 March 2021</div>
      </div>
    </div>
    <div class="invoice-details">
      <div class="invoice-to">
        <h3>INVOICE TO</h3>
        <p>Client Name</p>
        <p>
          123 Alphabet Road, Suite 01<br>
            Indianapolis, IN 46260<br>
            clientname@clientwebsite.com<br>
            317.123.8765
        </p>
      </div>
      <div class="due-date-amount">
        <div class="due-date">
          <h3>DUE DATE</h3>
          <p>07 April 2021</p>
        </div>
        <div class="amount">
          <h3>AMOUNT</h3>
          <p>$3,500</p>
        </div>
      </div>
    </div>

      <div class="invoice-table">
        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>Item Names Goes Here<br><span>Description goes here</span></td>
                <td>$100</td>
                <td>4</td>
                <td>$400.00</td>
              </tr>
              <tr>
                <td>Lorem Ipsum<br><span>Description goes here</span></td>
                <td>$250</td>
                <td>2</td>
                <td>$500.00</td>
              </tr>
              <tr>
                <td>Dolor Set Amit Caslum<br><span>Description goes here</span></td>
                <td>$300</td>
                <td>1</td>
                <td>$300.00</td>
              </tr>
              <tr class="subtotal">
                <td colspan="3">Subtotal</td>
                <td>$1200.00</td>
              </tr>
              <tr class="tax">
                <td colspan="3">Tax 4.7%</td>
                <td>$5000.00</td>
              </tr>
              <tr class="total">
                <td colspan="3">Total</td>
                <td>$12,000.00</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div class="invoice-footer">
        <div class="terms-conditions">
          <h3>Terms & Conditions</h3>
          <p>Please make payment within 30 days of issue of the invoice.</p>
        </div>
        <div class="payment-options">
          <h3>Payment Options</h3>
          <p>Paypal<br>Credit Card</p>
        </div>
      </div>
      <div class="footer">
        <p>companywebsite.com | company@website.com | 317.123.8765 | 123 Alphabet Road, Suite 01, Indianapolis, IN 46260</p>
      </div>
  </div>
</body>
</html>
`;
