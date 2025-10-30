import React from 'react';
import { Container, Paper, Alert, Snackbar } from '@mui/material';
import ProgressBar from '../components/ProgressBar';
import FormNavigation from '../components/FormNavigation';
import LanguageSwitch from '../components/LanguageSwitch';
import PersonalInfo from './PersonalInfo';
import FinancialInfo from './FinancialInfo';
import SituationDescription from './SituationDescription';
import { useFormWizard } from '../hooks/useFormWizard';

const FormWizard = () => {
  const {
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
  } = useFormWizard();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfo onValidationChange={handleValidationChange} />;
      case 1:
        return <FinancialInfo onValidationChange={handleValidationChange} />;
      case 2:
        return <SituationDescription onValidationChange={handleValidationChange} />;
      default:
        return <PersonalInfo onValidationChange={handleValidationChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container maxWidth="xl" className="py-6">
        <Paper elevation={0} className="!bg-transparent">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('app.title')}</h1>
              <p className="text-lg text-gray-600">{t('app.subtitle')}</p>
            </div>
            <LanguageSwitch />
          </div>

          <div className="mb-10">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          <div className="mb-10">{renderStep()}</div>

          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onBack={handleBack}
            onSave={handleSave}
            isValid={isStepValid}
            isLoading={isSubmitting}
          />

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Paper>
      </Container>
    </div>
  );
};

export default FormWizard;
