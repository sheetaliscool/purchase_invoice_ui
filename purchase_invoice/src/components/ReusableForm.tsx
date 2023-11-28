import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

type Field = {
  name: string;
  label: string;
  placeholder: string;
};

type FormProps = {
  defaultValues: Record<string, any>;
  fields: Field[];
  onSubmit: (data: any) => void;
  fieldArrayName?: string;
  fieldArrayFields?: Field[];
};

const GenericForm: React.FC<FormProps> = ({ defaultValues, fields, onSubmit, fieldArrayName, fieldArrayFields }) => {
  const { register, handleSubmit, control } = useForm({ defaultValues });
  const { fields: fieldArray, append, remove } = useFieldArray({ control, name: fieldArrayName || 'default' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input {...register(field.name)} placeholder={field.placeholder} />
        </div>
      ))}
      {fieldArray.map((item, index) => (
        <div key={item.id}>
          {fieldArrayFields && fieldArrayFields.map((field) => (
            <div key={field.name}>
              <label>{field.label}</label>
              <input {...register(`${fieldArrayName}[${index}].${field.name}`)} placeholder={field.placeholder} />
            </div>
          ))}
          <button type='button' onClick={() => remove(index)}>Remove this item</button>
        </div>
      ))}
      <button type='button' onClick={() => append({})}>Add new item</button>
      <button type='submit'>Save</button>
    </form>
  );
};

export default GenericForm;
