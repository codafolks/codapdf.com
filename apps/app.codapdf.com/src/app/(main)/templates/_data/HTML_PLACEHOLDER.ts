export const HTML_PLACEHOLDER = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
      line-height: 1.5;
      padding: 2rem;
      background-color: #f0f0f0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    h1 {
      color: #0070f3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>{{title}}</h1>
    <p>{{description}}</p>
    <ul>
      {% for item in bulletPoints %}
      <li>{{item.description}}</li>
      {% endfor %}
    </ul>
  </div>
</body>
</html>`;
