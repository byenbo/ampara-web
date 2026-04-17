import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`h-12 w-full rounded-lg border-[1.5px] bg-white px-4 text-sm text-neutral-700 placeholder:text-neutral-300 outline-none transition-all
            ${error
              ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
            } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
