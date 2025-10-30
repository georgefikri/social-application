import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0,
  formData: {
    personal: {
      name: '',
      nationalId: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      email: ''
    },
    financial: {
      maritalStatus: '',
      dependents: '',
      employmentStatus: '',
      monthlyIncome: '',
      housingStatus: ''
    },
    situation: {
      financialSituation: '',
      employmentCircumstances: '',
      reasonForApplying: ''
    }
  },
  isSubmitted: false,
  lastSaved: null
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updatePersonalData: (state, action) => {
      state.formData.personal = { ...state.formData.personal, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },
    updateFinancialData: (state, action) => {
      state.formData.financial = { ...state.formData.financial, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },
    updateSituationData: (state, action) => {
      state.formData.situation = { ...state.formData.situation, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },
    submitForm: (state) => {
      state.isSubmitted = true;
    },
    resetForm: (state) => {
      return initialState;
    },
    loadSavedData: (state, action) => {
      const savedData = action.payload;
      if (savedData) {
        state.formData = savedData.formData || state.formData;
        state.currentStep = savedData.currentStep || 0;
        state.lastSaved = savedData.lastSaved || null;
      }
    }
  }
});

export const {
  setCurrentStep,
  updatePersonalData,
  updateFinancialData,
  updateSituationData,
  submitForm,
  resetForm,
  loadSavedData
} = formSlice.actions;

export default formSlice.reducer;