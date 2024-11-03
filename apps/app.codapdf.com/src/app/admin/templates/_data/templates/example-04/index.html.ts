export const html = `
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Business Report</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <link rel="stylesheet" href="./styles.css">
    </head>
    <body>
    <header>
      <h1>Q2 2023 Business Report</h1>
    </header>
    <main>
      <section>
        <h2>Executive Summary</h2>
        <p>
          This report provides an overview of our company's performance in Q2
          2023. Key highlights include...
        </p>
      </section>

      <section>
        <h2>Financial Performance</h2>
        <div class="chart-container">
          <canvas id="revenueChart"></canvas>
        </div>
        <p>
          Our revenue has shown consistent growth over the past quarter, with a
          notable increase in...
        </p>
      </section>

      <section>
        <h2>Market Share</h2>
        <div class="chart-container">
          <canvas id="marketShareChart"></canvas>
        </div>
        <p>Our market share has expanded in key sectors, particularly in...</p>
      </section>

      <section>
        <h2>Customer Satisfaction</h2>
        <div class="chart-container">
          <canvas id="satisfactionChart"></canvas>
        </div>
        <p>
          Customer satisfaction ratings have improved across all product lines,
          with our new product receiving exceptionally positive feedback...
        </p>
      </section>

      <section>
        <h2>Conclusion and Future Outlook</h2>
        <p>
          Based on our Q2 performance, we project continued growth in the coming
          quarter. Key areas of focus will include...
        </p>
      </section>
    </main>
    <footer>
      <p>© 2023 Your Company Name. All rights reserved.</p>
    </footer>

    <script>
      // Revenue Chart
      new Chart(document.getElementById("revenueChart"), {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Revenue (in millions)",
              data: [12, 19, 3, 5, 2, 3],
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          animation: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Monthly Revenue",
            },
          },
        },
      });

      // Market Share Chart
      new Chart(document.getElementById("marketShareChart"), {
        type: "pie",
        data: {
          labels: ["Our Company", "Competitor A", "Competitor B", "Others"],
          datasets: [
            {
              data: [30, 25, 20, 25],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
            },
          ],
        },
        options: {
          animation: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Market Share Distribution",
            },
          },
        },
      });

      // Customer Satisfaction Chart
      new Chart(document.getElementById("satisfactionChart"), {
        type: "bar",
        data: {
          labels: ["Product A", "Product B", "Product C", "Product D"],
          datasets: [
            {
              label: "Satisfaction Rating",
              data: [4.5, 4.2, 3.8, 4.7],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          animation: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Customer Satisfaction by Product",
            },
          },
        },
      });
    </script>
    </body>
  </html>
`;
