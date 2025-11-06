// Entry point for the popup React app
import './utils/dev-mock'; // Mock Chrome APIs for development
import { createRoot } from 'react-dom/client';
import Popup from './components/Popup';
import './styles/globals.css';

// Create root and render popup
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Popup />);
} else {
  console.error('Root container not found');
}