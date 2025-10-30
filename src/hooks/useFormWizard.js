import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep, loadSavedData, resetForm } from '../store/formSlice';
import { saveFormData, loadFormData } from '../utils/storage';

export const useFormWizard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentStep, formData } = useSelector(state => state.form);
  
  const [isStepValid, setIsStepValid] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3;

  const handleValidationChange = useCallback((isValid) => {
    setIsStepValid(isValid);
  }, []);

  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      dispatch(loadSavedData(savedData));
    }
  }, [dispatch]);

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      dispatch(setCurrentStep(currentStep + 1));
      setIsStepValid(false);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
      setIsStepValid(true);
    }
  };

  const handleSave = () => {
    const success = saveFormData({ currentStep, formData });
    setSnackbar({
      open: true,
      message: success ? t('app.saveSuccess') : t('app.error'),
      severity: success ? 'success' : 'error'
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submission data:', formData);
      
      const { clearFormData } = await import('../utils/storage');
      clearFormData();
      
      setSnackbar({
        open: true,
        message: t('app.submitSuccess'),
        severity: 'success'
      });
      
      setTimeout(() => {
        dispatch(resetForm());
        setIsStepValid(false);
      }, 2000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setSnackbar({
        open: true,
        message: t('app.error'),
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return {
    t,
    currentStep,
    totalSteps,
    isStepValid,
    isSubmitting,
    snackbar,
    handleValidationChange,
    handleNext,
    handleBack,
    handleSave,
    handleCloseSnackbar,
  };
};