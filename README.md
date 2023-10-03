# Tistory Markdown Mermaid

- Mermaid : https://mermaid.js.org
- Mermaid Github README.md: https://github.com/hsuhau/mermaid/tree/main

> Doing so will command the mermaid parser to look for the `<div>` tags with `class="mermaid"`. From these tags mermaid will try to read the diagram/chart definitons and render them into svg charts.

# Vanilla JS

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('code.language-mermaid');

    for (const element of elements) {
      const div = document.createElement('div');
      div.innerHTML = element.textContent;
      div.className = 'mermaid';

      const pre = element.parentElement;
      pre.style.textAlign = 'center';
      pre.removeChild(element);
      pre.appendChild(div);
    }

    mermaid.initialize({ startOnLoad: true });
  });
</script>
```

# jQuery

```html
<!-- Required jQuery CDN script -->

<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>
  $(document).ready(() => {
    const elements = $('code.language-mermaid');

    elements.parent('pre').css('text-align', 'center');
    elements.contents().unwrap().wrap('<div class="mermaid"></div>');

    mermaid.initialize({ startOnLoad: true });
  });
</script>
```
