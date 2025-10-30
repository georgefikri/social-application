import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { ArrowBack, ArrowForward, Save, Send } from '@mui/icons-material';

const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onBack, 
  onSave, 
  isValid = true,
  isLoading = false 
}) => {
  const { t } = useTranslation();
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
      <div className="flex gap-2">
        {!isFirstStep && (
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={onBack}
            disabled={isLoading}
            className="min-w-[120px]"
            size="large"
          >
            {t('navigation.back')}
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outlined"
          startIcon={<Save />}
          onClick={onSave}
          disabled={isLoading}
          className="min-w-[140px]"
          size="large"
        >
          {t('navigation.save')}
        </Button>
        
        {isLastStep ? (
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={onNext}
            disabled={!isValid || isLoading}
            className="min-w-[140px] bg-blue-600 hover:bg-blue-700"
            size="large"
          >
            {t('navigation.submit')}
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={onNext}
            disabled={!isValid || isLoading}
            className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
            size="large"
          >
            {t('navigation.next')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;