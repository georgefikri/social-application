const STORAGE_KEY = 'social_support_form_data';

export const saveFormData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...data,
      lastSaved: new Date().toISOString()
    }));
    return true;
  } catch (error) {
    console.error('Failed to save form data:', error);
    return false;
  }
};

export const loadFormData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load form data:', error);
    return null;
  }
};

export const clearFormData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear form data:', error);
    return false;
  }
};