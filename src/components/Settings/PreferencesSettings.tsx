import React, { useState, useEffect } from 'react'
import './PreferencesSettings.css'
import { applyTheme, loadTheme, themeConfig, ThemeType } from '../../utils/themeHelper';

type Props = {}

const PreferencesSettings = (props: Props) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    return loadTheme();
  });

  const currentThemeConfig = themeConfig[currentTheme] || themeConfig.oscuro;

  const handleThemeChange = (theme: ThemeType) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className='content'>
      <h3>Preferencias</h3>
      <div className='s-divider'/>
      <h4>Apariencia</h4>
      <div className='themes-grid'>
      {(['claro', 'oscuro'] as ThemeType[]).map((themeKey) => {
          const theme = themeConfig[themeKey];
          return (
            <ThemeButton
              key={themeKey}
              themeName={theme.name}
              description={theme.description}
              gradient={theme.gradient}
              isSelected={currentTheme === themeKey}
              onClick={() => handleThemeChange(themeKey)}
            />
          );
        })}
      </div>
      <div className='theme-info'>
        <div className='color-preview'>
          <h5>Colores del tema actual:</h5>
          <div className='color-grid'>
            <ColorSwatch color={themeConfig[currentTheme].colors.base} label="Base" />
            <ColorSwatch color={themeConfig[currentTheme].colors.text} label="Texto" />
            <ColorSwatch color={themeConfig[currentTheme].colors.primary} label="Primario" />
            <ColorSwatch color={themeConfig[currentTheme].colors.secondary} label="Secundario" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferencesSettings

type ThemeButtonsProps = {
  themeName: string;
  description?: string;
  gradient: string;
  isSelected: boolean;
  onClick: () => void;
}

const ThemeButton = (props: ThemeButtonsProps) => {
  return (
    <button
      className={`theme-button ${props.isSelected ? 'selected' : ''}`}
      onClick={props.onClick}
      style={{ background: props.gradient }}
      title={props.description}
    >
      <div className='theme-button-content'>
        <h4>{props.themeName}</h4>
        {props.description && (
          <p className='theme-description'>{props.description}</p>
        )}
      </div>
      {props.isSelected && (
        <div className='selected-badge'>
          <span>✓</span>
        </div>
      )}
    </button>
  );
};

type ColorSwatchProps = {
  color: string;
  label: string;
};

const ColorSwatch = (props: ColorSwatchProps) => {
  return (
    <div className='color-swatch-item'>
      <div 
        className='color-swatch' 
        style={{ backgroundColor: props.color }}
      />
      <span className='color-label'>{props.label}</span>
      <span className='color-value'>{props.color}</span>
    </div>
  );
};