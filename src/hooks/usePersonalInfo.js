import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonalData } from '../store/formSlice';

export const usePersonalInfo = (onValidationChange) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const personalData = useSelector((state) => state.form.formData.personal);

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: personalData,
    mode: 'onChange',
  });

  const watchedValues = watch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(updatePersonalData(watchedValues));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [watchedValues, dispatch]);

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || t('validation.email');
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\+?[1-9]\d{0,15}$/;
    return phoneRegex.test(value.replace(/\s/g, '')) || t('validation.phone');
  };

  return {
    t,
    control,
    errors,
    validateEmail,
    validatePhone,
  };
};
