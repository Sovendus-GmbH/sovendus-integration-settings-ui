"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, X } from "lucide-react";
import type { Dispatch, JSX, SetStateAction } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { DemoFormValues } from "sovendus-integration-types";
import {
  demoFormSchema,
  LANGUAGES_BY_COUNTRIES,
} from "sovendus-integration-types";

import { cn } from "../utils/utils";
import { Button, SubmitButton } from "./shadcn/button";
import { Card, CardContent } from "./shadcn/card";
import { Checkbox } from "./shadcn/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./shadcn/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/form";
import { Input } from "./shadcn/input";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { Textarea } from "./shadcn/textarea";

async function sendContactMail(values: DemoFormValues): Promise<void> {
  try {
    // TODO Change fetch URL

    await fetch("http://localhost:3001/api/feedback", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Failed to transmit sovendus test result - error:", e);
  }
}

const marketOptions = Object.entries(LANGUAGES_BY_COUNTRIES)
  .flatMap(([countryCode, languages]) =>
    Object.entries(languages).map(([langCode, label]) => ({
      value: `${countryCode}:${langCode}`,
      label: label,
    })),
  )
  .sort((a, b) => a.label.localeCompare(b.label));

interface ContactFormDialogProps {
  open: boolean;
  setActiveDialog: Dispatch<
    SetStateAction<
      | "voucherNetwork"
      | "optimize"
      | "checkoutProducts"
      | "TestingSteps"
      | "contactForm"
      | null
    >
  >;
}

export function ContactFormDialog({
  open,
  setActiveDialog,
}: ContactFormDialogProps): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [searchTerm, setSearchTerm] = useState("");

  function onOpenChange(open: boolean): void {
    setActiveDialog(open ? "contactForm" : null);
  }

  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      type: "demo",
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      website: "",
      phone: "",
      targetMarket: [],
      communicationLanguage: "",
      interests: [],
      message: "",
    },
  });

  function onSubmit(values: DemoFormValues): void {
    console.log("onSubmit function called with:", values);
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Your submission logic here
      void sendContactMail(values);
      console.log("Processing form submission:", values);
      setSubmitStatus("success");

      setTimeout(() => {
        onOpenChange(false);
        setSubmitStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Error in form submission:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const filteredMarkets = marketOptions.filter((market) =>
    market.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "tw:z-50 tw:sm:max-w-[600px] tw:max-h-[90vh] tw:overflow-y-auto",
        )}
      >
        <div
          className={cn(
            "tw:sticky tw:top-0 tw:z-50 tw:flex tw:justify-end tw:h-[55px]",
          )}
        >
          <div className={cn("tw:flex tw:items-center tw:gap-2")}>
            <button
              onClick={(): void => onOpenChange(false)}
              className={cn(
                "tw:p-2 tw:rounded-full tw:bg-gray-100 tw:hover:bg-gray-200 tw:transition-colors",
              )}
            >
              <X className={cn("tw:h-8 tw:w-8")} />
              <span className={cn("tw:sr-only")}>Close</span>
            </button>
          </div>
        </div>
        <DialogHeader className={cn("tw:pb-6")} style={{ marginTop: "-55px" }}>
          <DialogTitle className={cn("tw:text-2xl")}>
            Request a Demo
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              console.log("Form submit event triggered");
              form.handleSubmit((values) => {
                console.log("Form validation passed, values:", values);
                onSubmit(values);
              })(e);
            }}
            className={cn("tw:space-y-6")}
          >
            <div
              className={cn(
                "tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:gap-4",
              )}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Acme Inc."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetMarket"
              render={({ field }) => (
                <FormItem className={cn("tw:flex tw:flex-col")}>
                  <FormLabel>Target Markets</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          disabled={isSubmitting}
                          className={cn(
                            "tw:w-full tw:justify-between",
                            !field.value?.length && "text-muted-foreground",
                          )}
                        >
                          {field.value?.length > 0
                            ? `${field.value.length} market${field.value.length > 1 ? "s" : ""} selected`
                            : "Select target markets"}
                          <ChevronDown
                            className={cn(
                              "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50",
                            )}
                          />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className={cn("tw:p-0 tw:z-[200]")}
                      style={{
                        width: "var(--radix-popover-trigger-width)",
                        maxHeight: "300px",
                      }}
                    >
                      <div className={cn("tw:border-b tw:p-2")}>
                        <Input
                          placeholder="Search markets..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={cn(
                            "tw:border-none tw:focus-visible:ring-0 tw:focus-visible:ring-offset-0",
                          )}
                        />
                      </div>
                      <div
                        style={{
                          height: "200px",
                          overflowY: "scroll",
                          display: "block",
                        }}
                        className={cn("tw:py-2")}
                      >
                        {filteredMarkets.length === 0 ? (
                          <div
                            className={cn(
                              "tw:text-center tw:py-6 tw:text-sm tw:text-muted-foreground",
                            )}
                          >
                            No market found.
                          </div>
                        ) : (
                          filteredMarkets.map((market) => {
                            const isSelected =
                              field.value?.includes(market.value) || false;

                            return (
                              <div
                                key={market.value}
                                className={cn(
                                  "tw:flex tw:items-center tw:px-2 tw:py-1.5 tw:hover:bg-accent tw:rounded-sm tw:cursor-pointer tw:mx-1",
                                )}
                                onClick={() => {
                                  const currentValues = field.value || [];
                                  const newValues = isSelected
                                    ? currentValues.filter(
                                        (value) => value !== market.value,
                                      )
                                    : [...currentValues, market.value];

                                  form.setValue("targetMarket", newValues);
                                }}
                              >
                                <Checkbox
                                  checked={isSelected}
                                  className={cn("tw:mr-2")}
                                />
                                <span>{market.label}</span>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className={cn("tw:mb-2")}>
                    <FormLabel className={cn("tw:text-base")}>
                      What are you interested in?
                    </FormLabel>
                    <FormDescription>Select all that apply.</FormDescription>
                  </div>
                  {[
                    { id: "gain-customers", label: "Gain customers" },
                    { id: "increase-revenue", label: "Increase revenue" },
                    {
                      id: "conversion-rate",
                      label: "Increase conversion rate",
                    },
                  ].map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="interests"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className={cn(
                              "tw:flex tw:flex-row tw:items-start tw:space-x-3 tw:space-y-0",
                            )}
                          >
                            <FormControl>
                              <Checkbox
                                checked={
                                  field.value?.includes(item.id) || false
                                }
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        item.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                }}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormLabel className={cn("tw:font-normal")}>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+1 (555) 000-0000"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What would you like to tell us?"
                      className={cn("tw:resize-none")}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitStatus === "success" && (
              <Card className={cn("tw:bg-green-50 tw:border-green-200")}>
                <CardContent className={cn("tw:p-4 tw:text-green-800")}>
                  Thank you for your interest! We'll contact you soon about your
                  demo.
                </CardContent>
              </Card>
            )}

            {submitStatus === "error" && (
              <Card className={cn("tw:bg-red-50 tw:border-red-200")}>
                <CardContent className={cn("tw:p-4 tw:text-red-800")}>
                  There was an error submitting your request. Please try again.
                </CardContent>
              </Card>
            )}

            <SubmitButton
              className={cn("tw:w-full", isSubmitting && "tw:opacity-70")}
              disabled={isSubmitting}
              title={isSubmitting ? "Submitting..." : "Submit Request"}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
