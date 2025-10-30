import React from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Typography,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import { AttachMoney, People, Work, Home } from '@mui/icons-material';
import { useFinancialInfo } from '../hooks/useFinancialInfo';

const FinancialInfo = ({ onValidationChange }) => {
  const { t, control, errors } = useFinancialInfo(onValidationChange);

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardContent className="p-8">
        <Typography
          variant="h4"
          component="h2"
          className="!mb-12 font-semibold text-gray-800 text-center"
        >
          {t('financial.title')}
        </Typography>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Row 1: Marital Status, Dependents, Employment Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="maritalStatus"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.maritalStatus}
                  variant="outlined"
                  sx={{ minWidth: 200 }}
                >
                  <InputLabel>{t('financial.maritalStatus')}</InputLabel>
                  <Select
                    {...field}
                    label={t('financial.maritalStatus')}
                    startAdornment={
                      <InputAdornment position="start">
                        <People />
                      </InputAdornment>
                    }
                    aria-required="true"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          minWidth: 200,
                        },
                      },
                    }}
                  >
                    <MenuItem value="single">
                      {t('financial.maritalOptions.single')}
                    </MenuItem>
                    <MenuItem value="married">
                      {t('financial.maritalOptions.married')}
                    </MenuItem>
                    <MenuItem value="divorced">
                      {t('financial.maritalOptions.divorced')}
                    </MenuItem>
                    <MenuItem value="widowed">
                      {t('financial.maritalOptions.widowed')}
                    </MenuItem>
                  </Select>
                  {errors.maritalStatus && (
                    <FormHelperText>{errors.maritalStatus.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="dependents"
              control={control}
              rules={{
                required: t('validation.required'),
                min: { value: 0, message: 'Must be 0 or greater' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('financial.dependents')}
                  type="number"
                  error={!!errors.dependents}
                  helperText={errors.dependents?.message}
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 0, max: 20 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <People />
                      </InputAdornment>
                    ),
                  }}
                  aria-required="true"
                  sx={{ minWidth: 200 }}
                />
              )}
            />

            <Controller
              name="employmentStatus"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.employmentStatus}
                  variant="outlined"
                  sx={{ minWidth: 200 }}
                >
                  <InputLabel>{t('financial.employmentStatus')}</InputLabel>
                  <Select
                    {...field}
                    label={t('financial.employmentStatus')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Work />
                      </InputAdornment>
                    }
                    aria-required="true"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          minWidth: 200,
                        },
                      },
                    }}
                  >
                    <MenuItem value="employed">
                      {t('financial.employmentOptions.employed')}
                    </MenuItem>
                    <MenuItem value="unemployed">
                      {t('financial.employmentOptions.unemployed')}
                    </MenuItem>
                    <MenuItem value="selfEmployed">
                      {t('financial.employmentOptions.selfEmployed')}
                    </MenuItem>
                    <MenuItem value="retired">
                      {t('financial.employmentOptions.retired')}
                    </MenuItem>
                    <MenuItem value="student">
                      {t('financial.employmentOptions.student')}
                    </MenuItem>
                  </Select>
                  {errors.employmentStatus && (
                    <FormHelperText>{errors.employmentStatus.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>

          {/* Row 2: Monthly Income, Housing Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="monthlyIncome"
              control={control}
              rules={{
                required: t('validation.required'),
                min: { value: 0, message: 'Must be 0 or greater' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('financial.monthlyIncome')}
                  type="number"
                  error={!!errors.monthlyIncome}
                  helperText={errors.monthlyIncome?.message}
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 0, step: 100 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney />
                      </InputAdornment>
                    ),
                  }}
                  aria-required="true"
                  sx={{ minWidth: 200 }}
                />
              )}
            />

            <Controller
              name="housingStatus"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.housingStatus}
                  variant="outlined"
                  sx={{ minWidth: 200 }}
                >
                  <InputLabel>{t('financial.housingStatus')}</InputLabel>
                  <Select
                    {...field}
                    label={t('financial.housingStatus')}
                    startAdornment={
                      <InputAdornment position="start">
                        <Home />
                      </InputAdornment>
                    }
                    aria-required="true"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          minWidth: 200,
                        },
                      },
                    }}
                  >
                    <MenuItem value="owned">
                      {t('financial.housingOptions.owned')}
                    </MenuItem>
                    <MenuItem value="rented">
                      {t('financial.housingOptions.rented')}
                    </MenuItem>
                    <MenuItem value="shared">
                      {t('financial.housingOptions.shared')}
                    </MenuItem>
                    <MenuItem value="homeless">
                      {t('financial.housingOptions.homeless')}
                    </MenuItem>
                  </Select>
                  {errors.housingStatus && (
                    <FormHelperText>{errors.housingStatus.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialInfo;
