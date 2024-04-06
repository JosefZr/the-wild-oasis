/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/Checkbox"
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useChecking";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false)

  const {booking, isLoading} = useBooking()
  const {checkin, isCheckingIn} = useChecking()
  const {settings, isLoading: isLoadingSettings} = useSettings()

  useEffect(()=> setConfirmedPaid(booking?.isPaid ?? false)
,[booking,setConfirmedPaid])

  const moveBack = useMoveBack();

if(isLoading || isLoadingSettings) return <Spinner/>
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

const optionalBreakfastPrice= settings.breakfastPrice * numNights * numGuests;

function handleCheckin() {
    if(!confirmedPaid)  return;

    if(addBreakfast){
      checkin({bookingId, breakfast:{
        hasBreakfast: true,
        extrasPrice : optionalBreakfastPrice,
        totalPrice: totalPrice +optionalBreakfastPrice
      }})
    }
    else checkin({bookingId, breakfast:{}});
}

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <CheckBox 
          checked={addBreakfast}
          onChange={()=>{
            setAddBreakfast((add)=>!add);
            setConfirmedPaid(false);
          }}  
          id='breakfast'
        >
          Want to Add Breakfast for {formatCurrency(optionalBreakfastPrice)}
        </CheckBox>
      </Box>}
      
      <Box> 
        <CheckBox 
          id="confirm" 
          checked={confirmedPaid} 
          onChange={()=> setConfirmedPaid((confirm)=>!confirm)} 
          disabled={confirmedPaid || isCheckingIn}>
            i confirm that {guests.fullName} has paid the full amount of {" "} 
            {!addBreakfast 
              ? formatCurrency(totalPrice) 
              : `${
                  (formatCurrency(totalPrice + optionalBreakfastPrice))
                } ( ${formatCurrency(totalPrice)}+${formatCurrency(optionalBreakfastPrice)} )`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button 
          onClick={handleCheckin} 
          disabled={!confirmedPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack} >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
