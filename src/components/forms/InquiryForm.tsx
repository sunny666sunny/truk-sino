"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Button from "@/components/ui/Button";

/* 鈹€鈹€ Zod schema 鈹€鈹€ */
const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  company: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

/* 鈹€鈹€ Country list (common truck export markets) 鈹€鈹€ */
const COUNTRIES = [
  "Nigeria",
  "Philippines",
  "Indonesia",
  "Peru",
  "Thailand",
  "Kenya",
  "Ghana",
  "Vietnam",
  "Tanzania",
  "Cameroon",
  "Ethiopia",
  "Saudi Arabia",
  "UAE",
  "Iraq",
  "Kazakhstan",
  "Russia",
  "Colombia",
  "Chile",
  "Myanmar",
  "Bangladesh",
  "Other",
];

/* 鈹€鈹€ Style constants (CSS-variable based, matching site theme) 鈹€鈹€ */
const fieldClass =
  "w-full rounded-[var(--radius-brand)] border border-[var(--color-divider)] bg-[var(--color-surface-warm)] px-4 py-3 font-[family-name:var(--font-body)] text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/10";

const labelClass =
  "mb-1.5 block font-[family-name:var(--font-condensed)] text-xs font-semibold uppercase tracking-wider text-[var(--color-ink)]";

const errorClass = "mt-1 text-xs text-red-500";

/* 鈹€鈹€ Props 鈹€鈹€ */
interface InquiryFormProps {
  productInterest?: string;
  compact?: boolean;
}

/* 鈹€鈹€ Toast component (simple, no library) 鈹€鈹€ */
function Toast({
  type,
  message,
  onClose,
}: {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}) {
  return (
    <div
      role="alert"
      className={`fixed right-4 top-4 z-50 max-w-sm rounded-[var(--radius-brand)] px-5 py-4 shadow-lg transition-all duration-300 ${
        type === "success"
          ? "bg-green-600 text-white"
          : "bg-red-600 text-white"
      }`}
      style={{
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-white/80 hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

/* 鈹€鈹€ Main form component 鈹€鈹€ */
export default function InquiryForm({
  productInterest: defaultProduct,
  compact = false,
}: InquiryFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      company: "",
      productInterest: defaultProduct ?? "",
      quantity: "",
      message: "",
    },
  });

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 4000);
    },
    [],
  );

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitting(true);
    try {
      /* Get reCAPTCHA v3 token (if available) */
      let recaptchaToken: string | undefined;
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("inquiry_submit");
        } catch {
          recaptchaToken = undefined;
        }
      }

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        showToast(
          "error",
          json.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      showToast(
        "success",
        "Inquiry submitted successfully! Our team will contact you within 24 hours.",
      );
      reset();
    } catch {
      showToast(
        "error",
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Inline keyframe for toast animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      ` }} />

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Row 1 鈥?Name + Phone */}
        <div
          className={compact ? "space-y-5" : "grid gap-5 sm:grid-cols-2"}
        >
          <div>
            <label htmlFor="inquiry-name" className={labelClass}>
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="inquiry-name"
              type="text"
              placeholder="John Doe"
              className={fieldClass}
              {...register("name")}
            />
            {errors.name && (
              <p className={errorClass}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="inquiry-phone" className={labelClass}>
              Tel/WhatsApp
            </label>
            <input
              id="inquiry-phone"
              type="tel"
              placeholder="+234 800 000 0000"
              className={fieldClass}
              {...register("phone")}
            />
            {errors.phone && (
              <p className={errorClass}>{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Row 2 鈥?Email + Country */}
        <div
          className={compact ? "space-y-5" : "grid gap-5 sm:grid-cols-2"}
        >
          <div>
            <label htmlFor="inquiry-email" className={labelClass}>
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              id="inquiry-email"
              type="email"
              placeholder="john@company.com"
              className={fieldClass}
              {...register("email")}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="inquiry-country" className={labelClass}>
              Your Country <span className="text-red-500">*</span>
            </label>
            <select
              id="inquiry-country"
              className={fieldClass}
              defaultValue=""
              {...register("country")}
            >
              <option value="" disabled>
                Select country
              </option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className={errorClass}>{errors.country.message}</p>
            )}
          </div>
        </div>

        {/* Row 3 鈥?Company + Product Interest */}
        {!compact && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="inquiry-company" className={labelClass}>
                Company
              </label>
              <input
                id="inquiry-company"
                type="text"
                placeholder="Company name"
                className={fieldClass}
                {...register("company")}
              />
              {errors.company && (
                <p className={errorClass}>{errors.company.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="inquiry-product" className={labelClass}>
                Product Interest
              </label>
              <input
                id="inquiry-product"
                type="text"
                placeholder="e.g. HOWO 6x4 Dump Truck"
                className={fieldClass}
                {...register("productInterest")}
              />
              {errors.productInterest && (
                <p className={errorClass}>{errors.productInterest.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Compact: single product interest field */}
        {compact && (
          <div>
            <label htmlFor="inquiry-product-compact" className={labelClass}>
              Product Interest
            </label>
            <input
              id="inquiry-product-compact"
              type="text"
              placeholder="e.g. HOWO 6x4 Dump Truck"
              className={fieldClass}
              {...register("productInterest")}
            />
          </div>
        )}

        {/* Row 4 鈥?Quantity (non-compact only) */}
        {!compact && (
          <div>
            <label htmlFor="inquiry-quantity" className={labelClass}>
              Quantity
            </label>
            <input
              id="inquiry-quantity"
              type="text"
              placeholder="e.g. 10 units"
              className={fieldClass}
              {...register("quantity")}
            />
            {errors.quantity && (
              <p className={errorClass}>{errors.quantity.message}</p>
            )}
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="inquiry-message" className={labelClass}>
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="inquiry-message"
            rows={compact ? 3 : 4}
            placeholder="Tell us about your fleet requirements, preferred models, quantity, and destination country..."
            className={`${fieldClass} min-h-[120px] resize-y`}
            {...register("message")}
          />
          {errors.message && (
            <p className={errorClass}>{errors.message.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          size={compact ? "md" : "lg"}
          className="w-full"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send Inquiry"}
        </Button>
      </form>
    </>
  );
}
