import React from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import AIAssistModal from '../components/AIAssistModal';
import { useSituationDescription } from '../hooks/useSituationDescription';

const SituationDescription = ({ onValidationChange }) => {
  const {
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
  } = useSituationDescription(onValidationChange);

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardContent className="p-8">
        <Typography variant="h4" component="h2" className="mb-8 font-semibold text-gray-800 text-center">
          {t('situation.title')}
        </Typography>
        
        <div className="max-w-6xl mx-auto space-y-8">
          {fields.map((field) => (
            <div key={field.name} className="w-full">
              <Box className="space-y-4 p-6 border-l-4 border-blue-500 bg-gray-50 rounded-r-lg">
                <div className="flex items-center justify-between">
                  <Typography variant="h6" className="text-lg font-medium text-gray-800">
                    {field.label}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<AutoAwesome />}
                    onClick={() => handleAIAssist(field.name)}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    {t('situation.helpMeWrite')}
                  </Button>
                </div>
                
                <Controller
                  name={field.name}
                  control={control}
                  rules={{ required: t('validation.required') }}
                  render={({ field: formField }) => (
                    <TextField
                      {...formField}
                      fullWidth
                      multiline
                      rows={field.rows}
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message}
                      variant="outlined"
                      placeholder={`Describe your ${field.label.toLowerCase()}...`}
                      aria-required="true"
                      sx={{ minWidth: 300 }}
                    />
                  )}
                />
              </Box>
            </div>
          ))}
        </div>
        
        <AIAssistModal
          open={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          onAccept={handleAISuggestionAccept}
          fieldType={currentField}
          currentValue={watchedValues[currentField]}
        />
      </CardContent>
    </Card>
  );
};

export default SituationDescription;