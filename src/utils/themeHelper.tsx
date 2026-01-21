export type ThemeType = 'aether' | 'claro' | 'oscuro';

export const themeConfig = {
  claro: {
    name: 'Claro',
    description: 'Tema claro neutro',
    gradient: 'linear-gradient(135deg, #FAF7F9 15%, #e0d5de 80%, #f48fb1 150%)',
    colors: {
      base: '#FAF7F9',
      text: '#212529',
      primary: '#e0d5de',
      secondary: '#f48fb1',
    }
  },
  oscuro: {
    name: 'Oscuro',
    description: 'Tema oscuro estándar',
    gradient: 'linear-gradient(135deg, #121212 15%, #2d2d2d 80%, #2e7d32 150%)',
    colors: {
      base: '#1A1A1A',
      text: '#e0e0e0',
      primary: '#2d2d2d',
      secondary: '#2e7d32',
    }
  }
};


export const applyTheme = (theme: ThemeType) => {
  const body = document.body;
  
  body.classList.remove('theme-claro', 'theme-oscuro');
  
  body.classList.add(`theme-${theme}`);
  localStorage.setItem('app-theme', theme);
  
  console.log(`Tema cambiado a: ${theme}`);
};

export const loadTheme = (): ThemeType => {
  const saved = localStorage.getItem('app-theme') as ThemeType;
  
  if (saved && ['claro', 'oscuro'].includes(saved)) {
    applyTheme(saved);
    return saved;
  }

  applyTheme('oscuro');
  return 'oscuro';
};