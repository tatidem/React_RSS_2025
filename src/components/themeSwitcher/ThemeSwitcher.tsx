import useTheme from '@/core/context/useTheme';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ textAlign: 'right' }}>
      <button
        onClick={() => {
          console.log('Switching theme:', theme);
          toggleTheme();
        }}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;
