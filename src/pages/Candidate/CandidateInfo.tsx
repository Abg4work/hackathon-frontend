import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import DrawIcon from '@mui/icons-material/Draw';
import CodeIcon from '@mui/icons-material/Code';
import JavascriptIcon from '@mui/icons-material/Javascript';
import TerminalIcon from '@mui/icons-material/Terminal';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main, // Primary color
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.grey[400], // Default connector color
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.grey[800], // Dark mode color
    }),
  },
}));

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.grey[400], // Default color
    display: "flex",
    height: 22,
    alignItems: "center",
    transition: "color 0.3s ease-in-out",

    "& .QontoStepIcon-completedIcon": {
      color: theme.palette.success.main, // Success color for completed
      zIndex: 1,
      fontSize: 18,
    },

    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },

    ...theme.applyStyles("dark", {
      color: theme.palette.grey[700], // Dark mode color
    }),

    ...(ownerState.active && {
      color: theme.palette.primary.main, // Primary color for active step
    }),
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, 
        ${theme.palette.primary.light} 0%, 
        ${theme.palette.primary.main} 50%, 
        ${theme.palette.primary.dark} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[300], // Default color
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800], // Dark mode color
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")<{ ownerState: { completed?: boolean; active?: boolean } }>(
  ({ theme, ownerState }) => ({
    backgroundColor: theme.palette.grey[400], // Default background
    zIndex: 1,
    color: theme.palette.common.white,
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease-in-out",

    // Dark mode background
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[700],
    }),

    // Active step gradient
    ...(ownerState.active && {
      backgroundImage: `linear-gradient(136deg, 
        ${theme.palette.primary.light} 0%, 
        ${theme.palette.primary.main} 50%, 
        ${theme.palette.primary.dark} 100%)`,
      boxShadow: "0 4px 10px 0 rgba(0,0,0,0.25)",
    }),

    // Completed step gradient
    ...(ownerState.completed && {
      backgroundImage: `linear-gradient(136deg, 
        ${theme.palette.success.light} 0%, 
        ${theme.palette.success.main} 50%, 
        ${theme.palette.success.dark} 100%)`,
    }),
  })
);

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <DrawIcon />,
    2: <CodeIcon />,
    3: <JavascriptIcon />,
    4: <TerminalIcon />,
    5: <LaptopMacIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Applied', 'Live Coding', 'Technical Round 1', 'Technical Round 2', 'Director'];

export default function CustomizedSteppers() {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}