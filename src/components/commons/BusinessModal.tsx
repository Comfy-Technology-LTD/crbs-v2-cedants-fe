import { BusinessDetailProps, BusinessModalProp, BusinessProps, CurrencyProps, ErrorBag, ErrorResponse, OfferProps } from "../../interfaces";
import { useForm, SubmitHandler } from "react-hook-form";
import { CURRENCY } from "../../constants/currency";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiInstance, { errorHandler } from "../../util";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";

const BusinessModal: React.FC<BusinessModalProp> = ({ close }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<OfferProps>()
  const [businessDetails, setBusinessDetails] = useState<BusinessDetailProps[]>()
  const [businessDetailsPopulate, setBusinessDetailsPopulate] = useState<{ keydetail: string; value: string }[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ['businesses'],
    queryFn: () => {
      return apiInstance.get('api/v1/business', {
        // headers: {
        //   'Authorization': 'Bearer 8|xJs2fUqSbH3KOtTuOvorzY0gh3JMw6m544EB10pHaf9889fc'
        // }
      })
    }
  });

  // const config = useMemo({}, []);

  const handleInputChange = (keydetail: string, value: string) => {
    setBusinessDetailsPopulate((prev) => {
      const existingIndex = prev.findIndex((item) => item.keydetail === keydetail);
      if (existingIndex !== -1) {
        const updatedEntries = [...prev];
        updatedEntries[existingIndex].value = value;
        return updatedEntries;
      } else {
        return [...prev, { keydetail, value }];
      }
    });
  };

  const businessMutation = useMutation({
    mutationKey: ['businesMutate'],
    mutationFn: (data: OfferProps) => {
      return apiInstance.post("/api/v1/offer", data, {
        // headers: {
        //   'Authorization': 'Bearer 8|xJs2fUqSbH3KOtTuOvorzY0gh3JMw6m544EB10pHaf9889fc'
        // }
      })
    },
    onSuccess: (data) => {
      toast.success(data.data.message, {
        theme: 'colored',
        position: 'top-center'
      });
      setBusinessDetails([])
      reset({
        class_of_businessesclass_of_business_id: "",
        policy_number: "",
        insured_by: "",
        sum_insured: "",
        premium: "",
        rate: "",
        facultative_offer: "",
        commission: "",
        currency: "",
        period_of_insurance_from: "",
        period_of_insurance_to: "",
        offer_comment: ""
      })
      close()
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error?.status == 422) {
        const errorBag = error?.response?.data?.errors as ErrorBag;
        errorHandler(errorBag);
      }
      console.log("Something went wrong")
    }
  });

  const createCedantOffer: SubmitHandler<OfferProps> = (data) => {
    data.class_of_businessesclass_of_business_id = JSON.parse(data.class_of_businessesclass_of_business_id).id
    data.offer_details = JSON.stringify(businessDetailsPopulate)
    data.offer_comment = content
    businessMutation.mutateAsync(data)
  }

  useEffect(() => {
    setBusinessDetailsPopulate([])
  }, [businessDetails])

  return (
    <>
      {
        isLoading ? <Loading title="Preparing business list..." /> : (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl overflow-hidden h-3/4 md:w-full space-y-4">
              <div className="border-b flex justify-between py-2">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 ">
                    Create Business
                  </h2>
                  <h3 className="text-sm font-extralight">
                    Enter facultative business with the details below
                  </h3>
                </div>
                <div>
                  <svg
                    onClick={close}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ff0000"
                    className="size-6 cursor-pointer"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="max-h-1/2 h-5/6 sh-full w-full overflow-y-auto scrollbar-hide px-2 py-2">
                <div className="grid">
                  <div className="space-y-1 w-full mb-1">
                    <label className="block text-gray-600">Class of Business</label>
                    <select
                      {
                      ...register('class_of_businessesclass_of_business_id', {
                        required: "Select class of business"
                      })
                      }
                      onChange={(e) => {
                        console.log(e.target.value)
                        setBusinessDetails(JSON.parse((JSON.parse(e.target.value) as BusinessProps).business_details) || [])
                      }}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option defaultValue=" ">
                        Select class of business
                      </option>
                      {
                        (data?.data?.data as BusinessProps[]).map((business: BusinessProps, key: number) => (
                          <option key={key} value={JSON.stringify(business)} defaultValue={JSON.stringify(business)}>{business.business_name}</option>

                        ))
                      }
                    </select>
                    {
                      errors?.class_of_businessesclass_of_business_id && <p className="text-red-500 text-sm">{errors?.class_of_businessesclass_of_business_id.message}</p>
                    }
                  </div>
                </div>


                <div className="grid">
                  {
                    businessDetails?.length ? (
                      <fieldset className="border p-2 rounded-lg">
                        <legend className="text-md">Business Details</legend>
                        <div className="grid grid-cols-2 gap-4">
                          {
                            businessDetails?.map((business: BusinessDetailProps, key: number) => (
                              <div key={key}>
                                <label className="block text-gray-600 mb-1">{business.keydetail}</label>
                                <input
                                  onChange={(e) => handleInputChange(business.keydetail as string, e.target.value)}
                                  type="text"
                                  placeholder={`e.g. ${business.keydetail}`}
                                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            ))
                          }
                        </div>
                      </fieldset>) : ""
                  }

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 col-span-2 w-full">
                    <label className="block text-gray-600">Policy Number</label>
                    <input
                      {
                      ...register("policy_number", {
                        required: "Policy number is required"
                      })
                      }
                      type="text"
                      placeholder="e.g. SGS-11288/12334"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.policy_number && <p className="text-red-500 text-sm">{errors?.policy_number.message}</p>
                    }
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 w-full">
                    <label className="block text-gray-600">Insured</label>
                    <input
                      {
                      ...register("insured_by", {
                        required: "Insured is required"
                      })
                      }
                      type="text"
                      placeholder="e.g. ECG Ghana"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.insured_by && <p className="text-red-500 text-sm">{errors?.insured_by.message}</p>
                    }
                  </div>

                  <div className="space-y-1 w-full">
                    <label className="block text-gray-600">Sum Insured</label>
                    <input
                      {
                      ...register("sum_insured", {
                        required: "Sum insured is required"
                      })
                      }
                      type="text"
                      placeholder="e.g. ECG Ghana"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.sum_insured && <p className="text-red-500 text-sm">{errors?.sum_insured.message}</p>
                    }
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 w-full">
                    <label className="block text-gray-600">Premium</label>
                    <input
                      {
                      ...register("premium", {
                        required: "Premium is required"
                      })
                      }
                      type="number"
                      placeholder="e.g. 1200"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.premium && <p className="text-red-500 text-sm">{errors?.premium.message}</p>
                    }
                  </div>
                  <div className="space-y-1 w-full">
                    <label className="block text-gray-600">Rate (%)</label>
                    <input
                      {
                      ...register("rate", {
                        required: "Rate is required"
                      })
                      }
                      type="number"
                      step="0.1"
                      placeholder="e.g. 12.5"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.rate && <p className="text-red-500 text-sm">{errors?.rate.message}</p>
                    }
                  </div>
                  <div className="space-y-1 w-full">
                    <label className="block text-gray-600">
                      Facultative Offer (%)
                    </label>
                    <input
                      {
                      ...register("facultative_offer", {
                        required: "Facultative offer is required"
                      })
                      }
                      type="number"
                      step="0.1"
                      placeholder="e.g. 12.5"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.facultative_offer && <p className="text-red-500 text-sm">{errors?.facultative_offer.message}</p>
                    }
                  </div>
                  <div className="space-y-1 w-full">
                    <label className="block text-gray-600">Commission (%)</label>
                    <input
                      {
                      ...register("commission", {
                        required: "Commission is required"
                      })
                      }
                      type="number"
                      step="0.1"
                      placeholder="e.g. 12.5"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.commission && <p className="text-red-500 text-sm">{errors?.commission.message}</p>
                    }
                  </div>

                  <div className="space-y-1 col-span-2 w-full">
                    <label className="block text-gray-600">Currency</label>
                    <select
                      {
                      ...register("currency", {
                        required: "Currency is required"
                      })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Selct Currency</option>
                      {
                        CURRENCY.map((curreny: CurrencyProps, key: number) => (
                          <option key={key} value={curreny.code}>{curreny.name}</option>
                        ))
                      }
                    </select>
                    {
                      errors?.currency && <p className="text-red-500 text-sm">{errors?.currency.message}</p>
                    }
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 w-full">
                    <label className="block text-gray-600">From</label>
                    <input
                      {
                      ...register("period_of_insurance_from", {
                        required: "Period start is required"
                      })
                      }
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.period_of_insurance_from && <p className="text-red-500 text-sm">{errors?.period_of_insurance_from.message}</p>
                    }
                  </div>
                  <div className="space-y-1 w-full">
                    <label className="block text-gray-600">To</label>
                    <input
                      {
                      ...register("period_of_insurance_to", {
                        required: "Period end is required"
                      })
                      }
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                      errors?.period_of_insurance_to && <p className="text-red-500 text-sm">{errors?.period_of_insurance_to.message}</p>
                    }
                  </div>
                </div>

                <div className="space-y-1 w-full">
                  <label className="block text-gray-600 mb-2 mt-2">Comment <span className="text-xs text-red-500 italic">* Copy and paste facultative details here</span> </label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={e => setContent(e)}
                  />
                  {/* <textarea
                    {
                    ...register("offer_comment", {
                      required: false
                    })
                    }
                    defaultValue={""}
                    placeholder="Enter comments here"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  ></textarea> */}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={close}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button onClick={handleSubmit(createCedantOffer)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  {businessMutation.isLoading ? "Setting up offer..." : "Create Business"}
                </button>
              </div>
            </div>
          </div>
        )
      }

    </>
  );
};

export default BusinessModal;
