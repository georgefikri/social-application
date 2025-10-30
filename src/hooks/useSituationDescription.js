import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateSituationData } from '../store/formSlice';

export const useSituationDescription = (onValidationChange) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const situationData = useSelector((state) => state.form.formData.situation);

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState('');

  const {
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: situationData,
    mode: 'onChange',
  });

  const watchedValues = watch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(updateSituationData(watchedValues));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [watchedValues, dispatch]);

  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const handleAIAssist = (fieldName) => {
    setCurrentField(fieldName);
    setAiModalOpen(true);
  };

  const handleAISuggestionAccept = (suggestion) => {
    setValue(currentField, suggestion, { shouldValidate: true, shouldDirty: true });
    setAiModalOpen(false);
  };

  const fields = [
    {
      name: 'financialSituation',
      label: t('situation.financialSituation'),
      rows: 5,
    },
    {
      name: 'employmentCircumstances',
      label: t('situation.employmentCircumstances'),
      rows: 5,
    },
    {
      name: 'reasonForApplying',
      label: t('situation.reasonForApplying'),
      rows: 5,
    },
  ];

  return {
    t,
    control,
    errors,
    fields,
    aiModalOpen,
    currentField,
    watchedValues,
    handleAIAssist,
    handleAISuggestionAccept,
    setAiModalOpen,
  };
};
