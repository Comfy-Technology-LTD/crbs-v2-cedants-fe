export interface BusinessStatsProps {
  icon: JSX.Element;
  title: string;
  value: number;
}

export interface BusinessModalProp {
  close: () => void;
}

export interface RegisterProps {
  insurersinsurer_id: string;
  assoc_first_name: string;
  assoc_last_name: string;
  assoc_primary_phonenumber: string;
  assoc_email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface User {
  id: number;
  assoc_first_name: string;
  assoc_last_name: string;
  assoc_email: string;
  position: string;
  name: string;
}

export interface CedantProps {
  id: number;
  insurer_company_name: string;
}

export interface LoadingProps {
  title: string;
}

export interface OfferProps {
  class_of_businessesclass_of_business_id: string;
  policy_number: string;
  insured_by: string;
  period_of_insurance_from: string;
  period_of_insurance_to: string;
  currency: string;
  offer_comment: string;
  offer_details: string;
  rate: number;
  commission: number;
  facultative_offer: number;
  sum_insured: number;
  premium: number;
}

export interface CurrencyProps {
  symbol:         string;
  name:           string;
  symbol_native:  string;
  decimal_digits: number;
  rounding:       number;
  code:           string;
  name_plural:    string;
}

export interface BusinessProps {
  id: number,
  business_name: string
  business_details: string 
}