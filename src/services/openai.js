const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const getApiKey = () => import.meta.env.VITE_OPENAI_API_KEY;

const getPrompts = (fieldType, currentValue = '') => {
  const prompts = {
    financialSituation: `I need help describing my current financial situation for a social support application. ${currentValue ? `Current text: "${currentValue}". Please improve or expand on this.` : 'I am facing financial difficulties and need assistance. Help me write a clear, professional description of my financial situation.'}`,
    employmentCircumstances: `I need help describing my employment circumstances for a social support application. ${currentValue ? `Current text: "${currentValue}". Please improve or expand on this.` : 'I am having employment challenges and need to describe them professionally. Help me write about my current employment situation.'}`,
    reasonForApplying: `I need help explaining why I am applying for social support assistance. ${currentValue ? `Current text: "${currentValue}". Please improve or expand on this.` : 'I need financial assistance and want to clearly explain my reasons. Help me write a compelling but honest reason for applying.'}`
  };
  return prompts[fieldType] || prompts.financialSituation;
};

const handleApiError = (error) => {
  console.error('OpenAI API Error:', error);
  
  if (error.message.includes('429')) {
    throw new Error('OpenAI API rate limit exceeded. Please try again in a few minutes or check your billing status.');
  } else if (error.message.includes('401')) {
    throw new Error('OpenAI API key is invalid. Please check your API key.');
  } else if (error.message.includes('402')) {
    throw new Error('OpenAI API quota exceeded. Please add credits to your account.');
  } else {
    throw new Error('Failed to generate AI suggestion. Please try again.');
  }
};

const generateSuggestion = async (fieldType, currentValue = '') => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const promptContent = getPrompts(fieldType, currentValue);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that helps people write professional, honest, and clear descriptions for social support applications. Keep responses concise (2-3 sentences), empathetic, and appropriate for government forms.'
          },
          {
            role: 'user',
            content: promptContent
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    handleApiError(error);
  }
};

const openAIService = {
  generateSuggestion
};

export default openAIService;