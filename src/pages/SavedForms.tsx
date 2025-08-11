import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

interface Form {
  name: string;
  fields: Field[];
  createdAt: string;
}

export default function SavedForms() {
  const navigate = useNavigate();
  const [savedForms, setSavedForms] = useState<Form[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('savedForms');
    if (stored) {
      setSavedForms(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (index: number) => {
    if (!window.confirm('Are you sure you want to delete this form?')) return;
    const updatedForms = savedForms.filter((_, i) => i !== index);
    setSavedForms(updatedForms);
    localStorage.setItem('savedForms', JSON.stringify(updatedForms));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Forms</h2>
      {savedForms.length === 0 ? (
        <p>No forms saved yet.</p>
      ) : (
        savedForms.map((form, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: 10,
              marginBottom: 10,
              borderRadius: 4,
            }}
          >
            <h3>{form.name || 'Untitled Form'}</h3>
            <p>
              <strong>Created:</strong>{' '}
              {new Date(form.createdAt).toLocaleString()}
            </p>
            <Button
              variant="outlined"
              onClick={() => navigate(`/myforms/${index}`)} // changed route
              sx={{ mr: 1 }}
            >
              Preview
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(index)}
            >
              Delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
