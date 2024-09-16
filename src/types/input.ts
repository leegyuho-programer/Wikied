import { ChangeEvent, FocusEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface GetUserLinks {
  linkId: number;
  title: string;
  url: string;
}

// export interface InputProps {
//   label?: string;
//   id: string;
//   type?: 'text' | 'nickname' | 'file';
//   placeholder?: string;
//   error?: any;
//   register?: UseFormRegisterReturn;
//   style?: string;
//   accept?: string;
//   readOnly?: boolean;
//   onImageUpload?: (url: string) => void;
//   userId?: number;
//   defaultValue?: string;
//   value?: string;
//   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
//   onBlur?: FocusEventHandler<HTMLInputElement>;
// }
