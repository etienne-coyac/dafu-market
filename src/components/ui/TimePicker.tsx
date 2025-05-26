import { FormControl, FormLabel, Input, IconButton } from "@mui/joy";
import { createSvgIcon } from "@mui/joy/utils";
import {
  type DatePickerFieldProps,
  renderDigitalClockTimeView,
  usePickerContext,
} from "@mui/x-date-pickers";
import React from "react";
import {
  TimePicker as OriginalTimePicker,
  type TimePickerProps,
} from "@mui/x-date-pickers/TimePicker";
import { unstable_useTimeField as useTimeField } from "@mui/x-date-pickers/TimeField";
import { ClearIcon } from "./DatePicker";

const ClockIcon = createSvgIcon(
  <React.Fragment>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
  </React.Fragment>,
  "Clock"
);

function JoyTimeField(props: DatePickerFieldProps) {
  const fieldResponse = useTimeField<false, typeof props>(props);

  const {
    // Should be passed to the button that opens the picker
    openPickerAriaLabel,

    // Can be passed to the button that clears the value
    onClear,
    clearable,

    // Can be used to style the component
    disabled,
    inputRef,

    // The rest can be passed to the root element
    id,
    value,
    ...other
  } = fieldResponse;

  const pickerContext = usePickerContext();

  return (
    <FormControl
      disabled={disabled}
      id={id}
      ref={pickerContext.rootRef}
      sx={{ flex: 1, width: "164px" }}
    >
      <FormLabel>{pickerContext.label}</FormLabel>
      <Input
        disabled={disabled}
        endDecorator={
          <React.Fragment>
            {clearable && value && (
              <IconButton
                title="Clear"
                tabIndex={-1}
                onClick={onClear}
                sx={{ marginRight: 0.5 }}
              >
                <ClearIcon size="md" />
              </IconButton>
            )}
            <IconButton
              onClick={() => pickerContext.setOpen((prev) => !prev)}
              aria-label={openPickerAriaLabel}
            >
              <ClockIcon size="md" />
            </IconButton>
          </React.Fragment>
        }
        slotProps={{
          input: { ref: inputRef },
        }}
        {...other}
        readOnly
        value={value}
        ref={pickerContext.triggerRef}
      />
    </FormControl>
  );
}

export default function TimePicker(props: TimePickerProps<false>) {
  return (
    <OriginalTimePicker
      {...props}
      ampm={false}
      format="HH [h]"
      views={["hours"]}
      enableAccessibleFieldDOMStructure={false}
      slots={{ ...props.slots, field: JoyTimeField }}
      slotProps={{
        dialog: { sx: { "& .Mui-disabled": { display: "none" } } },
        popper: { sx: { "& .Mui-disabled": { display: "none" } } },
      }}
      viewRenderers={{
        hours: () =>
          renderDigitalClockTimeView({
            view: "hours",
            views: ["hours"],
            minutesStep: 60,
            shouldDisableTime: props.shouldDisableTime,
            ampm: false,
            // @ts-expect-error je sais pas pourquoi
            onChange: props.onChange,
          }),
      }}
    />
  );
}
