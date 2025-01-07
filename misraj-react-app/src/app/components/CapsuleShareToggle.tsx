import { useState } from 'react';
import { ToggleButton, Tooltip } from '@mui/material';
import { Check, Clear } from '@mui/icons-material';
import { useSnackbar } from './ctx/SnackbarContext';
import { useUpdateShareable } from '../hooks/useCapsules';

type Props = {
  capsuleId: string;
  initialShareable: boolean;
};

const CapsuleShareToggle = ({ capsuleId, initialShareable }: Props) => {
  const { mutate: updateShareable, isPending } = useUpdateShareable();
  const { showSnackbar } = useSnackbar();
  const [isSelected, setIsSelected] = useState(initialShareable);

  const handleToggle = async () => {
    const newShareableStatus = !isSelected;
    setIsSelected(newShareableStatus);

    try {
      updateShareable({ capsuleId, shareAble: newShareableStatus });

      if (newShareableStatus) {
        const shareableUrl = `http://localhost:4200/capsule/${capsuleId}`;

        const copyLink = (
          <span
            style={{
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigator.clipboard
                .writeText(shareableUrl)
                .then(() => {
                  showSnackbar('URL copied to clipboard!', 'success');
                })
                .catch(() => {
                  showSnackbar('Failed to copy URL', 'error');
                });
            }}
          >
            {shareableUrl}
          </span>
        );

        showSnackbar(
          <p>Use this link to share or view: {copyLink}</p>,
          'success'
        );
      } else {
        showSnackbar('Capsule sharing denied', 'success');
      }
    } catch (error: any) {
      showSnackbar(error.message || 'Failed to update sharing status', 'error');
      setIsSelected((prevSelected) => !prevSelected);
    }
  };

  return (
    <Tooltip title={isSelected ? 'Deselect' : 'Select'} arrow>
      <ToggleButton
        value="check"
        selected={isSelected}
        onClick={handleToggle}
        disabled={isPending}
        sx={{
          padding: 1,
          backgroundColor: isSelected ? '#4CAF50' : '#f44336',
          '&:hover': {
            backgroundColor: isSelected ? '#388E3C' : '#D32F2F',
          },
        }}
      >
        {isSelected ? (
          <Check sx={{ color: '#fff' }} />
        ) : (
          <Clear sx={{ color: '#fff' }} />
        )}
      </ToggleButton>
    </Tooltip>
  );
};

export default CapsuleShareToggle;
