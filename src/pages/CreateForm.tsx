import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { addField, updateField, removeField, saveForm } from '../store/formSlice';
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select' },
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
];

export default function CreateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fields = useSelector((state: RootState) => state.forms.currentForm?.fields || []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [formName, setFormName] = useState('');

  const handleAddField = () => {
    dispatch(addField({ type: 'text', label: '', required: false }));
  };

  const handleFieldChange = (index: number, key: string, value: any) => {
    dispatch(updateField({ index, key, value }));
  };

  const handleRemoveField = (index: number) => {
    dispatch(removeField(index));
  };

  const handleSaveForm = () => {
    setDialogOpen(true);
  };

  const confirmSaveForm = () => {
    dispatch(saveForm(formName));
    setDialogOpen(false);
    setFormName('');
    setSuccessOpen(true); // Show success dialog
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Form</h2>
      <Button variant="contained" onClick={handleAddField} sx={{ mb: 2 }}>
        Add Field
      </Button>

      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc' }}>
          <TextField
            label="Label"
            value={field.label}
            onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            select
            label="Type"
            value={field.type}
            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
            sx={{ mr: 2 }}
          >
            {fieldTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={field.required || false}
                onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
              />
            }
            label="Required"
          />
          <Button variant="outlined" color="error" onClick={() => handleRemoveField(index)}>
            Remove
          </Button>
        </div>
      ))}

      {fields.length > 0 && (
        <Button variant="contained" color="success" onClick={handleSaveForm}>
          Save Form
        </Button>
      )}

      {/* Save Form Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Form Name"
            fullWidth
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmSaveForm}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>✅ Form Saved Successfully!</DialogTitle>
        <DialogContent>
          <Typography>Your form has been saved. You can preview it now.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setSuccessOpen(false);
              navigate('/preview');
            }}
          >
            See Preview
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
