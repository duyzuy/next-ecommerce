export interface PaymentGatewayType {
  id: string;
  title: string;
  description: string;
  order: number;
  enabled: boolean;
  method_title: string;
  method_description: string;
  method_supports: [];
  settings: PaymentGatewaySettingType;
}

export interface PaymentGatewaySettingType {
  id: string;
  label: string;
  description: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'color'
    | 'password'
    | 'textarea'
    | 'select'
    | 'multiselect'
    | 'radio'
    | 'image_width'
    | 'checkbox';
  value: string;
  default: string;
  tip: string;
  placeholder: string;
}
