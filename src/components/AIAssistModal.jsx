import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Box,
  IconButton,
} from '@mui/material';
import { Close, AutoAwesome } from '@mui/icons-material';

const AIAssistModal = ({ open, onClose, onAccept, fieldType, currentValue }) => {
  const { t } = useTranslation();
  const [suggestion, setSuggestion] = useState('');
  const [editedSuggestion, setEditedSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateSuggestion = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { default: openAIService } = await import('../services/openai');
      const result = await openAIService.generateSuggestion(fieldType, currentValue);
      setSuggestion(result);
      setEditedSuggestion(result);
      setHasGenerated(true);
    } catch (err) {
      setError(t('situation.error'));
      console.error('AI suggestion error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    onAccept(editedSuggestion);
    handleClose();
  };

  const handleClose = () => {
    setSuggestion('');
    setEditedSuggestion('');
    setHasGenerated(false);
    setError('');
    onClose();
  };

  useEffect(() => {
    if (open && !hasGenerated) {
      generateSuggestion();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="ai-assist-title"
    >
      <DialogTitle id="ai-assist-title" className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AutoAwesome className="text-blue-600" />
          {t('situation.aiSuggestion')}
        </div>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isLoading && (
          <Box className="flex flex-col items-center justify-center py-8 gap-4">
            <CircularProgress />
            <p className="text-gray-600">{t('situation.generating')}</p>
          </Box>
        )}

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {suggestion && !isLoading && (
          <div className="space-y-4">
            <TextField
              multiline
              rows={6}
              fullWidth
              variant="outlined"
              value={editedSuggestion}
              onChange={(e) => setEditedSuggestion(e.target.value)}
              label={t('situation.aiSuggestion')}
              placeholder="AI generated suggestion will appear here..."
              className="mb-4"
            />
          </div>
        )}
      </DialogContent>

      <DialogActions className="p-4">
        <Button onClick={handleClose} disabled={isLoading}>
          {t('situation.discard')}
        </Button>
        {suggestion && !isLoading && (
          <Button
            onClick={handleAccept}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!editedSuggestion.trim()}
          >
            {t('situation.accept')}
          </Button>
        )}
        {error && (
          <Button onClick={generateSuggestion} variant="outlined" disabled={isLoading}>
            Try Again
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AIAssistModal;
