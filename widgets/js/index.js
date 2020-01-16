<script>
  const opts = {
    position: "right",
    spacing: {
      side: 25,
      bottom: 25
    }
  };

  (function init(opts) {
    window.addEventListener("DOMContentLoaded", () => {
      let body;
      let container;
      let iframe;

      body = document.getElementsByTagName("body")[0];

      container = document.createElement("div");
      container.setAttribute("id", "comba");

      container.style.position = "fixed";
      container.style.bottom = `${opts.spacing.bottom}px`;
      container.style[opts.position] = `${opts.spacing.side}px`;

      iframe = document.createElement("iframe");
      iframe.setAttribute("src", "https://nickparsons.io");
      iframe.setAttribute("name", "conga");
      iframe.setAttribute("min-height", "450px");
      iframe.setAttribute("height", "475px");
      iframe.setAttribute("width", "375px");
      iframe.setAttribute("frameBorder", "0");
      iframe.setAttribute("sandbox", "allow-scripts");
      iframe.contentWindow;

      container.appendChild(iframe);
      body.appendChild(container);
    });
  })(opts);
</script>