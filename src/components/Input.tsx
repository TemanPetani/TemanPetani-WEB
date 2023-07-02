import React, { FC, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

interface FormikProps {
  id: string;
  label?: string;
  name?: string;
  value?: string | number;
  defaultVal?: string | number;
  error?: string | boolean | undefined;
  touch?: string | boolean | undefined;
  disabled?: boolean | undefined;
}

interface InputProps extends FormikProps {
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

interface TextAreaProps extends FormikProps {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
}
interface SelectProps extends FormikProps {
  onChangeSelect?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
}

export const Input: FC<InputProps> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  onChange,
  onBlur,
  touch,
  disabled,
}) => {
  return (
    <div className="h-16 w-full">
      <input
        className={`input w-full input-bordered bg-base-100  ${
          error && touch ? 'input-error' : ''
        }`}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
        disabled={disabled}
      />

      {error && touch && (
        <span className="text-sm text-error label-text-alt ">{error}</span>
      )}
    </div>
  );
};

export const InputFile: FC<InputProps> = ({
  id,
  label,
  name,

  value,
  error,
  onChange,
  onBlur,
  touch,
}) => {
  return (
    <div className="h-16 w-full">
      <input
        className={`file-input file-input-bordered w-full bg-base-100 ${
          error && touch ? ' file-input-error' : ''
        }`}
        id={id}
        type="file"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
      />

      {error && touch && (
        <span className="text-sm text-error label-text-alt">{error}</span>
      )}
    </div>
  );
};

export const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  touch,
  disabled,
}) => {
  return (
    <div className="h-[90px] w-full">
      <textarea
        className={`textarea textarea-bordered w-full bg-base-100  ${
          error && touch ? 'textarea-error' : ''
        }`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        onBlur={onBlur}
        disabled={disabled}
      />
      <p>
        {error && touch && <span className="text-sm text-error">{error}</span>}
      </p>
    </div>
  );
};

export const Select: FC<SelectProps> = ({
  id,
  label,
  name,
  value,
  error,
  onChangeSelect,
  onBlur,
  touch,
  children,
}) => {
  return (
    <div>
      <div className="h-16 w-full">
        <select
          className={`select select-bordered w-full bg-base-100 ${
            error && touch ? 'select-error' : ''
          }`}
          id={id}
          name={name}
          value={value}
          onChange={onChangeSelect}
          onBlur={onBlur}
        >
          <option value={""}>{label}</option>
          {children}
        </select>
        <p>
          {error && touch && (
            <span className="text-sm text-error">{error}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export const InputPass: FC<InputProps> = ({
  id,
  label,
  name,
  type,
  value,
  error,
  onChange,
  onBlur,
  touch,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-16 w-full ">
      <div className="w-full h-min relative">
        <input
          className={`input input-bordered w-full bg-base-100 ${
            error && touch ? 'input-error' : ''
          }`}
          id={id}
          type={showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          onBlur={onBlur}
          disabled={disabled}
        />

        {type === 'password' && (
          <button
            type="button"
            id="button-type-password"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => handleTogglePassword()}
          >
            {showPassword ? (
              <div>
                <FaEyeSlash className="h-5 w-5 text-neutral/30" />
              </div>
            ) : (
              <FaEye className="h-5 w-5 text-neutral/30" />
            )}
          </button>
        )}
      </div>

      {error && touch && (
        <span className="text-sm text-error label-text-alt">{error}</span>
      )}
    </div>
  );
};
