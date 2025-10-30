import React from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Language } from '@mui/icons-material';

const toggleButtonStyles = {
  '& .MuiToggleButton-root': {
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    margin: '0 2px',
    padding: '6px 12px',
    fontWeight: 500,
    fontSize: '13px',
    minWidth: '50px',
    color: '#6b7280',
    '&:hover': {
      backgroundColor: '#f3f4f6',
      borderColor: '#3b82f6',
      color: '#3b82f6',
    },
    '&.Mui-selected': {
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      color: '#ffffff',
      fontWeight: 600,
      '&:hover': {
        backgroundColor: '#2563eb',
        borderColor: '#2563eb',
      },
    },
  },
  '& .MuiToggleButtonGroup-grouped': {
    '&:not(:first-of-type)': {
      borderLeft: '1px solid #e5e7eb',
      marginLeft: '2px',
    },
    '&.Mui-selected:not(:first-of-type)': {
      borderLeft: '1px solid #3b82f6',
    },
  },
};

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage) {
      i18n.changeLanguage(newLanguage);
      document.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage;
    }
  };

  return (
    <div className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200">
      <Language className="text-blue-600 text-lg" />
      <ToggleButtonGroup
        value={i18n.language}
        exclusive
        onChange={handleLanguageChange}
        aria-label="language selection"
        size="small"
        sx={toggleButtonStyles}
      >
        <ToggleButton value="en" aria-label="English">
          🇺🇸 EN
        </ToggleButton>
        <ToggleButton value="ar" aria-label="Arabic">
          🇸🇦 عربي
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default LanguageSwitch;
