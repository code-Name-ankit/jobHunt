import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Default Classes with stylish updates
        "aspect-square h-5 w-5 rounded-full border-2 border-gray-300", 
        "text-[#6A38C2] ring-offset-background transition-all duration-200",
        // Focus state (Purple glow)
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6A38C2] focus-visible:ring-offset-2",
        // Selected state styling
        "data-[state=checked]:border-[#6A38C2] data-[state=checked]:bg-purple-50",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* Dot color and size adjusted */}
        <Circle className="h-2.5 w-2.5 fill-[#6A38C2] text-[#6A38C2]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }