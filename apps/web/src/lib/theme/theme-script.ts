// Esse script é injetado como string diretamente no <head> via dangerouslySetInnerHTML
// para rodar antes do React hidratar e evitar flash de tema incorreto.
// NÃO importar módulos aqui — precisa ser código puro executável no browser.
export const THEME_SCRIPT = `
  (function() {
    try {
      var theme = localStorage.getItem('crm-theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;