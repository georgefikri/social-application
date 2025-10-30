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
  IconButton,
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { usePersonalInfo } from '../hooks/usePersonalInfo';

const PersonalInfo = ({ onValidationChange }) => {
  const { t, control, errors, validateEmail, validatePhone } = usePersonalInfo(onValidationChange);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const getTextFieldStyles = () => ({
    '& .MuiInputBase-input': {
      textAlign: isRTL ? 'right' : 'left',
      paddingRight: isRTL ? '14px' : '12px',
      paddingLeft: isRTL ? '12px' : '14px',
    },
    '& .MuiInputLabel-root': {
      transformOrigin: isRTL ? 'top right' : 'top left',
      left: isRTL ? 'auto' : '0',
      right: isRTL ? '14px' : 'auto',
    },
    '& .MuiInputLabel-shrink': {
      transform: isRTL 
        ? 'translate(-14px, -9px) scale(0.75)' 
        : 'translate(14px, -9px) scale(0.75)',
    },
    '& .MuiOutlinedInput-root': {
      '& .MuiInputBase-input': {
        paddingRight: isRTL ? '14px' : '12px',
        paddingLeft: isRTL ? '12px' : '14px',
      },
    },
  });

  const getSelectStyles = () => ({
    '& .MuiSelect-select': {
      textAlign: isRTL ? 'right' : 'left',
      paddingRight: isRTL ? '32px' : '12px',
      paddingLeft: isRTL ? '12px' : '32px',
    },
    '& .MuiInputLabel-root': {
      transformOrigin: isRTL ? 'top right' : 'top left',
      left: isRTL ? 'auto' : '0',
      right: isRTL ? '14px' : 'auto',
    },
    '& .MuiInputLabel-shrink': {
      transform: isRTL 
        ? 'translate(-14px, -9px) scale(0.75)' 
        : 'translate(14px, -9px) scale(0.75)',
    },
    '& .MuiSelect-icon': {
      left: isRTL ? '7px' : 'auto',
      right: isRTL ? 'auto' : '7px',
    },
  });

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardContent className="p-8">
        <Typography
          variant="h4"
          component="h2"
          className="!mb-12 font-semibold text-gray-800 text-center"
        >
          {t('personal.title')}
        </Typography>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Row 1: Name, National ID, Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="name"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  variant="outlined"
                  autoComplete="name"
                  aria-required="true"
                  sx={getTextFieldStyles()}
                />
              )}
            />

            <Controller
              name="nationalId"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.nationalId')}
                  error={!!errors.nationalId}
                  helperText={errors.nationalId?.message}
                  variant="outlined"
                  autoComplete="off"
                  aria-required="true"
                  sx={getTextFieldStyles()}
                />
              )}
            />

            <Controller
              name="dateOfBirth"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.dateOfBirth')}
                  type="date"
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  variant="outlined"
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => {
                              const input = document.querySelector(`input[name="dateOfBirth"]`);
                              if (input) {
                                input.showPicker();
                              }
                            }}
                            aria-label="open calendar"
                          >
                            <CalendarToday />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={getTextFieldStyles()}
                  aria-required="true"
                />
              )}
            />
          </div>

          {/* Row 2: Gender, Address, Phone */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="gender"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={!!errors.gender}
                  variant="outlined"
                  sx={{ minWidth: 200, ...getSelectStyles() }}
                >
                  <InputLabel>{t('personal.gender')}</InputLabel>
                  <Select
                    {...field}
                    label={t('personal.gender')}
                    aria-required="true"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          minWidth: 200,
                        },
                      },
                    }}
                  >
                    <MenuItem value="male">{t('personal.genderOptions.male')}</MenuItem>
                    <MenuItem value="female">
                      {t('personal.genderOptions.female')}
                    </MenuItem>
                    <MenuItem value="other">{t('personal.genderOptions.other')}</MenuItem>
                  </Select>
                  {errors.gender && (
                    <FormHelperText>{errors.gender.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="address"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.address')}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  variant="outlined"
                  autoComplete="address-line1"
                  aria-required="true"
                  sx={getTextFieldStyles()}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              rules={{
                required: t('validation.required'),
                validate: validatePhone,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.phone')}
                  type="tel"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  variant="outlined"
                  autoComplete="tel"
                  aria-required="true"
                  sx={getTextFieldStyles()}
                />
              )}
            />
          </div>

          {/* Row 3: City, State, Country */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="city"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.city')}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  variant="outlined"
                  autoComplete="address-level2"
                  aria-required="true"
                  sx={getTextFieldStyles()}
                />
              )}
            />

            <Controller
              name="state"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.state')}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  variant="outlined"
                  autoComplete="address-level1"
                  aria-required="true"
                  sx={getTextFieldStyles()}
                />
              )}
            />

            <Controller
              name="country"
              control={control}
              rules={{ required: t('validation.required') }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.country')}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  variant="outlined"
                  autoComplete="country"
                  aria-required="true"
                  sx={getTextFieldStyles()}
                />
              )}
            />
          </div>

          {/* Row 4: Email (left-aligned) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="email"
              control={control}
              rules={{
                required: t('validation.required'),
                validate: validateEmail,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('personal.email')}
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                  autoComplete="email"
                  aria-required="true"
                  sx={getTextFieldStyles()}
                />
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
