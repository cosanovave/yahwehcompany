/* Meta Pixel de Yahweh Company.
   1) Pega el ID del píxel en PIXEL_ID (solo números). Mientras esté vacío, no hace nada.
   2) Respeta el aviso de cookies: si el visitante pulsa "Rechazar" (yahweh_cookies = 'rechazado'),
      el píxel no se carga. Si acepta después, se carga en ese momento.
   Eventos: PageView (todas las páginas), ViewContent (abrir un producto),
   AddToCart (agregar al carrito) e InitiateCheckout (Finalizar compra).
   La compra (Purchase) la envía el canal Facebook & Instagram de Shopify en el checkout. */
(function () {
  var PIXEL_ID = '1684285676648950';

  var cargado = false;
  function decision() {
    try { return localStorage.getItem('yahweh_cookies'); } catch (e) { return null; }
  }
  function cargar() {
    if (cargado || !PIXEL_ID || decision() === 'rechazado') return;
    cargado = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  window.yPixel = function (evento, datos) {
    if (!cargado || typeof window.fbq !== 'function') return;
    try { window.fbq('track', evento, datos || {}); } catch (e) { /* no romper el sitio */ }
  };

  cargar();
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'cookiesAceptar') setTimeout(cargar, 0);
  });
})();
