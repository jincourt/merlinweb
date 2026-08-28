"use client";

import { Children, useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useIntlayer, useLocale } from "next-intlayer";
import { isValidPhone } from "@/lib/phone";
import { MotionDiv } from "./motion";

const LOCALE_MAP = {
  fr: "fr-CH",
  en: "en-CH",
  de: "de-CH",
} as const;

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

const SLOTS_PER_PAGE = 7;

type CalendarDay = {
  iso: string;
  day: number;
};

function parseIsoDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function tomorrowIsoDate() {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatIsoDate(tomorrow);
}

function formatIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildCalendarDays(viewDate: Date, minDate: string): CalendarDay[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: CalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const iso = formatIsoDate(date);
    if (iso < minDate) continue;
    days.push({ iso, day });
  }

  return days;
}

function monthLabel(date: Date, intlLocale: string) {
  return new Intl.DateTimeFormat(intlLocale, {
    month: "long",
    year: "numeric",
  }).format(date);
}

function hourLabel(slot: string) {
  return String(Number.parseInt(slot.split(":")[0] ?? "0", 10));
}

function formatAppointmentSummary(dateIso: string, time: string, intlLocale: string) {
  const formattedDate = new Intl.DateTimeFormat(intlLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseIsoDate(dateIso));

  return `${formattedDate} · ${time}`;
}

const PICKER_SHELL_CLASS =
  "mx-auto grid w-full min-w-0 max-w-full grid-cols-[2.25rem_minmax(0,1fr)_2.25rem] gap-x-2.5 sm:max-w-[24.5rem] sm:grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] sm:gap-x-3";

function SlotGrid({
  slotCount,
  children,
}: {
  slotCount: number;
  children: React.ReactNode;
}) {
  const items = Array.from({ length: slotCount }, (_, index) => {
    const childArray = Children.toArray(children);
    return childArray[index] ?? null;
  });

  return (
    <div className="grid w-full min-w-0 grid-cols-[repeat(5,minmax(0,1fr))] gap-2.5 sm:gap-3">
      {items.map((item, index) =>
        item ?? (
          <div
            key={`empty-${index}`}
            className="mx-auto aspect-square w-full max-h-10 max-w-10 min-w-0 sm:max-h-none sm:max-w-none"
            aria-hidden
          />
        ),
      )}
    </div>
  );
}

function AppointmentSlotPicker({
  month,
  canPrevDate,
  canNextDate,
  onPrevDate,
  onNextDate,
  visibleDays,
  selectedDate,
  onDateSelect,
  showTimeSlots,
  selectedTime,
  onTimeSelect,
  prevDateAria,
  nextDateAria,
  availableSlots,
}: {
  month: string;
  canPrevDate: boolean;
  canNextDate: boolean;
  onPrevDate: () => void;
  onNextDate: () => void;
  visibleDays: CalendarDay[];
  selectedDate: string;
  onDateSelect: (value: string) => void;
  showTimeSlots: boolean;
  selectedTime: string;
  onTimeSelect: (value: string) => void;
  prevDateAria: string;
  nextDateAria: string;
  availableSlots: string;
}) {
  const navButtonClass =
    "inline-flex size-9 shrink-0 self-center items-center justify-center rounded-full border border-black/15 text-black transition-colors hover:border-black/40 disabled:cursor-not-allowed disabled:opacity-30 sm:size-10";

  const timeSlotClass = `transition-opacity duration-300 ${
    showTimeSlots ? "opacity-100" : "pointer-events-none opacity-0"
  }`;

  return (
    <div className={`${PICKER_SHELL_CLASS} items-center`}>
      <p className="col-start-2 row-start-1 mb-4 min-w-0 t-hero-sub text-left text-black/45 capitalize">
        {month}
      </p>

      <button
        type="button"
        onClick={onPrevDate}
        disabled={!canPrevDate}
        aria-label={prevDateAria}
        className={`${navButtonClass} col-start-1 row-start-2`}
      >
        <ChevronLeft strokeWidth={2} aria-hidden className="size-[17px] sm:size-[18px]" />
      </button>

      <div className="col-start-2 row-start-2 min-w-0">
        <SlotGrid slotCount={SLOTS_PER_PAGE}>
          {visibleDays.map((day) => (
            <CircleOption
              key={day.iso}
              value={day.iso}
              label={String(day.day)}
              selected={selectedDate === day.iso}
              onSelect={onDateSelect}
            />
          ))}
        </SlotGrid>
      </div>

      <button
        type="button"
        onClick={onNextDate}
        disabled={!canNextDate}
        aria-label={nextDateAria}
        className={`${navButtonClass} col-start-3 row-start-2`}
      >
        <ChevronRight strokeWidth={2} aria-hidden className="size-[17px] sm:size-[18px]" />
      </button>

      <p
        className={`col-start-2 row-start-3 mt-8 mb-4 min-w-0 t-hero-sub text-left text-black/45 capitalize ${timeSlotClass}`}
        aria-hidden={!showTimeSlots}
      >
        {availableSlots}
      </p>

      <div
        className={`col-start-2 row-start-4 min-w-0 ${timeSlotClass}`}
        aria-hidden={!showTimeSlots}
      >
        <SlotGrid slotCount={TIME_SLOTS.length}>
          {TIME_SLOTS.map((slot) => (
            <CircleOption
              key={slot}
              value={slot}
              label={hourLabel(slot)}
              selected={selectedTime === slot}
              onSelect={onTimeSelect}
              disabled={!showTimeSlots}
            />
          ))}
        </SlotGrid>
      </div>
    </div>
  );
}

type CircleOptionProps = {
  value: string;
  label: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: (value: string) => void;
};

function CircleOption({
  value,
  label,
  selected,
  disabled = false,
  onSelect,
}: CircleOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      disabled={disabled}
      aria-pressed={selected}
      className={`mx-auto flex aspect-square w-full max-h-10 max-w-10 min-w-0 items-center justify-center rounded-full border p-0 text-[0.9375rem] tabular-nums transition-colors sm:max-h-none sm:max-w-none sm:text-[clamp(0.9375rem,2vw,1.0625rem)] ${
        selected
          ? "border-black bg-black text-white"
          : disabled
            ? "cursor-not-allowed border-black/8 text-black/25"
            : "border-black/15 text-black hover:border-black/40"
      }`}
    >
      {label}
    </button>
  );
}

export function ContactAppointmentForm({ embedded = false }: { embedded?: boolean }) {
  const content = useIntlayer("contact");
  const site = useIntlayer("site");
  const { locale } = useLocale();
  const intlLocale =
    LOCALE_MAP[locale as keyof typeof LOCALE_MAP] ?? LOCALE_MAP.fr;
  const minDate = useMemo(() => tomorrowIsoDate(), []);
  const [viewDate, setViewDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
  });
  const [datePage, setDatePage] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const minMonthStart = useMemo(() => {
    const d = parseIsoDate(minDate);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }, [minDate]);

  const availableDays = useMemo(
    () => buildCalendarDays(viewDate, minDate),
    [viewDate, minDate],
  );

  const datePages = Math.max(1, Math.ceil(availableDays.length / SLOTS_PER_PAGE));
  const visibleDays = availableDays.slice(
    datePage * SLOTS_PER_PAGE,
    datePage * SLOTS_PER_PAGE + SLOTS_PER_PAGE,
  );

  const canPrevMonth = viewDate.getTime() > minMonthStart.getTime();
  const canPrevDate = datePage > 0 || canPrevMonth;
  const canNextDate = datePage < datePages - 1 || availableDays.length > 0;

  function resetContactFields() {
    setEmail("");
    setPhone("");
    setErrorMsg("");
    setStatus("idle");
  }

  function syncDateView(selectedDate: string) {
    const selected = parseIsoDate(selectedDate);
    const monthStart = new Date(selected.getFullYear(), selected.getMonth(), 1);
    const days = buildCalendarDays(monthStart, minDate);
    const index = days.findIndex((day) => day.iso === selectedDate);

    setViewDate(monthStart);
    if (index >= 0) {
      setDatePage(Math.floor(index / SLOTS_PER_PAGE));
    }
  }

  function handleDateSelect(value: string) {
    setDate(value);
    setTime("");
    setShowContactForm(false);
    resetContactFields();
  }

  function handleTimeSelect(value: string) {
    setTime(value);
    setShowContactForm(true);
    resetContactFields();
  }

  function handleBackToChoices() {
    setShowContactForm(false);
    resetContactFields();
    if (date) syncDateView(date);
  }

  function goPrevMonth() {
    const prev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    const pages = Math.ceil(buildCalendarDays(prev, minDate).length / SLOTS_PER_PAGE);
    setDatePage(Math.max(0, pages - 1));
    setViewDate(prev);
  }

  function goNextMonth() {
    setViewDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
    setDatePage(0);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!date || !time) {
      setErrorMsg(content.errorDateTime);
      setStatus("error");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg(content.errorEmail);
      setStatus("error");
      return;
    }

    if (!isValidPhone(phone)) {
      setErrorMsg(content.errorPhone);
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time,
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.error ?? content.errorSend);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg(content.errorNetwork);
      setStatus("error");
    }
  }

  const form = (
    <form onSubmit={handleSubmit} className="w-full min-w-0 space-y-8">
      {!showContactForm ? (
        <AppointmentSlotPicker
          month={monthLabel(viewDate, intlLocale)}
          canPrevDate={canPrevDate}
          canNextDate={canNextDate}
          prevDateAria={content.prevDateAria}
          nextDateAria={content.nextDateAria}
          availableSlots={content.availableSlots}
          onPrevDate={() => {
            if (datePage > 0) {
              setDatePage((page) => page - 1);
              return;
            }
            if (canPrevMonth) goPrevMonth();
          }}
          onNextDate={() => {
            if (datePage < datePages - 1) {
              setDatePage((page) => page + 1);
              return;
            }
            goNextMonth();
          }}
          visibleDays={visibleDays}
          selectedDate={date}
          onDateSelect={handleDateSelect}
          showTimeSlots={Boolean(date)}
          selectedTime={time}
          onTimeSelect={handleTimeSelect}
        />
      ) : null}

      {showContactForm && date && time ? (
        <MotionDiv immediate soft key={`contact-${date}-${time}`} delay={0.05} className="min-w-0">
          <div className={`${PICKER_SHELL_CLASS} items-start gap-y-4`}>
            <button
              type="button"
              onClick={handleBackToChoices}
              className="col-start-2 inline-flex min-w-0 items-center gap-2 t-hero-sub text-black/45 transition-colors hover:text-black"
            >
              <ArrowLeft size={16} strokeWidth={2} aria-hidden />
              {site.back}
            </button>

            <p className="col-start-2 min-w-0 w-full t-hero-sub text-left text-black/45 capitalize">
              {formatAppointmentSummary(date, time, intlLocale)}
            </p>

            <div className="col-start-2 min-w-0 w-full space-y-3">
              <input
                id="appointment-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.emailPlaceholder}
                className="wizard-input"
                autoComplete="email"
                aria-label={content.emailPlaceholder}
                required
              />
              <input
                id="appointment-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={content.phonePlaceholder}
                className="wizard-input"
                autoComplete="tel"
                aria-label={content.phonePlaceholder}
                required
              />

              {errorMsg ? (
                <p className="text-sm text-red" role="alert">
                  {errorMsg}
                </p>
              ) : null}

              {status === "success" ? (
                <p className="pt-4 text-sm text-black/70" role="status">
                  {content.successMessage}
                </p>
              ) : (
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-black"
                  >
                    {status === "loading"
                      ? content.sending
                      : content.confirmAppointment}
                  </button>
                </div>
              )}
            </div>
          </div>
        </MotionDiv>
      ) : null}
    </form>
  );

  if (embedded) return form;

  return (
    <section className="border-t border-black/8 bg-white text-black">
      <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12">
        <MotionDiv className="max-w-xl">{form}</MotionDiv>
      </div>
    </section>
  );
}
