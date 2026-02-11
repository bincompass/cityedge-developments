"use client";

import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";
import { motion } from "framer-motion";
import StaggerContainer, {
  StaggerItem,
} from "@/components/shared/StaggerContainer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod validation schema
const formSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().min(8, "Please enter a valid mobile number"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const countries = [
  { code: "EG", dial: "+20", name: "Egypt" },
  { code: "SA", dial: "+966", name: "Saudi Arabia" },
  { code: "AE", dial: "+971", name: "United Arab Emirates" },
  { code: "KW", dial: "+965", name: "Kuwait" },
  { code: "QA", dial: "+974", name: "Qatar" },
  { code: "BH", dial: "+973", name: "Bahrain" },
  { code: "OM", dial: "+968", name: "Oman" },
  { code: "JO", dial: "+962", name: "Jordan" },
  { code: "LB", dial: "+961", name: "Lebanon" },
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
];

type FormData = z.infer<typeof formSchema>;

export default function RegisterInterest() {
  const [primaryCountry, setPrimaryCountry] = useState(countries[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Format the mobile number with country code (no space to match curl example)
      const formattedMobile = `${primaryCountry.dial}${data.mobile}`;

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.incompassonline.com";
      const response = await fetch(`${apiUrl}/api/incompass/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: `${data.first_name} ${data.last_name}`,
          email: data.email,
          mobile: formattedMobile,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register-interest" className="relative pb-16 md:pb-24">
      <div className="container">
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#333] text-4xl md:text-5xl font-light tracking-tight text-center md:text-left"
          >
            Inquire Now
          </motion.h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-1">
              <input
                type="text"
                placeholder="First Name"
                {...register("first_name")}
                className={`w-full h-14 bg-[#F8F9FA] border-none rounded-sm px-6 text-[#333] focus:outline-none focus:ring-1 focus:ring-[#002D54]/10 transition-all placeholder:text-gray-400 text-base font-light`}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs px-2">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Last Name"
                {...register("last_name")}
                className={`w-full h-14 bg-[#F8F9FA] border-none rounded-sm px-6 text-[#333] focus:outline-none focus:ring-1 focus:ring-[#002D54]/10 transition-all placeholder:text-gray-400 text-base font-light`}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs px-2">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <input
                type="email"
                placeholder="Email Address"
                {...register("email")}
                className={`w-full h-14 bg-[#F8F9FA] border-none rounded-sm px-6 text-[#333] focus:outline-none focus:ring-1 focus:ring-[#002D54]/10 transition-all placeholder:text-gray-400 text-base font-light`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs px-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <div className="flex h-14 bg-[#F8F9FA] rounded-sm focus-within:ring-1 focus-within:ring-[#002D54]/10 transition-all">
                <div className="relative flex items-center gap-2 px-4 border-r border-gray-200">
                  <select
                    value={primaryCountry.code}
                    onChange={(e) => {
                      const country = countries.find(
                        (c) => c.code === e.target.value,
                      );
                      if (country) setPrimaryCountry(country);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name} {country.dial}
                      </option>
                    ))}
                  </select>
                  <ReactCountryFlag
                    countryCode={primaryCountry.code}
                    svg
                    style={{
                      width: "1.2rem",
                      height: "1.2rem",
                    }}
                    title={primaryCountry.name}
                  />
                  <span className="text-[#333] text-sm font-light">
                    {primaryCountry.dial}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  {...register("mobile")}
                  className="w-full h-full bg-transparent text-[#333] px-6 focus:outline-none placeholder:text-gray-400 text-base font-light"
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-xs px-2">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-1 md:col-span-1">
              <input
                type="text"
                placeholder="Subject"
                {...register("subject")}
                className={`w-full h-14 bg-[#F8F9FA] border-none rounded-sm px-6 text-[#333] focus:outline-none focus:ring-1 focus:ring-[#002D54]/10 transition-all placeholder:text-gray-400 text-base font-light`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs px-2">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1">
            <textarea
              placeholder="Message"
              {...register("message")}
              rows={5}
              className="w-full bg-[#F8F9FA] border-none rounded-sm px-6 py-4 text-[#333] focus:outline-none focus:ring-1 focus:ring-[#002D54]/10 transition-all placeholder:text-gray-400 text-base font-light resize-none"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs px-2">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Status Message */}
          {submitStatus.type && (
            <div
              className={`p-4 rounded-sm text-sm ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 flex justify-center items-center md:justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-10 h-14 rounded-[4px] flex items-center justify-center transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="uppercase text-xs font-bold tracking-widest">
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
              {isSubmitting && (
                <Loader2 className="w-4 h-4 ml-3 animate-spin" />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
