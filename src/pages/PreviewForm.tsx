import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from "@mui/material";

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

export default function PreviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentForm = useSelector((state: RootState) => state.forms.currentForm);
  const [formToPreview, setFormToPreview] = useState<Form | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    const savedForms: Form[] = JSON.parse(localStorage.getItem("savedForms") || "[]");

    if (id !== undefined && savedForms[Number(id)]) {
      setFormToPreview(savedForms[Number(id)]);
    } else if (currentForm && currentForm.fields.length > 0) {
      setFormToPreview(currentForm);
    } else if (savedForms.length > 0) {
      setFormToPreview(savedForms[savedForms.length - 1]);
    }
  }, [id, currentForm]);

  if (!formToPreview) {
    return <p style={{ padding: 20 }}>No form to preview.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save submitted form data
    const savedForms: Form[] = JSON.parse(localStorage.getItem("savedForms") || "[]");
    savedForms.push(formToPreview);
    localStorage.setItem("savedForms", JSON.stringify(savedForms));

    // Show success dialog
    setSuccessOpen(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Preview: {formToPreview.name || "Untitled Form"}</h2>
      <form onSubmit={handleSubmit}>
        {formToPreview.fields.map((field, index) => {
          switch (field.type) {
            case "text":
            case "number":
            case "date":
              return (
                <div key={field.id} style={{ marginBottom: 16 }}>
                  <TextField
                    label={field.label || `Field ${index + 1}`}
                    type={field.type}
                    fullWidth
                    required={field.required}
                    defaultValue={field.defaultValue}
                  />
                </div>
              );

            case "textarea":
              return (
                <div key={field.id} style={{ marginBottom: 16 }}>
                  <TextField
                    label={field.label || `Field ${index + 1}`}
                    multiline
                    rows={4}
                    fullWidth
                    required={field.required}
                    defaultValue={field.defaultValue}
                  />
                </div>
              );

            case "checkbox":
              return (
                <div key={field.id} style={{ marginBottom: 16 }}>
                  <FormControlLabel
                    control={<Checkbox required={field.required} />}
                    label={field.label || `Field ${index + 1}`}
                  />
                </div>
              );

            default:
              return (
                <div key={field.id} style={{ marginBottom: 16 }}>
                  <TextField
                    label={field.label || `Field ${index + 1}`}
                    fullWidth
                    required={field.required}
                    defaultValue={field.defaultValue}
                  />
                </div>
              );
          }
        })}

        <Button type="submit" variant="contained" color="primary">
          Submit and Save
        </Button>
      </form>

      {/* Success Dialog */}
      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>✅ Form Submitted Successfully!</DialogTitle>
        <DialogContent>
          <Typography>Your form has been submitted and saved.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setSuccessOpen(false);
              navigate("/myforms"); // Change to your saved forms route
            }}
          >
            See Saved Forms
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
