export interface BusinessStatsProps {
  icon: JSX.Element;
  title: string;
  value: number;
}

export interface BusinessModalProp {
  close: () => void;
  closeState?: boolean;
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
  insurer_company_name: string;
  insurer?: {
    insurer_company_name: string;
  };
}

type EmployeeProps = Pick<User, "assoc_first_name" | "assoc_last_name">;

export interface CedantProps {
  id: number;
  insurer_company_name: string;
}

export interface LoadingProps {
  title: string;
}

export interface OfferProps {
  brokersbroker_id: string;
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
  keydetail?: string;
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
    data: Offer;
  };
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
  insurer_associate?: EmployeeProps;
  reviews: string;
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
  show_placing?: () => void;
  show_notes?: () => void;
}

export interface ErrorResponse {
  errors: Record<string, string[]>; // Adjust based on the actual structure of errors
}

export type ErrorBag = Record<string, string[]>;

export interface OfferMessageContentProps {
  uuid: string;
  state: "EXTERNAL" | "INTERNAL";
  timestamp: string;
  message: string;
  sender_name: string;
}

export interface OfferMessageProps {
  id: number;
  message_content: OfferMessageContentProps[];
}

export interface UnderWriterPointProps {
  total_points_earned: number;
  badge_earned: string;
}

export interface VoucherProps {
  points_earned: number;
  badge_earned: string;
  voucher_code?: string;
}

export interface VoucherModalProps {
  close: () => void;
}

export interface ClaimPointProps {
  claim_date: string;
  claim_prize?: string;
  claim_voucher: string;
  claimed_points: number;
  badge_earned: string;
  id: number;
}

export interface ClaimPointDataProps {
  current_page: number;
  last_page: number;
  total: number;
  data: ClaimPointProps[];
}

export type TransactionStateProps = {
  initiated: JSX.Element;
  approved: JSX.Element;
  rejected: JSX.Element;
  modify: JSX.Element;
};

export type ReviewProps = {
  reviewer: string;
  message: string;
  timestamp: string;
  position: string;
};
