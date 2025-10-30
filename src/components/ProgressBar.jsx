import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Circle } from '@mui/icons-material';
import { getFormSteps, TOTAL_STEPS } from '../constants/formSteps';

const ProgressBar = ({ currentStep, totalSteps = TOTAL_STEPS }) => {
  const { t } = useTranslation();
  
  const steps = getFormSteps(t);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {t('app.progress')}
        </h2>
        <span className="text-sm text-gray-600">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2">
                {index < currentStep ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : index === currentStep ? (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                ) : (
                  <Circle className="w-8 h-8 text-gray-300" />
                )}
              </div>
              <span className={`text-xs text-center max-w-20 ${
                index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 rounded ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;