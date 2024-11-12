export const HTML_PLACEHOLDER = `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./styles.css">
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
