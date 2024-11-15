export interface BusinessStatsProps {
  icon: JSX.Element;
  title: string;
  value: number;
}

export interface BusinessModalProp {
  close: () => void;
  closeState?: boolean
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
  rate: string;
  commission: string;
  facultative_offer: string;
  sum_insured: string;
  premium: string;
}

export interface CurrencyProps {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}

export interface BusinessProps {
  id: number;
  business_name: string;
  business_details: string;
}

export interface BusinessDetailProps {
  keydetail: string;
  value?: string;
}

export interface OfferResponse {
  data: Data;
}

export interface Data {
  data: {
    current_page: number;
    data: Offer[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: any;
    path: string;
    per_page: number;
    prev_page_url: any;
    to: number;
    total: number;
  };
}

export interface SingleOfferResponse {
  data: {
    data: Offer
  }
}

export interface Offer {
  id: number;
  class_of_businessesclass_of_business_id: number;
  insurer_associateinsurer_associate_id: number;
  insurersinsurer_id: number;
  export_id: any;
  rate: number;
  commission: number;
  commission_amount: number;
  facultative_offer: number;
  sum_insured: number;
  fac_sum_insured: number;
  closed_date: any;
  premium: number;
  fac_premium: number;
  offer_status: string;
  claim_status: string;
  payment_status: string;
  transaction_status: string;
  points_earned: number;
  deleted_at: any;
  created_at: string;
  updated_at: string;
  offer_detail: OfferDetail;
  insurer: Insurer;
  class_of_business: ClassOfBusiness;
}

export interface Insurer {
  id: number;
  insurer_company_name: string;
}

export interface ClassOfBusiness {
  id: number;
  business_name: string;
  business_details: string;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface OfferDetail {
  id: number;
  policy_number: string;
  insured_by: string;
  currency: string;
  offer_comment: string;
  period_of_insurance_from: string;
  period_of_insurance_to: string;
  offer_details: string;
}

export interface OfferStatsRootProps {
  data: OfferStatsProps;
}

export interface OfferStatsProps {
  data: {
    total_offers: number;
    total_open_offers: number;
    total_pending_offers: number;
    total_closed_offers: number;
    total_unpaid_offers: number;
    total_paid_or_partpayment_offers: number;
  };
}

export interface DropdownButtonProps {
  show_placing?: () => void
  show_notes?: () => void
}
