import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import DrawIcon from '@mui/icons-material/Draw';
import CodeIcon from '@mui/icons-material/Code';
import JavascriptIcon from '@mui/icons-material/Javascript';
import TerminalIcon from '@mui/icons-material/Terminal';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { CodeReview } from '../CodeReview/CodeReview.tsx';
import { Box } from '@mui/material';
import api from '../../services/api.ts';
import { API_ROUTE } from '../../constants/apiRoutes.ts';
import { useParams } from 'react-router';
import { Loader } from '../../components/Loader.tsx';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(95deg, 
        ${theme.palette.primary.light} 0%, 
        ${theme.palette.primary.main} 50%, 
        ${theme.palette.primary.dark} 100%)`
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[300], // Default color
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800] // Dark mode color
    })
  }
}));

// 🔹 Step Icon Root (Colorlib)
const ColorlibStepIconRoot = styled('div')<{ ownerState: { completed?: boolean; active?: boolean } }>(
  ({ theme, ownerState }) => ({
    backgroundColor: theme.palette.grey[400], // Default background
    zIndex: 1,
    color: theme.palette.common.white,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease-in-out',

    // Dark mode background
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[700]
    }),

    // Active step gradient
    ...(ownerState.active && {
      backgroundImage: `linear-gradient(136deg, 
        ${theme.palette.primary.light} 0%, 
        ${theme.palette.primary.main} 50%, 
        ${theme.palette.primary.dark} 100%)`,
      boxShadow: '0 4px 10px 0 rgba(0,0,0,0.25)'
    }),

    // Completed step gradient
    ...(ownerState.completed && {
      backgroundImage: `linear-gradient(136deg, 
        ${theme.palette.success.light} 0%, 
        ${theme.palette.success.main} 50%, 
        ${theme.palette.success.dark} 100%)`
    })
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

const components = [
  <></>,
  <CodeReview />,
  <></>,
  <></>,
  <></>
];

type CandidateInfo = {
  candidateId: string;
  roundId: string;
  pros: string;
  cons: string;
  status: string;
}

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(1);
  const { id } = useParams();

  const [candidateDetails, setCandidateDetails] = useState<CandidateInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    api.get(API_ROUTE.candidateInterviewInfo.replace(':id', id)).then((response) => {
      setCandidateDetails(response.data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <Loader isOpen={isLoading} />;


  return (
    <Stack sx={{ width: '100%' }} mt={3}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label} completed={index <= 1}>
            <StepLabel StepIconComponent={ColorlibStepIcon} onClick={() => setActiveStep(index)}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box padding={'30px'} width={'100%'}>
        {components[activeStep]}
      </Box>
    </Stack>
  );
}