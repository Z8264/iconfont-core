module.exports = data => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Font ${data.fontName}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .page {
      width: 940px;
      padding: 30px 60px 100px;
      font-size: 14px;
      font-family: 'consolas';
      margin: 0 auto;
      background: #fff;
    }

    h1 {
      margin-left: -3px;
      font-size: 40px;
      line-height: 55px;
    }

    h2 {
      padding: 10px 0;
      font-size: 20px;
      font-weight: bold;
      line-height: 40px;
    }

    a {
      color: #d30;
    }

    a:hover {
      color: #f60;
    }

    table {
      width: 100%;
    }

    th,
    td {
      padding: 0 5px;
      width: 16.66%;
      text-align: left;
      line-height: 30px;
    }

    th {
      padding: 0 0 0 20px;
      border-left: 2px solid #ddd;
    }

    p {
      line-height: 20px;
      padding: 2px 0;
    }

    code {
      color: #069;
      font-family: 'consolas';
      border-radius: 3px;
    }

    ul {
      margin: 0 auto;
      list-style: none;
    }

    ul:after {
      content: '';
      display: table;
      clear: both;
    }

    li {
      width: 10%;
      padding: 5px 0 5px;
      float: left;
      cursor: pointer;
    }

    li i {
      display: block;
      font-size: 35px;
      line-height: 50px;
      text-align: center;
      transition: all ease-out .3s;
    }

    li:hover i {
      font-size: 45px;
    }

    li em,
    li span {
      display: block;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      font-style: normal;
      transition: all ease-out .3s;
    }

    li span {
      font-size: 12px;
    }

    li:hover em,
    li:hover span {
      color: #069;
    }

    pre {
      margin-left: 3px;
      padding: 5px 20px;
      line-height: 24px;
      white-space: pre-wrap;
      word-wrap: break-word;
      border-left: 2px solid #ddd;
    }
  </style>
  <style>
  ${data.css}
  </style>
</head>
<body>

<div class="page">
  <h1>Font "${data.fontName}"</h1>
  <p>Build by <a href="https://github.com/Z8264/iconfont-core" target="_blank">iconfont-core</a></p>
  <h2>Information</h2>
  <table>
    <tr>
      <th>Font Name：</th>
      <td><code>${data.fontName}</code></td>
      <th>Class Prefix：</th>
      <td><code>${data.prefix}</code></td>
      <th>Icons Number：</th>
      <td><code>${data.icons.length}</code></td>
    </tr>
  </table>

  <h2>Usage</h2>
  <pre><code>&lt;i class=&quot;${data.prefix} ${data.prefix}-[name]&quot;&gt;&lt;/i&gt;
&lt;!-- or --&gt
&lt;i class=&quot;${data.prefix}-[name]&quot;&gt;&lt;/i&gt;</code></pre>

  <h2>Icons</h2>
  <ul>
      ${data.icons
    .map(
      icon => `
      <li>
          <i class="${data.prefix} ${data.prefix}-${icon.name}"></i>
          <em>${icon.name}</em>
          <span>&x${icon.hex.toString('16')};</span>
      </li>
      `,
    )
    .join('')}
  </ul>
  <h2>CSS</h2>
  <pre><code>${data.css}</code></pre>

</div>

</body>
`;
