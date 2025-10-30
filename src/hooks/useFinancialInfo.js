import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateFinancialData } from '../store/formSlice';

export const useFinancialInfo = (onValidationChange) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const financialData = useSelector((state) => state.form.formData.financial);

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: financialData,
    mode: 'onChange',
  });

  const watchedValues = watch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(updateFinancialData(watchedValues));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [watchedValues, dispatch]);

  React.useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  return {
    t,
    control,
    errors,
  };
};
