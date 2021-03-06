import { Box, IconButton, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Prompt from './Prompt';

interface PromptsPanelProps {
  prompts: string[] | undefined;
  handleUpdate: (prompts: string[]) => void;
}

interface promptComp {
  id: number;
  prompt: string;
}

const PromptsPanel: FC<PromptsPanelProps> = ({ prompts, handleUpdate }) => {
  const { t } = useTranslation(['intents']);
  const [_prompts, set_prompts] = useState<promptComp[]>([]);

  useEffect(() => {
    if (!prompts) return set_prompts([]);
    const updatedPrompts: promptComp[] = prompts.map((prompt, i) => ({
      id: i,
      prompt,
    }));
    set_prompts(updatedPrompts);
    return () => {};
  }, [prompts]);

  const addEmpty = () => {
    const empty: promptComp = {
      id: _prompts.length,
      prompt: '',
    };
    set_prompts([..._prompts, empty]);
  };

  const handleUpdatePrompt = (id: number, newValue: string) => {
    const updatedPrompts = _prompts.map((param) => {
      if (param.id === id) param.prompt = newValue;
      return param;
    });
    set_prompts(updatedPrompts);
    updatePrompts(updatedPrompts);
  };

  const handleRemovePrompt = (id: number) => {
    const updatedPrompts = _prompts.filter((param) => param.id !== id);
    set_prompts(updatedPrompts);
    updatePrompts(updatedPrompts);
  };

  const updatePrompts = (updatedPrompts: promptComp[]) => {
    handleUpdate(updatedPrompts.map(({ prompt }) => prompt));
  };

  return (
    <Box p={2}>
      <Box display="flex" flexDirection="row">
        <Typography>{t('Prompts')}</Typography>
        <IconButton aria-label="add prompt" onClick={addEmpty} size="small">
          <AddCircleOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box>
        {_prompts.map(({ id, prompt }) => (
          <Prompt
            key={id}
            id={id}
            handleRemove={handleRemovePrompt}
            handleUpdate={handleUpdatePrompt}
            prompt={prompt}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PromptsPanel;
